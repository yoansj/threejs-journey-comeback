# 28 - Shader patterns (wip)

In sleep debt but i keep going

so this lesson aims on drawing patterns with shaders, texture do that but with less control
that's why we're using shaders for that
there's quite some math involved and i suck at math but anyways i'm gonna try to follow up

since we'll draw patterns most of the code is gonna be in fragment shaders
we can send the uvs using a varying, the uvs are already declared cause we use ShaderMaterial

## First pattern

We assign the uv coordinates to the FragColor

gl_FragColor = vec4(vUv, 1.0, 1.0);

## p2

Same but with blue a 0

## p3

we can use the uv .x for all the values of the color
it makes a black and white gradient that goes from
left to right, black to white

gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

since it goes from 0 to 1 kinda makes sense

## p4

same with .y

## p5

we invert the value of the uv
1.0 - vUv.y

## p6

we squeeze the gradient by multiplying the value
since the value is bigger the gradient gets shorter

if we do * 2 the gradient is 50%
* 10 idk how much it is though
it seems exponential idk


## p7

i knew it was some modulo stuff but didn't know % doesn't work in glsl lol we have to use mod(left, right) a bit lame but it's okay

float strength = mod(vUv.y * 10., 1.);

in out case 10 is the number lines

## p8

same as before but with a step
step takes a edge param and a number
if number is below step we get 0.
otherwise we get 1.0

strength = step(0.5, strength);

## p9

i figured it woohooo
it's the same as before but with a higher step

## p10

figured it too wasn't too hard
we use x instead of y on the uv to get horizontal stripes

## p11

we combine the two steps, the shapes then collide

float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
strength += step(0.8, mod(vUv.y * 10.0, 1.0));