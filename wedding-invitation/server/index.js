import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import multer from 'multer'
import { isConfigured, saveLocally, uploadGuestPhotos } from './drive.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 4000
const MAX_PHOTOS = Number(process.env.MAX_PHOTOS_PER_GUEST) || 10
const MAX_FILE_MB = Number(process.env.MAX_FILE_SIZE_MB) || 15
const DIST_DIR = path.join(__dirname, '..', 'dist')

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/gif',
])

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '64kb' }))

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_MB * 1024 * 1024, files: MAX_PHOTOS },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME.has(file.mimetype) || file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files can be uploaded.'))
  },
})

function sanitizeGuestName(raw) {
  return String(raw || '')
    .normalize('NFC')
    .replace(/[<>:"/\\|?*]/g, ' ')
    .split('')
    .map((ch) => (ch.charCodeAt(0) < 32 ? ' ' : ch))
    .join('')
    .replace(/[.]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)
}

const recentUploads = new Map()
const RATE_WINDOW_MS = 60 * 1000
const RATE_MAX = 4

function rateLimited(key) {
  const now = Date.now()
  const hits = (recentUploads.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS)
  hits.push(now)
  recentUploads.set(key, hits)
  if (recentUploads.size > 500) recentUploads.clear()
  return hits.length > RATE_MAX
}

app.post('/api/upload', (req, res) => {
  upload.array('photos', MAX_PHOTOS)(req, res, async (err) => {
    if (err) {
      const message =
        err.code === 'LIMIT_FILE_SIZE' ? `Each photo must be under ${MAX_FILE_MB} MB.`
        : err.code === 'LIMIT_FILE_COUNT' ? `Please share up to ${MAX_PHOTOS} photos at a time.`
        : err.message || 'Upload failed.'
      return res.status(400).json({ error: message })
    }

    const guestName = sanitizeGuestName(req.body?.guestName)
    const files = req.files || []

    if (guestName.length < 2) {
      return res.status(400).json({ error: 'Please tell us your name before uploading.' })
    }
    if (!files.length) {
      return res.status(400).json({ error: 'No photos were received.' })
    }
    if (files.length > MAX_PHOTOS) {
      return res.status(400).json({ error: `Please share up to ${MAX_PHOTOS} photos at a time.` })
    }

    const clientKey = req.ip || 'unknown'
    if (rateLimited(clientKey)) {
      return res.status(429).json({ error: 'That is a lot of love at once! Please wait a minute and try again.' })
    }

    try {
      const result = isConfigured()
        ? await uploadGuestPhotos(guestName, files)
        : await saveLocally(guestName, files)

      if (result.storage === 'local-disk') {
        console.warn(
          `[upload] Google Drive is not configured — saved ${files.length} photo(s) to ${result.folderId}`,
        )
      }

      return res.status(201).json({
        ok: true,
        guest: guestName,
        uploaded: result.files.length,
        storage: result.storage,
        files: result.files.map((f) => f.name),
      })
    } catch (error) {
      console.error('[upload] failed:', error?.message || error)
      return res.status(502).json({
        error: 'We could not save your photos right now. Please try again in a moment.',
      })
    }
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    storage: isConfigured() ? 'google-drive' : 'local-disk',
    maxPhotosPerGuest: MAX_PHOTOS,
    maxFileSizeMB: MAX_FILE_MB,
  })
})

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, { maxAge: '1h' }))
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' })
    return res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
} else {
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' })
    res.status(404).json({ error: 'Frontend is not built yet. Run npm run dev for local preview.' })
  })
}

app.listen(PORT, () => {
  const mode = isConfigured() ? 'Google Drive' : 'local disk (uploads/)'
  console.log('\n  Ahilla & Mohamed — wedding invitation')
  console.log(`  ▸ api  http://localhost:${PORT}`)
  console.log(`  ▸ guest photos → ${mode}`)
  console.log(`  ▸ limit: ${MAX_PHOTOS} photos per guest, ${MAX_FILE_MB} MB each\n`)
})
