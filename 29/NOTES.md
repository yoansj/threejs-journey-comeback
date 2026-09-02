# 29 - Raging sea

Previous lesson was really long and took me several days since I really tried to understand all of it, i'm hoping this one will be shorter though

So this is a raging sea shader, i've done it before but got no idea where's the result i made lol, our setup is just a basic plane of 128 by 128 vertices which we might increase later

we need to convert the shader color to a srgb color using an include which is 
    #include <colorspace_fragment>
it will just make colors look better

## waves

we can use a sin to get the waves, we will however add uniforms to control the intensity of the waves
we add uniforms for the elevation (how high it goes)
for the frequency (the number of waves on each axis)
the elapsed time to animate
the waves speed

## colors
for the colors the principle is to have a color for the surface and the depth
then we can use varying to mix those two colors depending on the elevation

however by just doing that our colors don't change that much we can add uniforms to tweak this

    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;

i get a pretty different result as bruno but it's okay i guess i'll tweak it later on

## small waves

we'll create small waves using a perlin noise, in the previous lesson we used a 2d one, now we'll use a 3d one bruno says it will enable more variations for realistic stuff

to apply the noise we apply it in a loop, we apply the noise 3 times to make it more chaotic

        elevation -= abs(cnoise(vec3(modelPosition.xz * 3.0 * i, uTime * 0.2)) * 0.15 / i);

modelPosition.xz * 3.0 * i -> chaos generator, each iteration is more chaotic then the rest
uTime * .2 -> helps make the speed of the waves not too high
0.15 / i -> clamps the value so that the waves aren't too big, depending on the iteration

after that we can increase the number of vertices on the plane so the small waves are more noticeable

i might come back to this and add the foam later on along with the fog

i ended up adding a very very cheap foam which is ugly but works