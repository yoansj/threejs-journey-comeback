import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const THUMB_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif']

// In production /lessons.json is written by docker/40-lessons.sh from what was
// actually built and not excluded. In dev nothing built anything, so scan the
// repository directly: the grid is browsable, only the iframes stay empty.
function devLessonsList()
{
    return {
        name: 'dev-lessons-list',
        apply: 'serve',
        configureServer(server)
        {
            server.middlewares.use('/lessons.json', (req, res) =>
            {
                const lessons = fs.readdirSync(repoRoot, { withFileTypes: true })
                    .filter((entry) => entry.isDirectory() && /^\d\d/.test(entry.name))
                    .filter((entry) => fs.existsSync(path.join(repoRoot, entry.name, 'package.json')))
                    .map((entry) =>
                    {
                        const id = entry.name
                        const thumbnail = THUMB_EXTENSIONS
                            .map((ext) => `thumbnail.${ext}`)
                            .find((file) => fs.existsSync(path.join(repoRoot, id, file)))

                        return {
                            id,
                            title: readTitle(id),
                            thumbnail: thumbnail ? `/${id}/${thumbnail}` : null
                        }
                    })
                    .sort((a, b) => b.id.localeCompare(a.id))

                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(lessons, null, 2))
            })

            // Serve the lesson thumbnails straight from the lesson folders.
            server.middlewares.use((req, res, next) =>
            {
                const match = /^\/(\d\d[^/]*)\/(thumbnail\.[a-z]+)$/.exec(req.url.split('?')[0])
                if (!match) return next()

                const file = path.join(repoRoot, match[1], match[2])
                if (!fs.existsSync(file)) return next()

                res.end(fs.readFileSync(file))
            })
        }
    }
}

// First "# heading" of the lesson NOTES.md, minus its leading lesson number.
function readTitle(id)
{
    try
    {
        const notes = fs.readFileSync(path.join(repoRoot, id, 'NOTES.md'), 'utf8')
        const heading = /^#\s+(.+)$/m.exec(notes)
        if (heading) return heading[1].replace(/^\d+\s*[-–—:.]\s*/, '').trim()
    }
    catch {}

    return `Lesson ${id}`
}

export default {
    root: 'src/',
    publicDir: '../static/',
    server:
    {
        host: true
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true
    },
    plugins: [ devLessonsList() ]
}
