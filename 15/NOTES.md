# 15 - Shadows

Shadows, not to confuse with shadow the hedgehog of course, I grossly remember how it works it's not too complicated

Shadow viz example: https://threejs.org/examples/webgl_shadowmap_viewer.html

First we need to activate shadows on the renderer
and then activate them on each mesh
there's castShadow and receiveShadow

Only the following types of lights support shadows:
  PointLight
  DirectionalLight
  SpotLight

we can make the shadow look better by improving the map size
shadows are stored in a texture that we can manipulate hence the "map"
by default it's only 512x512 but we can improve it **but always keep a power of 2**

```
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
```

since threejs uses cameras to render shadows we can use helpers on the shadow cams themselves
and then optimize the various values on the cams
we can also change the blur by editing the radius value

there are a few algorithms that can be applied to the shadows to change the look and performance

- THREE.BasicShadowMap: performant but kinda ugly, blur doesn't work with it
- THREE.PCFShadowMap (default): less performant but smooth
- THREE.PCFSoftShadowMap: less performant but smooth++
- THREE.VSMShadowMap: less performant, can be unexpected, wild stuff

by default the shadows of different lights don't merge

the PointLight is really performant heavy with shadows since it shines on every direction
it creates a cube shadow map

we can also use baked shadows on textures to save some ressources
then we just import the shadow assign it as a map to the plane annnd
yeah we got a shadow but it's not dynamic
in my examples I changed the lights color and it completely ruins the thing so it's even worse

another solution could be to put that pre baked shadow on a plane and move it with the sphere
works out well but still kinda cheap

i think depending on the project and the scenes we can pretty much use a combination of real
and fake shadows, ex an object not moving in a static room could have a pre baked shadow
at the same time writing this a real time non moving shadow shouldn't be too expensive too
for that kind of stuff

also looking online it seems to be possible to combine multiple shadow maps with alternative packages
this might be worth investigating
https://github.com/strandedkitty/three-csm

next uppp HAUNTED HOUSE BABYYY