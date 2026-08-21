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