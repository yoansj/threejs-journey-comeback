// precision mediump float;

// varying set in vertex shader
// varying float vRandom;

// Color uniform
uniform vec3 uColor;

uniform sampler2D uFlagTexture;

varying vec2 vUv;
varying float vElevation;

void main()
{
    // Same as gl_Position but for color
    // Last value is alpha, needs transparent on material to work
    // gl_FragColor = vec4(uColor, 1.);

    vec4 textureColor = texture2D(uFlagTexture, vUv);
    // vec3 color = vec3(0, 0, 1)
    textureColor.rgb *= vElevation * 2. + .5;
    gl_FragColor = textureColor;
}