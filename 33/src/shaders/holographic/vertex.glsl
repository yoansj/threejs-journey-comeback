uniform bool uModelPos;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;

float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 modelNormal = modelMatrix * vec4(normal, 0.);

  // Glitch effect
  float glitchTime = uTime - modelPosition.y;
  float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchStrength /= 3.;

  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
  glitchStrength *= .25;

  modelPosition.x += (random2D(modelPosition.xz + uTime) - .5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zx + uTime) - .5) * glitchStrength;

  // Final position
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  // Varyings
  if (uModelPos) {
    vPosition = modelPosition.xyz;
  } else {
    // I prefer the top way
    vPosition = position.xyz;
  }

  vNormal = modelNormal.xyz;
}