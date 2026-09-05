uniform bool uModelPos;

varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
  // Position
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Final position
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  // Varyings
  if (uModelPos) {
    vPosition = modelPosition.xyz;
  } else {
    // I prefer the top way
    vPosition = position.xyz;
  }

  vNormal = normal;
}