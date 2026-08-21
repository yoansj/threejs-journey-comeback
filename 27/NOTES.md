# 27 - Shaders

It's timeeee

So we've actually been using shaders from the beginning
shaders make up all of the rendering logic for threejs, using already made materials just means using already made shaders

a shader is a program written in a specific shader language, for webgl is glsl
those instructions are then read by the gpu that then displays stuff
there are two types of shaders, my memory says vertex and fragment, one for color and one for shape

-----------

# Vertex shaders

The vertex shader aims to position the vertices of a geometry
We send it the positions and transformations + the camera info and then it starts cooking
it takes attributes, data that changes between vertices
uniforms, data that doesn't change between vertices, basically params
the data of the vertex shader is applied to every vertex
the vertex shader runs first

------------

# Fragment shaders

The fragment shader colors the fragments of the geometry
It's used for every visible vertex (lesson says fragment but i think that's a mistake) of a geometry
we can send it uniforms too
we can also send varyings, which is data that comes from the vertex shader

-------

# Why write our own shaders

- Performance
- Post process
- More control and creativity

-------

# Creating our own shaders

we use a RawShaderMaterial that takes a string for a vertexShader and a fragmentShader
copy some code we don't understand yet and boom we got a working shader
the material still has some common properties like wireframe

glsl is kinda like C it needs ; everywhere
it has multiple types
floats, ints
which can't be mixed together, they can be cast though
booleans (bool)
vec2

vec2 zozo = vec2(12.0, 22.0);
can be multiplied
can be accessed with .x and .y

vec3 toto = vec3(0.0)
can be accessed with .x .y .z or rgb

vec4 same but
rgba or xyzw

# Docs

https://shaderific.com/glsl.html
https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/indexflat.php

https://thebookofshaders.com/ deals more with fragment shaders but great ressource to learn

# Manipulating

## Clip space and why is gl_Position a vec4

A clip space is a space that goes in all 3 directions x,y,z from -1 to +1
anything outside of that range disappears, fourth value is responsible for the perspective

every vertices gets an attribute for it's position x,y,z
the attribute is a changing parameter

the code has three matrices that are the same for every vertice so we use uniforms

- modelMatrix: mesh transformations, scale, rotate, move etc, applied to position
- viewMatrix: camera transformations, rotate camera right = matrices on the left
  approach camera = zoom matrices, rotate up = matrices down
- projectionMatrix: transform coordinates into clip space coordinates

https://learnopengl.com/Getting-started/Coordinate-Systems

good read about matrices and coordinates

to apply a matrice we just multiply it

## Memo

I struggled before to understand which shader does wat but it's obvious from the name
vertex for vertices
fragment for color

# Fragment shader

we can precise the float precision
- highp impacts performance and doesn't work everywhere
- mediump is the ordinary use
-lowp can create bugs with the lack of precision

we can create attributes by using setAttributes on the geometry

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

second param is how many values compose one attribute

right now it's 1 cause we just give 1 random value to each vertex
if we were to give a position (x,y,z) it would have been 3
and the randoms array would have been count * 3 at init

if we want to send data from the vertex to the fragment
we declare a varying inside the vertex

varying float vRandom;

update it, and then redeclare it in the fragment and just use it, straightforward

values between vertices are interpolated with varying which might explain
why it's making a beautiful gradient of color

# Uniforms

Used to send js data to the shader
It doesn't vary between vertex and fragments
Threejs creates some default uniforms but we can create more on the material

uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) }
}

we can even send the clock elapsed time to animate it
we have to be careful to not send values too big or too low too

to apply a texture we can put it as a uniform
we also need the uv coordinates to use it
plane geometry already gives them to us as attributes

that's it for the shaders
i wanna practice a bit more so i'll create multiple shaders for this lesson
it was cool i feel like i'm grasping the subject way more than before

more ressources

The Book of Shaders: https://thebookofshaders.com/
ShaderToy: https://www.shadertoy.com/
The Art of Code Youtube Channel: https://www.youtube.com/channel/UCcAlTqd9zID6aNX3TzwxJXg