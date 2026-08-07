# Revisiting Three.js journey after a few years

New lessons have been added so I will check them out while redoing all of the course
Taking notes for each lesson even though I will probably read the text instead of watching the videos
I prefer learning with text, makes it easier to go out of your way and do things differently whereas when watching
a video I tend to do exactly how it's done in it. Try a lot of customisation for all the lessons, try to do a mini project everytime
Maybe trying to use the vue wrapper of three js too ?
Will probably host all of the exercises on a website at some point
Every lesson has it's own folder, every folder will have a NOTES.md file with my notes for the lesson

Turns out I let this hang for another year, I guess we're doing it again ?

## Homepage

`homepage/` is a Vite project of its own, served at the root of the deployment. It shows a card per built
lesson: clicking the thumbnail swaps it for an iframe running the lesson inside that very card, and the
button at the end of the card title opens the lesson's own `/NN/` URL in a new tab. It is not a numbered
folder, so it never shows up in its own listing.

- `npm install && npm run dev` inside `homepage/` to work on it. In dev the lesson list is scanned straight
  from the repository, so the cards are all there but the iframes stay empty (nothing has been built).
- Card title = first `# heading` of the lesson `NOTES.md`, minus its leading number.
- Card thumbnail = optional `thumbnail.png` (or `.jpg`, `.webp`, `.avif`, `.gif`) at the root of the lesson
  folder. Without one the card just shows the lesson number.
