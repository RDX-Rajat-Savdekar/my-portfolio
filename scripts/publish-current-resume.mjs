import { copyFileSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = fileURLToPath(new URL('..', import.meta.url))
const publicDir = join(repo, 'public')
const dest = process.argv[2]
  ? join(repo, process.argv[2])
  : join(publicDir, 'resume.pdf')

const hits = readdirSync(publicDir)
  .filter((name) => name.endsWith('_current.pdf'))
  .map((name) => join(publicDir, name))

if (hits.length !== 1) {
  if (hits.length === 0) {
    console.error(
      'No resume tagged _current in public/. Rename the file you want, for example Rajat_resume_current.pdf.'
    )
  } else {
    console.error(
      'More than one resume tagged _current in public/:\n' +
        hits.map((hit) => '  ' + hit).join('\n')
    )
  }
  process.exit(1)
}

mkdirSync(dirname(dest), { recursive: true })
copyFileSync(hits[0], dest)
console.log(hits[0] + ' -> ' + dest)
