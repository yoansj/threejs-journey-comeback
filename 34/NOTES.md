# 34 - Fireworks

this is also a new one let's get rolling !!
the goal is to spawn particles on user click, they have several phases going on

`
The trick here is that we are going to use particles and animate them in a single vertex shader.

The particles start to expand fast in every direction
They scale up even faster
They start to fall down slowly
They scale down
They twinkle as they disappear
`

the setup is the usual one except we have gsap this time

--------------

kinda like the galaxy generator we'll use a createFirework function called on click, it will make it easier to reuse the logic

we fill the positions array with random values which we subtract 0.5
we then create the geometry and set the position attribute, we create a simple point material to start and create the points
we make them copy the position parameter it will be usefull to position the fireworks on a click later

---------------

we create basic shaders with the includes for the fragment shader and the gl_PointSize for the vertex one
we also add size attenuation with the previous formula
    gl_PointSize *= 1.0 / - viewPosition.z;
we use a uniform to control the particle size

----------------

there's an issue, the particles don't seem to resize when we reduce the render height which can end up making them look bigger so we'll handle that

for that we send a uResolution vector that corresponds to the sizes, we then just multiply the size by the resolution
    gl_PointSize = uSize * uResolution.y;

to fix the pixel ratio we pretty much just multiply the sizes by the pixel ratio
    sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

----------------

we then load textures and pass one as a uniform and use it in the fragment shader, however the textures seem to be surrounded by black boxes
usual fix:
- transparent to true
- depthWrite to false
- blending to AdditiveBlending so it looks more like lights

we also flipped the texture cause it was upside down

we then randomise the size by adding an attribute on the geometry

    gl_PointSize = uSize * uResolution.y * aSize;

------------------

positionning the particles in a circle is actually really simple and quite smart
the Spherical class from three js taxes a radius, a phi and a theta
phi goes from 0 to pi (half circle)
theta goes from 0 to pi * 2 (full circle)

we can set random values and then set a position from a spherical
            radius * (0.75 + Math.random() * .25),
`
Behind this fancy formula is a simple calculation. We multiply the radius by a number that will vary between 0.75 and 1. This way, the particles won’t go beyond the set radius but can get up to 25% closer to the center.
`

-------------------

to make the animation proegress we're going to use a progress uniform
we'll use gsap to animate the progress by adding a tween on the progress at the end of the function

`
As mentioned at the beginning, the animation is composed of 5 different phases:

    The particles start to expand fast in every direction
    They scale up even faster
    They start to fall down slowly
    They scale down
    They twinkle as they disappear

    The trick to creating such complex animations from one single progress value is to separate them properly and to remap the progress to suit the phase we are dealing with.
`

for the explosion the process is simple
- we use a custom remap that doesn't smooth the value
- we remap the progress value from 0.0 to 0.1 to 0.0 and 1.0, that's the range for the explosion
- after the remap we clamp the value so they don't go after 1.0
- then to make the explosion speed up and slow down (essentially change the easing) we pretty much use a reverse pow
- then we mix a position of 0 with the now position using the progress that was remapped to the [0, 1] range

it's actually pretty understandable

we follow pretty much the same logic for most phases

after that we setup a sky using an example from the docs and the rest is pretty much trivial, i could also separate the remap function but ehhh feeling lazy, this lesson was cool taught me some more stuff, i thought we would do the trail of the firework too when it goes up, i already know how i can do that but just like most lessons i might comeback to that later on

`
We are done with the lesson. As you can see, animating particles in the vertex shader is hard, especially when the animation is composed of multiple phases.

Separating those phases as much and as clearly as possible helps a lot.

As always, feel free to go further. Here are some suggestions:

    Add more particles. We have been a bit shy and you can add a lot more particles.
    Add default parameters to the createFirework function.
    Add more parameters to the firework function.
    Have different colors instead of a uniform color.
    Improve how particles are positioned in the sphere. The technique we used tends to concentrate particles on the poles.
    Add sound.
    Handle other shapes than a sphere. You could even try with the geometry of a loaded model.

`

it's hard but not impossible and i feel like i'm getting the gist of it