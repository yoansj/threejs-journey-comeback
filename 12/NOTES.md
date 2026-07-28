# 12 - 3D text

I remember this one I think I created a profile picture with the results after

I decided to go with Satoshi, the // STUDIO [1N] font (my studio yaaay)
Converted it and imported it, straightforward

# Center the text

```
What we want is to use this bounding to know the size of the geometry and recenter it. By default, Three.js is using sphere bounding. What we want is a box bounding, to be more precise. To do so, we can ask Three.js to calculate this box bounding by calling computeBoundingBox() on the geometry:
```

Kinda like the bounding box calls in the dom

but we can just center the text using .center though

I loaded all the matcaps and put them into an array so we can select them with the GUI
changed the color space for all of them suddenly they all look way better
m.colorSpace = THREE.SRGBColorSpace

now we spawn random objects, standard loop with randomized position, randomize the scale, simple stuff

```
Our code isn't very optimized. As we saw in a previous lesson, we can use the same material on multiple Meshes, but we can also use the same geometry.

Move the donutGeometry and the donutMaterial out of the loop:
```

pretty much standard stuff but you gotta think about it

we can even use the text material since it's the same as the donuts, i guess it's a cheap and effective way to save
fps

it's pettry much done but i'll work on it again