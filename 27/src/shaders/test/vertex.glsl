// Same value for every vertex so uniform
uniform mat4 projectionMatrix; // transform coordinates into clip space coordinates
uniform mat4 viewMatrix; // camera transformations, rotate camera right = matrices on the left approach camera = zoom matrices, rotate up = matrices down
uniform mat4 modelMatrix; // mesh transformations, scale, rotate, move etc, applied to position

// Get vertex position
// This is applied to every vertices
// It changes between vertices, it contains x,y,z pos for a vertex
attribute vec3 position;

float foo = 0.2;
vec2 toto = vec2(1, 5);

float method() {
    return 1.0;
}

// Gets called automatically no return
void main()
{
    // Position of the vertex on the screen
    // Short basic version
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // More explicit version
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.x * 10.) * .1;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Shorter version
    // modelViewMatrix = viewMatrix * modelMatrix
    // Less control
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // if (position.x >= .2) {
    //     // Here we moved the projection not the actual threejs position
    //     gl_Position.xy += .5;
    // }
}