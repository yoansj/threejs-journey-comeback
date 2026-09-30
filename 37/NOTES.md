# 37 - Halftones

Love this effect

We'll do it kinda like into the spider verse
we apply some lighting first and then we do the shading

so we first apply a ambientLight to globally light up the test and then we apply a directionalLight

the shading is applied kinda like a fixed div, any transformation doesn't affect the shading as i understand it

the gl_FragCoord is a vec4 where xy are the "screen" coordinates and zw are used for depth

the screen coordinates are based on the screen size so we need to give the resolution to the shader to normalize values so they go from 0.0 to 1.0

i'd guess we do something like uv.x / resolution.x

i wasn't far, actual line is 
    vec2 uv = gl_FragCoord.xy / uResolution;

the uvs aren't a grid right now, to make them a grid we can multiply them by a high value then use a modulo with 1.0

the grid is already looking pretty neat like that it could be worked on for another effect