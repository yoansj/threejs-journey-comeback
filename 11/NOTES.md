# 11 - Materials

after having struggled with the previous quizz because of the rotation question I now prepare my scene by adding
a sphere a plane and a taurus shape

## MeshBasicMaterial
The most basic material, some params can be added in the constructor or later on

```
const material = new THREE.MeshBasicMaterial({
    map: doorColorTexture
})

// Equivalent
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
```

map adds a texture

color adds color, needs to instantiate a new THREE.Color for that

```
material.map = doorColorTexture
material.color = new THREE.Color('#ff0000')
```

both can be combined to change the texture color

wireframe, well we already know that one

opacity to use transpacency but needs transparent = true

we can use the alpha texture with the alphaMap property once transparent has been set

```
The side property lets you decide which side of the faces is visible. By default, the front side is visible (THREE.FrontSide), but you can show the backside instead (THREE.BackSide) or both (THREE.DoubleSide):
``` 

neat

```
Try to avoid using THREE.DoubleSide whenever possible because it actually requires more resources when rendering, even though the side isn’t visible.

Some of these properties like wireframe or opacity can be used with most following materials. We won't repeat those every time.
```

important

## MeshNormalMaterial

a material for normals, the color is sweet i like it

```
You can use Normals for many things like calculating how to illuminate the face or how the environment should reflect or refract on the geometries' surface.

When using the MeshNormalMaterial, the color will just display the normal orientation relative to the camera. If you rotate around the sphere, you'll see that the color is always the same, regardless of which part of the sphere you're looking at.
```

nice to know

```
flatShading will flatten the faces, meaning that the normals won't be interpolated between the vertices.

MeshNormalMaterial can be useful to debug the normals, but it also looks great, and you can use it just the way it is, similar to what ilithya did on her portfolio https://www.ilithya.rocks.
```

interesting, really cool portfolio also !

##  MeshMatcapMaterial 

I remember this one was one of my favorites and I still love the way it looks

```
The meshes will appear illuminated, but it's an illusion created by the texture. There is no light in the scene.

The only problem is that the result is the same regardless of the camera orientation. Also, you cannot update the lights because there are none.
```

great looks for cheap cannot be perfect

```
If you want to know where to find matcaps textures, then check out the following vast list of matcaps: https://github.com/nidorx/matcaps

Note that licenses aren’t all verified and you might not be allowed to use them other than for personal projects.

You can also create your own matcaps using 3D software by rendering a sphere in front of the camera in a square image. You can even try to create a matcap in 2D software like Photoshop. And finally, you can use online tools just like the one Kevin Chapelier built: https://matcap-studio.vercel.app:
```

I think I remember creating a few of them but really really cool, i'll remember to use them in my future projects

## MeshDepthMaterial 

Not a visual banger but useful, will talk about it in the future

## MeshLambertMaterial

needs lights, gives some kind realistic look, most performant material that uses lights, will explore in the future

## MeshPhongMaterial

```
MeshPhongMaterial is less performant than MeshLambertMaterial. However, it doesn't really matter at this level.

You can control the light reflection with the shininess property. The higher the value, the shinier the surface. You can also change the color of the reflection by using the specular property:
```
shiny stuff

## MeshToonMaterial

really like this one too
you can add more steps to the color by adding a gradientTexture

```
The cartoon effect doesn't work anymore. It’s because the gradient texture is actually a very very small texture of 3 by 1 pixels. When extracting the pixels from this texture, the GPU will blend them.

Fortunately, we can control how the GPU handles such texture thanks to the minFilter, magFilter, similar to what we saw in the Textures lesson when talking about mipmapping.

Change the minFilter and magFilter to THREE.NearestFilter.
```

important stuff

## MeshStandardMaterial

realistic material that uses PBR standard cause PBR is now standard, i'm guessing it's probably expensive.
now we add a env map

```
To load the previously mentioned environment map file, we need to use the RGBELoader. Import RGBELoader from three/examples/jsm/loaders/RGBELoader.js:
```

pretty much works like other loaders

loved the demos that uses them but i'm not too sure about real projects though

```
The aoMap property (literally "ambient occlusion map") will add shadows where the texture is dark.

Then, add the aoMap using the doorAmbientOcclusionTexture texture and control the intensity using the aoMapIntensity property:
```

things look better with it

setting a bunch of textures to make the plane look like an actual door we end up with this

```
const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 1
material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.1
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.transparent = true
material.alphaMap = doorAlphaTexture
```

## MeshPhysicalMaterial 

basically MeshStandardMaterial but with additionnal effects that sound like unreal engine stuff

```
The clearcoat will simulate a thin layer of varnish on top of the actual material. This layer has its own reflective properties while we can still see the default material behind it.

Here’s an example.

Add the clearcoat and clearcoatRoughness properties with their corresponding tweaks:
```

damn i don't remember this being there last time, looks good and could be nice for marbles or glass based stuff i guess

```
The sheen will highlight the material when seen from a narrow angle. We can usually see this effect on fluffy material like fabric.
```

yeah this looks nice too

```
The iridescence is an effect where we can see color artifacts like a fuel puddle, soap bubbles, or even LaserDiscs for those who are old enough to remember them.
```

```
The transmission will enable light to go through the material. It’s more than just transparency with opacity because the image behind the object gets deformed.
```

glass water jelly, looks so great damnn

ior = index of refraction, depends on the material
You can find the whole list on Wikipedia https://en.wikipedia.org/wiki/List_of_refractive_indices
