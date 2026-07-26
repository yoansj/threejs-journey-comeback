# 10 - Textures

let's go

- Color (albedo): Simple one, takes the pixels and puts it on the geometry
- Alpha: grayscale image white is visible, black isn't
- Height: grayscale image that creates some relief, needs subdivision to make a difference
- Normal: Adds small details without moving the vertices, very performant, doesn't need subdivision
- Ambient occlusion: Grayscale image that creates fake shadows in the crevices
- Metalness: grayscale image that specifies metallic parts
- Roughness: comes with metalness, white parts are rough, black parts are smooth

```
You should see the door texture on each side of your cube. but, the texture looks oddly greyish.

It’s because the image has been encoded using the sRGB color space but Three.js isn’t aware of this.

To fix that, you need to set their colorSpace to THREE.sRGBColorSpace:

const texture = new THREE.Texture(image)
texture.colorSpace = THREE.SRGBColorSpace
```

important thing to remember

```
The native JavaScript technique is not that complicated, but there is an even more straightforward way with TextureLoader.

Instantiate a variable using the TextureLoader class and use its .load(...) method to create a texture:
```

Way more practical

```
You can send 3 functions after the path. They will be called for the following events:

    load when the image loaded successfully
    progress when the loading is progressing
    error if something went wrong
```

three different callbacks

```
Finally, if you have multiple images to load and want to mutualize the events like being notified when all the images are loaded, you can use a LoadingManager.

Create an instance of the LoadingManager class and pass it to the TextureLoader:
```

handy, won't use it for now though

```
 UV unwrapping

While it is quite logical how to place a texture on a cube, things can be a little trickier for other geometries.

Try to replace your BoxGeometry with other geometries:
```

hard stuff

I like the candy wrap image for uv unwrapping I think it's the best visualisation

```
As you can see, the texture is not repeating, but it is smaller, and the last pixel seems stretched.

That is due to the texture not being set up to repeat itself by default. To change that, you have to update the wrapS and wrapT properties using the THREE.RepeatWrapping constant.

    wrapS is for the x axis
    wrapT is for the y axis
```

I remember that

```
Mipmapping (or "mip mapping" with a space) is a technique that consists of creating half a smaller version of a texture again and again until you get a 1x1 texture. All those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture.

Three.js and the GPU already handle all of this, and you can just set what filter algorithm to use. There are two types of filter algorithms: the minification filter and the magnification filter.
```
i remember this too

```
The artefacts you see are called moiré patterns and you usually want to avoid them.
```

after having tried with the checkerboard texture, it looks trippy, those textures are the best way to test the min mapping


```
 Magnification filter

The magnification filter works just like the minification filter, but when the pixels of the texture are bigger than the render's pixels. In other words, the texture too small for the surface it covers.

You can see the result using the checkerboard-8x8.png texture also located in the static/textures/ folder:

const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')

The texture gets all blurry because it's a very small texture on a very large surface.

While you might think this looks awful, it is probably for the best. If the effect isn't too exaggerated, the user will probably not even notice it.
```

true depending on the scene this might be okay

```
You can change the minification filter of the texture using the minFilter property.

There are 6 possible values:

    THREE.NearestFilter
    THREE.LinearFilter
    THREE.NearestMipmapNearestFilter
    THREE.NearestMipmapLinearFilter
    THREE.LinearMipmapNearestFilter
    THREE.LinearMipmapLinearFilter

The default is THREE.LinearFilter.

If you test the THREE.NearestFilter, you'll see that the base image is preserved, and you get a pixelated texture:
```

cool for minecraft like textures like he said, without the filter it looks like it hasn't loaded kinda like
the blurry dollars object that studio made

```
One final word about all those filters is that THREE.NearestFilter is cheaper than the other ones, and you should get better performances when using it.

Only use the mipmaps for the minFilter property. If you are using the THREE.NearestFilter, you don't need the mipmaps, and you can deactivate them with colorTexture.generateMipmaps = false:
```
good to know need to remember

## Important stuff about textures

- Always keep in mind the weight for faster loadings always compress them
- The size of the texture for the resolution, because of the mip
mapping width and height must always be a power of 2 512x512, 1024x1024 or 512x2048

```
If you are using a texture with a width or height different than a power of 2 value, Three.js will try to stretch it to the closest power of 2 number, which can have visually poor results, and you'll also get a warning in the console.
```

```
We haven't tested it yet, because we have other things to see first, but textures support transparency. As you may know, jpg files don't have an alpha channel, so you might prefer using a png.

Or you can use an alpha map, as we will see in a future lesson.

If you are using a normal texture (the purple one), you will probably want to have the exact values for each pixel's red, green, and blue channels, or you might end up with visual glitches. For that, you'll need to use a png because its lossless compression will preserve the values.
```

textures sites: 
poliigon.com
3dtextures.me
arroway-textures.ch