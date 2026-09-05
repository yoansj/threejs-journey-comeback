# 33 - Hologram

this is also a new lesson for me, shaders are going pretty well so imma keep going

We're going to create a hologram effect kinda like star wars and i'm a big fan so i'm excited for this
most of the logic is in the fragment shader but there's also the glitch on the vertex to shake the geometry

for the pattern we're gonna draw stripes on the y axis kinda like the pattern we did in the patterns lessons
i was about to write it but it seems we're relying on the model position and not the uv coordinates, i'm not too sure why

-----------

for the stripes we can use a modulo on the position y
  float stripes = mod(vPosition.y * 20., 1.);
then we can multiply by 20 to increase the number of stripes

`
If you search for the modulo definition you might be overwhelmed, especially if mathematics isn’t your thing. But I like to think of it as: You send a value as a the first parameter and when that value reaches the second parameter it goes back to 0
`

we have the choice of making the pattern move with the object if we use position instead of modelPosition but i don't really like it tbh so i'll use modelPosition, i might add a uniform for that though

--------------

we're now gonna use the fresnel effect

`
The pattern is looking good but a bit too regular. Most of the time, holograms are represented with their outside looking brighter than the inside.

We can do that using the normal and the view angle.

We want a value to be 1.0 when the view angle is perpendicular to normal and 0.0 when the view angle is aligned with the normal:
`

i kinda understand the effect with the illustrations but idk i find it a bit hard to grasp

a few articles

https://www.racoon-artworks.de/cgbasics/fresnel.php
https://www.dorian-iten.com/fresnel/
https://shanesimmsart.wordpress.com/2022/03/29/fresnel-reflection/

to do that we pass the normals to the fragment shader with a varying

there was a bit of math concepts and complicated stuff tied to the fresnel later on like inverting the normals for the backside etc i think it's better to comeback to this lesson later if i wanna do some kind of cool hologram but i get the gist of it

the fragment shader is done now onto the vertex shader for the glitch effect

------------------

we want random glitches but random is complicated in glsl, we can use a function in the book if shaders

https://thebookofshaders.com/10/?lan=fr

i need to read that article later

  modelPosition.x += random2D(modelPosition.xz) * .1;
it already gives off a solid effect to me

we need to add the elapsed time because right now the glitches are animating only because of the mesh movement
  modelPosition.x += random2D(modelPosition.xz + uTime);

the meshes are out of place after the random, we can subtract .5 so the values go from -.5 to +.5

after that we can use sin to create the glitch strength and subtract the y value so that the effect goes from the bottom to the top
since we use sin, the effect repeats itself
  float glitchStrength = sin(uTime - modelPosition.y);

we can remap the values to make the effect appear less often using a smoothstep
  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);

after that we add 3 different sin to the glitch strength to have a more random formula and we divide it by 3 to clamp the values

we can separate the shaders function just like the previous lesson but i'm feeling lazy to do it
i could also go further but yeah a bit lazy, this lesson was interesting and i understood most of it but i definetely need to get back to it later

`
As always, feel free to go further.

Here are some ideas:

    Add tweaks to control the animation
    Add tweaks to control the pattern
    Add sounds
    Add scenery like R2D2 displaying the hologram
    Create color variation instead of a uniform color

`