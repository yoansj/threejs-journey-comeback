uniform float uTime;
uniform float uAnimationSpeed;

uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{

  // Fresnel
  vec3 normal = normalize(vNormal);
  if(!gl_FrontFacing) normal *= - 1.0;

  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) + 1.;
  fresnel = pow(fresnel, 2.);

  // Stripes
  float stripes = mod((vPosition.y - uTime * uAnimationSpeed) * 20., 1.);
  stripes = pow(stripes, 3.);

  // Falloff
  float falloff = smoothstep(.8, 0.0, fresnel);

  float holographic = stripes * fresnel;
  holographic += fresnel * 1.25;
  holographic *= falloff;

  // Final color
  gl_FragColor = vec4(uColor, holographic);

  // Includes
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}