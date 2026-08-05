# 17 - Particles

didn't spend too much time after finishing the previous lesson tbh
50 more lessons to go DAMN
i'll probably switch the lessons not required for the certificate though

this lesson reminds me of particles in unity i remember tinkering with them a lot
should be pretty much different there though

so particles are very performant we can have 100 of them with no lag
but they are planes that always face the camera

receipe for a particle = BufferGeometry + PointsMaterial = Points (not Mesh)
We can use any basic three js geometry, every vertex will become a particle

using a basic geometry with the points material on it's own makes a cool look
it might be worth investigate for a cool looking thing, it's a cheap and
stylish effect kinda like the wireframe or the fragment texture or even the matcap

while limit testing i found that my computer didn't crash but that there's a
limit of vertex draw count threejs can handle lol

we can put colors and textures on our particles just like we would do with most other
materials

our particles kinda glithch and overlap
we can use alphaTest with a really low value like 0.001 to make this better
there's also depthTest which can be problematic when other objects are in the
scene though
the particles are drawn on top of everything

NOTE: it creates a really cool effect i could see this work out for some scenes

there's also depthWrite = false
which prevents webgl from writing particles in the deph buffer
does the trick but we might need to switch out those methods based on the needs

we can animate by moving the points themselves but that doesn't give us too much control
we can update each vertex by going 3 by 3

don't forget to notify three js that the geometry changed

particlesGeometry.attributes.position.needsUpdate = true 

easy enough lesson, the harder stuff is coming later... (shaders i fear them)