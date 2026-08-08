const grid = document.querySelector('#grid')
const lastUpdated = document.querySelector('#lastUpdated')

/**
 * Lessons
 */
// Written at container start by docker/40-lessons.sh, faked by the dev server.
async function loadLessons()
{
    const response = await fetch('./lessons.json', { cache: 'no-cache' }).catch(() => null)
    const lessons = response && response.ok ? await response.json() : []

    if (lessons.length === 0)
    {
        grid.innerHTML = '<p class="empty">No lesson has been built yet.</p>'
        return
    }

    for (const lesson of lessons)
        grid.append(createCard(lesson))
}

/**
 * Card
 */
function createCard(lesson)
{
    const card = document.createElement('article')
    card.className = 'card'

    // The whole preview area is the button: thumbnail (or lesson number) plus
    // the hint, swapped for the lesson iframe on click.
    const preview = document.createElement('button')
    preview.type = 'button'
    preview.className = 'card__preview'
    preview.append(createThumbnail(lesson))

    const hint = document.createElement('span')
    hint.className = 'card__hint'
    hint.textContent = 'Click to see a preview'
    preview.append(hint)

    preview.addEventListener('click', () => startPreview(card, preview, lesson), { once: true })

    const body = document.createElement('div')
    body.className = 'card__body'

    const number = document.createElement('span')
    number.className = 'card__number'
    number.textContent = lesson.id

    const title = document.createElement('span')
    title.className = 'card__title'
    title.textContent = lesson.title

    // Every lesson is deployed at its own /NN/ URL, this just goes there.
    const open = document.createElement('a')
    open.className = 'card__open'
    open.href = `/${lesson.id}/`
    open.target = '_blank'
    open.rel = 'noopener'
    open.title = `Open lesson ${lesson.id} in a new tab`
    open.innerHTML = '<span>Open</span> ↗'

    body.append(number, title, open)
    card.append(preview, body)

    return card
}

function createThumbnail(lesson)
{
    if (!lesson.thumbnail)
        return createFallback(lesson)

    const image = document.createElement('img')
    image.className = 'card__image'
    image.src = lesson.thumbnail
    image.alt = lesson.title
    image.loading = 'lazy'
    // A thumbnail that fails to load falls back like a missing one.
    image.addEventListener('error', () => image.replaceWith(createFallback(lesson)))

    return image
}

function createFallback(lesson)
{
    const fallback = document.createElement('span')
    fallback.className = 'card__fallback'
    fallback.textContent = lesson.id

    return fallback
}

/**
 * Last updated
 */
// Stamped into the image right after the lessons are built (see the Dockerfile),
// faked by the dev server. Missing or unreadable, the line just stays hidden.
async function loadBuildDate()
{
    const response = await fetch('./build.json', { cache: 'no-cache' }).catch(() => null)
    if (!response || !response.ok) return

    const { builtAt } = await response.json().catch(() => ({}))
    const date = new Date(builtAt)
    if (Number.isNaN(date.getTime())) return

    lastUpdated.textContent = `Last updated ${formatDate(date)}`
    lastUpdated.title = date.toString()
    lastUpdated.hidden = false
}

function formatDate(date)
{
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Preview
 */
function startPreview(card, preview, lesson)
{
    const frame = document.createElement('iframe')
    frame.className = 'card__frame'
    frame.src = `/${lesson.id}/`
    frame.title = `Lesson ${lesson.id} preview`
    frame.allow = 'fullscreen; xr-spatial-tracking'

    // Stops the lesson: dropping the iframe kills its WebGL context and its
    // animation loop, which a dozen live previews would otherwise all keep.
    const stop = document.createElement('button')
    stop.type = 'button'
    stop.className = 'card__stop'
    stop.title = 'Stop the preview'
    stop.textContent = '✕'
    stop.addEventListener('click', () => stopPreview(card, lesson))

    preview.replaceWith(frame)
    card.prepend(stop)
    card.classList.add('card--previewing')
}

function stopPreview(card, lesson)
{
    // Rebuilt rather than reused: the thumbnail is gone once it was swapped out.
    card.replaceWith(createCard(lesson))
}

loadLessons()
loadBuildDate()
