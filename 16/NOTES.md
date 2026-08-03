# 16 - Haunted House

I remember this pretty well, my first version was cool I remeber adding fences and other stuff
i'll try to make an even cooler version this time
The goal is basically to make a haunted house only using primitives

Bruno gives a tip for mesurement basically to always keep a base unit and not use random values
I will expend on that and actually write my unit as a const in the top of the file and then only use it

we first add a big ass plane with a mesh standard material so we can use PBR textures later on to have
a realistic look

we add each part of the house, walls with a box geometry
roof with a cone, door as a simple plane that will get the door texture that we had
we also add bushes as simple spheres

bushes all use the same geometry and material for optimisation purpose
we'll do the same for the graves

we do some trigonometry to place the graves across the house in a circle

half a circle is Math.PI so * 2 is a full circle
we can then generate a random angle by multiplying pi with a random
then using sin with that angle gives a x position
and using that same angle with cos gives us a z position

we than pretty much rnadomize the rotation of the graves

I added a little touch of gsap to make the graves raise from the ground

This lesson was pretty much updated since last time I don't remember adding an alphaMap to the
ground the last time I did it, it makes the floor pretty much fade out nicely
For the fade bruno says he generated the alphaMap using figma and gives a link to some assets and ressources

https://brunosimon.notion.site/Assets-953f65558015455eb65d38a7a5db7171

