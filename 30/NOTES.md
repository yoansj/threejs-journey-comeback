# 30 - Galaxy Generator (Shaders)

back at it again again with shaders this time

I took my project 18 as a base for this one
we remove the spin formula to make the spin driven by the shaders

We change the original points material with a shader material, which doesn't support size or sizeAttenuation so we need to remove them, after that we add some basic vertex and fragment shaders

the only difference in the vertex shader is gl_PointSize assignation which controls the size of the particles

we also add a uSize uniform to be able to control that size

we add a random scale attribute on the geometry, since the scale is just one value which is a float the array is just times * 1 (for a color or pos it was * 3)

we multiply the size by the random scale

to make sure that the size of the particles doesn't depend on the pixel ratio we can just multiply uSize value by the renderer.getPixelRatio()

to apply the size attenuation we can look at the original points shader and transform the formula

`
  To get the size attenuation, we need to multiply gl_PointSize by this formula ( scale / - mvPosition.z )

  According to Three.js, the scale is a value related to the render height. To make things manageable, we can replace it with 1.0.

  The mvPosition corresponds to the position of the vertex once the modelMatrix and the viewMatrix have been applied. In our case, it's our viewPosition variable.

  This might sound a little complex, but we can write it like that:
`

gl_PointSize *= (1.0 / - viewPosition.z);

---------

after that bruno proposes a bunch of patterns to use but i ended up reusing my rotated star pattern from the other lesson
just like bruno i ended up making the particles bigger but not as big

for the colors, the color attribute is already included since we use ShaderMaterial, we just need to use a varying to give it the to the fragment shader then we can use a mix

    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);

for the animation we just add a time uniform as usual and update it in the loop with the elapsed time

i don't exactly understand all the steps here but:
- we first get the angle using atan, between x and z
https://thebookofshaders.com/glossary/?search=atan
- we then get the distance to the center using length on xz
- we can calculate an angle offset by dividing 1 by the distance to the center and then multiplying that by uTime to animate it, and then by 0.2 to slow down the effect
- we then apply that offset to the angle
- then we update the position x with cos and the z with sin and that angle
- to make sure it doesn't rotate in a closed circle we multiply by the distance to the center

i ended up adding a new uniform to control the speed but yeah