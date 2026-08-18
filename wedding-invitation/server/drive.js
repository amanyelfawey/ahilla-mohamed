import fs from 'node:fs'
import path from 'node:path'
import { Readable } from 'node:stream'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/drive.file']

let cachedDrive = null
const guestFolderCache = new Map()

function loadCredentials() {
  const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64
  if (base64 && base64.trim()) {
    return JSON.parse(Buffer.from(base64.trim(), 'base64').toString('utf8'))
  }

  const keyFile = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE
  if (keyFile && keyFile.trim()) {
    const resolved = path.resolve(process.cwd(), keyFile.trim())
    if (fs.existsSync(resolved)) {
      return JSON.parse(fs.readFileSync(resolved, 'utf8'))
    }
  }

  return null
}

export function isConfigured() {
  return Boolean(process.env.GOOGLE_DRIVE_FOLDER_ID && loadCredentials())
}

async function getDrive() {
  if (cachedDrive) return cachedDrive

  const credentials = loadCredentials()
  if (!credentials) throw new Error('Google service account credentials are not configured.')

  const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES })
  cachedDrive = google.drive({ version: 'v3', auth })
  return cachedDrive
}

function sharedDriveOptions() {
  const driveId = process.env.GOOGLE_SHARED_DRIVE_ID
  return driveId
    ? { supportsAllDrives: true, includeItemsFromAllDrives: true, driveId, corpora: 'drive' }
    : { supportsAllDrives: true }
}

async function ensureGuestFolder(drive, guestName) {
  const parentId = process.env.GOOGLE_DRIVE_FOLDER_ID
  const cacheKey = `${parentId}:${guestName.toLowerCase()}`
  if (guestFolderCache.has(cacheKey)) return guestFolderCache.get(cacheKey)

  const escaped = guestName.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const query = [
    `name = '${escaped}'`,
    `'${parentId}' in parents`,
    "mimeType = 'application/vnd.google-apps.folder'",
    'trashed = false',
  ].join(' and ')

  const existing = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    pageSize: 1,
    ...sharedDriveOptions(),
  })

  let folderId = existing.data.files?.[0]?.id

  if (!folderId) {
    const created = await drive.files.create({
      requestBody: {
        name: guestName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
      fields: 'id',
      supportsAllDrives: true,
    })
    folderId = created.data.id
  }

  guestFolderCache.set(cacheKey, folderId)
  return folderId
}

async function countExisting(drive, folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id)',
    pageSize: 1000,
    ...sharedDriveOptions(),
  })
  return res.data.files?.length ?? 0
}

function extensionFor(file) {
  const fromName = path.extname(file.originalname || '').toLowerCase()
  if (fromName && fromName.length <= 6) return fromName
  const fromMime = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/heic': '.heic',
    'image/heif': '.heif',
    'image/gif': '.gif',
  }[file.mimetype]
  return fromMime || '.jpg'
}

export async function uploadGuestPhotos(guestName, files) {
  const drive = await getDrive()
  const folderId = await ensureGuestFolder(drive, guestName)
  const offset = await countExisting(drive, folderId)

  const uploaded = []
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const index = String(offset + i + 1).padStart(2, '0')
    const name = `${guestName}_${index}${extensionFor(file)}`

    const res = await drive.files.create({
      requestBody: { name, parents: [folderId] },
      media: { mimeType: file.mimetype, body: Readable.from(file.buffer) },
      fields: 'id, name, webViewLink',
      supportsAllDrives: true,
    })

    uploaded.push({ name: res.data.name, id: res.data.id, link: res.data.webViewLink })
  }

  return { storage: 'google-drive', folderId, files: uploaded }
}

export async function saveLocally(guestName, files) {
  const baseDir = path.resolve(process.cwd(), process.env.LOCAL_UPLOAD_DIR || './uploads')
  const guestDir = path.join(baseDir, guestName)
  await fs.promises.mkdir(guestDir, { recursive: true })

  const existing = await fs.promises.readdir(guestDir).catch(() => [])
  const offset = existing.length

  const uploaded = []
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const index = String(offset + i + 1).padStart(2, '0')
    const name = `${guestName}_${index}${extensionFor(file)}`
    await fs.promises.writeFile(path.join(guestDir, name), file.buffer)
    uploaded.push({ name, id: null, link: null })
  }

  return { storage: 'local-disk', folderId: guestDir, files: uploaded }
}
