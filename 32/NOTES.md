# 32 - Coffee smoke

This one is definetely new and is part of why i'm remaking this course, i'm excited and already see lots of places where to use this !

bruno baked the base scene in blender that's probably why it looks so realistic, i remeber that's what we do for the portal scene

in this lesson we'll actually use a perlin noise texture instead of a function, the functions are gpu heavy especially on lower end devices, the textures are less convenient but much more effecient

there are several ressources to get a perlin texture

- http://kitfox.com/projects/perlinNoiseMaker/
- https://opengameart.org/content/noise-texture-pack
- https://mebiusbox.github.io/contents/EffectTextureMaker/
- https://www.figma.com/community/plugin/1138854718618193875/noise-texture

We can also use the perlin once at the beginning and then save it in a texture using WebGLRenderTarget

`
While choosing a noise texture, keep in mind the following 3 rules:

    Enough variations so that we don’t see the pattern repeating too much.
    Big enough so that it’s precise enough. Yet, you don’t need a huge resolution since the pixels are going to be interpolated.
    A repeating pattern (or “tilling”) so that we can put the image side by side with itself and not see the separation.

Also note that we are only going to use the red channel of the picture. A nice trick would be to save different noises in the 4 different channels in order to get multiple noises while loading only one image. Yet, for the sake of learning and simplification, we are going to use a simple grayscale picture.
`

for the geometry of the smoke we can use e plane with subdivisions, we move and scale the geometry directly to make the vertex calculations more convenient

we create basic vertex and fragment shaders
for the fragment shader we use the following includes
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
first one allows us to handle toneMapping
second ones allows us to comply with the renderer color space setting

----------------

for the fragment shader we load the perlin texture with the textureLoader first
give it as a uniform and then get it

uniform sampler2D uPerlinTexture;

we access the texture using the uvs given as a varying from the vertex shader, we only take the red channel since it's a grayscale image anyways

we can then assign the smoke float to the alpha channel 

to animate we use the time as an uniform, we multiply the copied uv x and y by small values and also subtract the time

  smokeUv.x *= .5;
  smokeUv.y *= .3 ;
  smokeUv.y -= uTime * .03;

but we need to make the texture repeat otherwise some long lines appear

------------------

we can remap the value with a smoothstep

basically make every value below 0.4 become 0 and restrict the max to 1.0
We apply the step on the uvs directly cause they haven't been modified, the logic pretty much makes sense and we multiply all the steps to combine them

  // Fade left edge
  smoke *= smoothstep(0., .1, vUv.x);
  
  // Fade right edge
  smoke *= smoothstep(1., .9, vUv.x);

  // Fade the bottom
  smoke *= smoothstep(.0, .1, vUv.y);

  // Fade the top
  smoke *= smoothstep(1., .4, vUv.y);

-------------------

we can then animate the vertices cause right now if we rotate the camery it's easy to see that it's a plane

from what i can read it's pretty much the same animation as the previous lesson
we want to twist the vertices around the center of the plane and change the rotation based on the elevation

we pick a pixel on the perlin texture just like before except we only pick on a straight line going up

  float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y)).r;

we then use this value as an angle to rotate the position

we add wind using the same logic, we just pick a different line using .25 or rather a different column

we also apply the wind on the z axis by repeating the same formula with another texture column

  // Wind
  vec2 windOffset = vec2(
      texture(uPerlinTexture, vec2(0.25, uTime * .01)).r - .5,
      texture(uPerlinTexture, vec2(0.85, uTime * .01)).r - .5
  );

it's pretty much done, bruno gives a few ideas to improve the experience

- Add tweaks to the fragment pattern
- Add tweaks to the vertex animation
- Add a tweak to the color
- Use your own model for the scenery
- Add floating marshmallows
- Make the wind move with the cursor

i kinda wanna do all of them but i'm feeling a bit lazy for now lol, i might comeback to this later