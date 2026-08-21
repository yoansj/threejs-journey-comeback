
uniform float uTime;

// Random pos attribute
attribute float aRandom;

// Given to the fragment
varying float vRandom;

void main()
{

    // float elevation = sin(aRandom * uFrequency.x - uTime) * 0.1; // Flag anim
    // elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    // modelPosition.z += elevation;

    // More explicit version
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z = sin(aRandom * uTime) * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;


    gl_Position = projectedPosition;

    vRandom = aRandom;
}