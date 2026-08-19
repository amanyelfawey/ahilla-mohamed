import { useMemo, useRef, useState } from 'react'
import { CONFIG } from '../config.js'
import { cn } from '../lib/cn.js'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import { Button, Card, Field, FormError, Section, controlClass } from './ui.jsx'
import { Reveal } from './Motion.jsx'
import { SectionHeading } from './Ornaments.jsx'

function uploadRequest(body, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', CONFIG.upload.endpoint)
    xhr.timeout = 5 * 60 * 1000

    xhr.upload.addEventListener('progress', (e) => {
      if (!e.lengthComputable) return
      onProgress(Math.max(4, Math.round((e.loaded / e.total) * 92)))
    })

    xhr.addEventListener('load', () => {
      let data = null
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        /* non-JSON */
      }
      if (xhr.status >= 200 && xhr.status < 300) resolve(data || {})
      else reject(new Error(data?.error || `Upload failed (${xhr.status}). Please try again.`))
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Network error. Please check your connection and try again.'))
    })
    xhr.addEventListener('timeout', () => {
      reject(new Error('The upload timed out. Please try fewer photos.'))
    })

    xhr.send(body)
  })
}

export function PhotoUpload() {
  const prefersReduced = usePrefersReducedMotion()
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [guestName, setGuestName] = useState('')
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Uploading your memories…')
  const [done, setDone] = useState(false)
  const [doneDetail, setDoneDetail] = useState('')
  const [marked, setMarked] = useState('')

  const max = CONFIG.upload.maxPhotos
  const maxBytes = CONFIG.upload.maxFileSizeMB * 1024 * 1024
  const full = files.length >= max
  const canSubmit = files.length > 0 && guestName.trim().length >= 2 && !uploading

  const addFiles = (fileList) => {
    setError('')
    const incoming = Array.from(fileList)
    const problems = []

    setFiles((current) => {
      const next = [...current]
      incoming.forEach((file) => {
        if (next.length >= max) {
          problems.push(`Only ${max} photos can be shared at a time.`)
          return
        }
        if (!file.type.startsWith('image/')) {
          problems.push(`"${file.name}" is not an image.`)
          return
        }
        if (file.size > maxBytes) {
          problems.push(`"${file.name}" is larger than ${CONFIG.upload.maxFileSizeMB} MB.`)
          return
        }
        const duplicate = next.some((entry) => entry.file.name === file.name && entry.file.size === file.size)
        if (duplicate) return
        next.push({
          file,
          id: `p${Date.now()}${Math.random().toString(16).slice(2, 7)}`,
          src: URL.createObjectURL(file),
        })
      })
      return next
    })

    if (problems.length) setError([...new Set(problems)].join(' '))
  }

  const remove = (id) => {
    setFiles((current) => {
      const entry = current.find((item) => item.id === id)
      if (entry) URL.revokeObjectURL(entry.src)
      return current.filter((item) => item.id !== id)
    })
    setError('')
  }

  const reset = () => {
    files.forEach((entry) => URL.revokeObjectURL(entry.src))
    setFiles([])
    setGuestName('')
    setError('')
    setUploading(false)
    setProgress(0)
    setStatus('Uploading your memories…')
    setDone(false)
    setDoneDetail('')
    setMarked('')
    window.setTimeout(() => document.getElementById('guest-name')?.focus(), 0)
  }

  const send = async (event) => {
    event.preventDefault()
    const name = guestName.trim()
    if (name.length < 2) {
      setError('Please tell us your name first.')
      return
    }
    if (!files.length) {
      setError('Please choose at least one photo.')
      return
    }

    const body = new FormData()
    body.append('guestName', name)
    files.forEach((entry) => body.append('photos', entry.file, entry.file.name))

    setError('')
    setUploading(true)
    setProgress(4)
    setStatus('Uploading your memories…')

    try {
      const result = await uploadRequest(body, (pct) => {
        setProgress(pct)
        setStatus(`Uploading your memories… ${pct}%`)
      })
      setMarked('done')
      setProgress(100)
      setStatus('Upload complete')

      const stored = result?.uploaded ?? files.length
      const where = result?.storage === 'google-drive' ? 'our Google Drive album' : 'our wedding album'
      setDoneDetail(`${stored} ${stored === 1 ? 'photo' : 'photos'} from ${name} saved to ${where}.`)

      window.setTimeout(() => {
        setUploading(false)
        setDone(true)
      }, prefersReduced ? 0 : 650)
    } catch (err) {
      setMarked('failed')
      setUploading(false)
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  const countLabel = useMemo(() => `${files.length} / ${max} photos`, [files.length, max])

  return (
    <Section tint="peach" narrow id="share">
      <SectionHeading
        eyebrow="Your memories, our memories"
        title="Capture the moments with us 🤍"
        note="Take your favourite moments from our special day and share them with us. Every photo you send becomes part of our wedding album."
        noteClassName="mb-10"
      />

      <Reveal variant="scale" index={2}>
        <Card>
        {!done ? (
          <form id="upload-form" noValidate onSubmit={send}>
            <div className="mb-7 text-center">
              <svg className="mx-auto size-[46px] text-dusty-rose" viewBox="0 0 48 48" aria-hidden="true">
                <use href="#i-camera" />
              </svg>
              <p className="mt-1.5 font-script text-[1.6rem] text-dusty-rose">Share your moments</p>
            </div>

            <Field label="Your name" htmlFor="guest-name">
              <input
                type="text"
                id="guest-name"
                name="guestName"
                placeholder="So we know who to thank"
                maxLength={60}
                autoComplete="name"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={controlClass}
              />
            </Field>

            <label
              className={cn(
                'relative grid cursor-pointer justify-items-center gap-2.5 rounded-[20px] border-[1.5px] border-dashed border-gold/50 bg-[linear-gradient(160deg,rgb(248_226_229/0.5),rgb(252_230_216/0.42))] px-5 py-[clamp(1.75rem,6vw,3rem)] text-center transition duration-[400ms] ease-luxe hover:-translate-y-0.5 hover:border-gold',
                dragging && 'scale-[1.01] border-gold bg-[linear-gradient(160deg,rgb(248_226_229/0.85),rgb(241_228_208/0.7))]',
                full && 'opacity-55',
              )}
              htmlFor="photo-input"
              onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files)
              }}
            >
              <svg className="size-[46px] text-dusty-rose" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-camera" /></svg>
              <span className="font-heading text-[1.1rem] text-ink">Drag &amp; drop or choose photos</span>
              <span className="text-[0.78rem] text-ink-soft">
                JPG, PNG, HEIC or WEBP &middot; up to <b>{CONFIG.upload.maxFileSizeMB}</b> MB each
              </span>
              <input
                ref={inputRef}
                type="file"
                id="photo-input"
                accept="image/*"
                multiple
                disabled={full}
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => {
                  addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
            </label>

            <div className="mt-[1.1rem] mb-1.5 flex items-center justify-between gap-4">
              <span className={cn('font-heading text-[0.95rem] tracking-[0.06em] text-ink', full && 'text-rose-deep')}>{countLabel}</span>
              <span className="h-0.5 flex-1 overflow-hidden rounded-full bg-gold/18" aria-hidden="true">
                <span className="block h-full rounded-full bg-[linear-gradient(120deg,var(--color-gold-deep),var(--color-gold-soft)_45%,var(--color-gold))] transition-[width] duration-500 ease-luxe" style={{ width: `${(files.length / max) * 100}%` }} />
              </span>
            </div>

            <ul className="mt-[1.1rem] grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2.5">
              {files.map((entry) => (
                <li
                  key={entry.id}
                  className={cn(
                    'relative aspect-square animate-preview overflow-hidden rounded-[14px] border border-gold/30 bg-blush shadow-soft',
                    marked === 'failed' && 'border-rose-deep',
                  )}
                >
                  <img src={entry.src} alt={entry.file.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-1.5 right-1.5 grid size-[26px] place-items-center rounded-full bg-ivory/90 text-ink shadow-[0_2px_8px_rgb(0_0_0/0.14)] transition duration-300 hover:scale-110 hover:bg-white"
                    aria-label={`Remove ${entry.file.name}`}
                    onClick={() => remove(entry.id)}
                  >
                    <svg className="size-3" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-close" /></svg>
                  </button>
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-white/50">
                    <i
                      className={cn('block h-full bg-sage-deep transition-[width] duration-[400ms] ease-luxe', marked === 'failed' && 'bg-rose-deep')}
                      style={{ width: uploading || marked === 'done' ? `${progress}%` : 0 }}
                    />
                  </span>
                </li>
              ))}
            </ul>

            <FormError>{error}</FormError>

            {uploading ? (
              <div className="mt-5 text-center" aria-live="polite">
                <div className="mb-2.5 h-1 overflow-hidden rounded-full bg-gold/16">
                  <div className="h-full rounded-full bg-[linear-gradient(120deg,var(--color-gold-deep),var(--color-gold-soft)_45%,var(--color-gold))] transition-[width] duration-[400ms] ease-luxe" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-[0.72rem] tracking-[0.14em] uppercase text-ink-soft">{status}</p>
              </div>
            ) : null}

            <Button type="submit" variant="solid" wide className="mt-6" disabled={!canSubmit}>
              Add to our album
            </Button>
          </form>
        ) : (
          <div className="px-2 py-[clamp(1.5rem,5vw,2.5rem)] text-center" role="status">
            <svg className="mx-auto mb-5 size-[78px] text-sage-deep" viewBox="0 0 48 48" aria-hidden="true"><use href="#i-check" /></svg>
            <h3 className="mb-2 font-heading text-[clamp(1.3rem,4vw,1.7rem)] font-normal">Your memories have been added to our wedding album 🤍</h3>
            <p className="text-[0.9rem] text-ink-soft">{doneDetail || 'Thank you for capturing our day with us.'}</p>
            <span className="mt-4 block font-script text-2xl text-dusty-rose">Thank you for being part of our story.</span>
            <Button type="button" variant="ghost" className="mt-6" onClick={reset}>
              Share more photos
            </Button>
          </div>
        )}
        </Card>
      </Reveal>
    </Section>
  )
}
