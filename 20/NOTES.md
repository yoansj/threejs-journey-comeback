# 20 - (wip) Physics

This is gonna be a reaaaally funny lesson I can already feel it
I'll probably spend a bunch of time cooking some stuff up lol

I pretty much already know the gist of it since i've done it before and I already 
thought about physics in threejs but also phsyics simulations in multiplayer
experiments

basically how we do physics is there's a physical world with calculations gravity
and all that stuff, it needs to be updated with a ticker just like the stuff we
render, to make both work we need to sync the physical world with the visual world

Creating a physical cube now has two steps:
- Three js step, creating the geometry, the material, adding in the scene
- Creating the cube in the physical world
Sync the two together and ta-daaa you got what you wanted

we can also use a 2d physics library if we only represent stuff on two axes, the other
day i stumbled across a multiplayer tank game doing exactly that

the lesson includes a complete list of 2d and 3d physics engine, can be handy for later

sidenote: https://threejs.org/examples/?q=ammo#physics_ammo_break
i tried this example and it gave me a really silly idea about a day-based game
would be called something like: break capitalism today
basically everyday we generate a random-ish building that you need to break
everyday you have the same ressources to do so, 3 boulders 1 tnt etc etc
the more you break it the more score you get
you can compare scores with other people
that's it lol
silly but i wanna do it

anyways we're using cannon.js for this lesson

in cannon Body is a physical object that needs a Shape, the primitives are kinda like the threejs ones

once we added a ball and a plane we can add a physics material kinda like game engines so there's friction
or bounces
we need to create a contact material, i guess a material that indicates what happens when two materials get in contact ?

// sphereBody.applyForce -> applies a force from a point in the world like wind or example
// sphereBody.applyImpulse -> instead of adding to the force, adds to the velocity
// sphereBody.applyLocalForce -> same as applyForce but local to the body coordinates
// sphereBody.applyLocalImpuse -> same as aaply impulse but local to the body

we can optimize the broadphase (the collision testing) algorithm
there are 3 algorithms available
- NaiveBroadphase: Tests every Bodies against every other Bodies (default)
- GridBroadphase: Quadrilles the world and only tests Bodies against other Bodies in the same grid box or the neighbors' grid boxes.
- SAPBroadphase (Sweep and prune broadphase): Tests Bodies on arbitrary axes during multiples steps.

last one is more optimized but can generate bugs for fast moving objects