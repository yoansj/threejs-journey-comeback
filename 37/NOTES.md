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

we use distance to make points just like the shader lessons, we then use a step to prevent the point from being diffused
we invert the step to invert the colors

    float point = distance(uv, vec2(0.5));
    point = 1. - step(.5 * .3, point);
in this formula .3 allows us to control the radius

then we can work on the intensity

```
We are going to decide on a direction for the halftone. If the faces are orientated toward that direction, we want a high value. If they are in the opposite direction, we want a low value.
```

the direction is just a vec3 with y going down
the intensity is a dot product of the normal we already have and the direction

```
    float intensity = dot(normal, direction);
```

we smooth out the intensity using parameters to control it

```
    float low = - .8;
    float high = 1.5;

    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);
```

we can then multiply the step by the intensity 

```
    point = 1. - step(.5 * intensity, point);

    gl_FragColor = vec4(point, point, point, 1.0);
```

this give us black and white dots, now we need to combine the color, a simple mix does the trick

```
    color = mix(color, pointColor, point);
```

we're gonna move the halftone into a function next in order to reuse it
once moved we can just call it with the same parameters

```
    // Halftone
    color = halftone(
        color,                 // Input color
        50.0,                  // Repetitions
        vec3(0.0, - 1.0, 0.0), // Direction
        - 0.8,                 // Low
        1.5,                   // High
        vec3(1.0, 0.0, 0.0),   // Point color
        normal                 // Normal
    );
```

the rest of the lesson is pretty much just adding uniforms and gui values
i absolutely love this effect and i wanna work on it again in the near future i felt like i could vary the effect, like not having decreasing etc

```
As always, feel free to go further.

Here are suggestions:

    Add more tweaks, like for the halftone direction, low, and end (don’t forget that the direction length must be 1).
    Refactor the halftone function. It can be written in a much shorter way.
    Add a gradient to the halftone instead of the uniform color.
    Add an alpha parameter to the halftone in order to fade it in the color.
    Try to draw different shapes than a disc.
```