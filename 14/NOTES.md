# 14 - Lights

Previous lesson was just a lesson about how to export and host stuff, when I first did this I remember exporting to vercel
my old projects from this course are still on vercel but since i'll be remaking them i'll host them with my own solution
most of the exercises results can be found on threejs.studio1n.fr :yay:

so today lesso about lights worth to remember they only work with certain materials
MeshStandardMaterial is the most realistic one with lights

AmbientLight on it's own doesn't look great but coupled with other lights and dimmed gives a nice effect

DirectionalLight sun like light, by default comes from above but the object can be moved with position

HemisphereLight is kinda like an ambientLight but has a color for the faces facing the sky and the ones
facing the ground, tbh I don't exactly understand how that's used but i'll experiment

PointLight is kinda like a lighter but i like to think of it as a campfire because it's what i used and
will use to create my future campfire experiments of course

for realistic results we can vary intensity but also distance and decay
distance 0 = infinite
decay low = faster decay for the light

rect area light is basically studio lights, a mix between directionnal light and a diffuse light
it only works with MeshStandardMaterial and MeshPhysicalMaterial

spolight is basically a flashlight
it comes with a target that we need to move in order for it to rotate
we also need to add it in the scene


in terms of performance always add as few lights as possible
use low-cost lights such as:
- AmbientLight
- HemisphereLight
Those are pretty moderate
- DirectionalLight
- PointLight
Those are expensive
- SpotLight
- ReactAreaLight

there are helpers that I already know of but yeah we won't be using them i already spent too much time on this lol