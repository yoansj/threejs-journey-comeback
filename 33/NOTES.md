# 33 - Hologram (wip)

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