# 03 - First Three.js Project

(not my first one but I can roll with that)
By the way I'm coding on windows, I try to separate work and personnal stuff so these days I enjoy coding on my desktop, after having setup WSL it's a good experience.

All the lessons starter pack have been updated to Vite which is a huge W, they use to run on Webpack
which did the job but let's be honest Vite is way better and faster.

```
Vite was created by Evan You, the creator of Vue.js, is highly maintained by hundreds of developers, and is getting a lot of hype.
```

S/O Evan You, I really enjoy vue these days

The beginning of the lesson explains how to setup your server vite and everything but I kinda skipped that since I already know how to do this.

...


```
The scene is like a container. You place your objects, models, particles, lights, etc. in it, and at some point, you ask Three.js to render that scene.
```

*the scene is everything*

Then we add objects that can be geometries, imported models, particles, lights, etc...
We can add a Mesh
Mesh = Material + Geometry
Material = Kinda like paint
Geometry = Vertices and positions that form the shape of a mesh

We add a Camera
sort of like a real camera, but not visible in thje scene, there are a lot of types of cameras but for no we'll use the PerspectiveCamera
1st param: FOV (always maxed when playing fps to feel fast) explained in degrees
small value, looks zoomed in, big value looks zoomed out and edges wrap
2nd param: aspect ratio, usually width / height

Renderer, renders the scene anf creates the canvas or just takes it as a param

don't forget to put the camera back so that it doesn't spawn inside the cube