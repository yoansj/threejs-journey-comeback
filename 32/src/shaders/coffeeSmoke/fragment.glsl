uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv;

void main()
{

  // Scale and animate
  vec2 smokeUv = vUv;

  smokeUv.x *= .5;
  smokeUv.y *= .3 ;
  smokeUv.y -= uTime * .03;

  float smoke = texture(uPerlinTexture, smokeUv).r;

  // Remap
  smoke = smoothstep(0.4, 1.0, smoke);

  // Edges

  // Fade left edge
  smoke *= smoothstep(0., .1, vUv.x);

  // Fade right edge
  smoke *= smoothstep(1., .9, vUv.x);

  // Fade the bottom
  smoke *= smoothstep(.0, .1, vUv.y);

  // Fade the top
  smoke *= smoothstep(1., .4, vUv.y);

  // Final color
  gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
  // gl_FragColor = vec4(1, 0., 0., 1.);

  // Includes
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}