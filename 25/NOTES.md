# 25 - Realistic render

I'm skipping the next lesson cause:
- 1 it's not necessary for the certificate which i'm also trying to get while redoing the course / doing lessons I haven't done
- 2 iirc it's a lesson more aimed towards coding beginners I already have a rough idea of
how I would wanna architecture a native threejs app
- 3 i'm not sure i'll do many native threejs apps later on, but if I do i wanna do my own architecture

anyways next lesson after this one is the shaders i'm excited whoooo

-----

there's a toneMapping setting on the renderer which changes the way the color looks
by default it's off but we can change it for a better look

renderer.toneMapping = THREE.ACESFilmicToneMapping

-----

we can change the anti aliasing prop to true on the renderer
to get rid of the aliasing

it's performant heavy but yeah

----

after that we can add a directionnal camera to create shadows
the env map doesn't allow us to do so
we optimize the shadows and change the target as we did before
