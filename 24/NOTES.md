# 24 - Environment map (wip)

This lesson seems to have been updated since last time, I remember it's not too complicated but anyways let's go

The env map is usually the big box surrounding the 3d scene that can also be used to light up the scene and handles reflections and lighting inside objects

```
We are also going to discover how to find and generate those environment maps using resources such as Blender and Artificial Intelligence-powered image generators.
```

ai found it's way here that's what happenned

-------

we're gonna load a env map with a CubeTextureLoader
thy are env map taken from polyhaven and converted using https://matheowis.github.io/HDRI-to-CubeMap/

to apply thez env map as a background and to make it light the whole scene we just do 

scene.environment = environmentMap
scene.background = environmentMap

we can change the intensity using environmentIntensity
we can blur the background using backgroundBlurriness 
we can also change the background intensity with backgroundIntensity

we can rotate the background and the environment, trippy

scene.backgroundRotation
scene.environmentRotation

i wonder if we can animate it, probably ? we can probably do a great effect with that

i tried with lil gui honestly it makes me wanna puke but i'm sure it can be a great effect

------

i learned a new word which i kinda knew before

Equirectangular basically 360 deg vids or images, usually hdri images are in this form

```
“RGBE” stands for “Red Green Blue Exponent” where the exponent stores the brightness. RGBE is what we would call the encoding for the “HDR” format which justifies the name of the loader instead of HDRLoader.
```
my brain might be fried cause i don't get it lol
anyways so to load a hdri we use this special loader

environmentMap.mapping = THREE.EquirectangularReflectionMapping

i forgot this line and just got the texture as 360 deg lol

anyways it looks much more realistic and lighten with no intensity tweak

hdris are better but heavier and take time to load

-----

now we generate an env map using blender yay