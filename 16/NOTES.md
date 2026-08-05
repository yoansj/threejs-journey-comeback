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

we added a whole lot of textures
I choose different ones from bruno cause I felt like it
Now it's time to add the ghosts
I pretty much remeber this part of the lesson with the sin and cos
I'll do one like that and then i'll move the two others in a semi random and fun way using gsap

I also wanna add text on the tombs that would be funny

I remember the fog part but I don't remember hearing about FogExp that seems new and cool !

Last part of the lesson is optimizing the textures but i kinda already know how that works since it's image optimization
i don't want to be spending too much time on this lesson and on most of the lessons in general so i'll be doing a little 
more fun stuff and then going to the next one
my goal is pretty much to do all the lessons, with a focus on the added lessons since last time, shaders and r3f
even though i already used r3f before, hopefully i also catch up the lesson at the right time
for the next update

anyways
I added the blinking light
My ghosts are pretty funky, I might add some small models like trees and such
I wanna do the tombstone text thing too