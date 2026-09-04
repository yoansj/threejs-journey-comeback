uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main()
{

  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture(
    uPerlinTexture,
    // subtract otherway the smoke doesn't move in the right direction
    vec2(0.5, uv.y * .4 - uTime * .005)
  ).r;
  float angle = twistPerlin * 10.;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Wind
  vec2 windOffset = vec2(
      texture(uPerlinTexture, vec2(0.25, uTime * .01)).r - .5,
      texture(uPerlinTexture, vec2(0.75, uTime * .007)).r - .5
  );

  // multiply by uv.y because at the bottom uv is 0
  // it makes the base of the smoke stay in place
  // Use pow to make the wind exponentially stronger based on the uv y position
  windOffset *= pow(uv.y, 2.) * 10.;
  newPosition.xz += windOffset;

  // Final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  // Varyings
  vUv = uv;
}