uniform float uTime;
uniform float uAnimationSpeed;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
  // Stripes
  float stripes = mod((vPosition.y - uTime * uAnimationSpeed) * 20., 1.);
  stripes = pow(stripes, 3.);

  // Final color
  gl_FragColor = vec4(vNormal, stripes);

  // Includes
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}