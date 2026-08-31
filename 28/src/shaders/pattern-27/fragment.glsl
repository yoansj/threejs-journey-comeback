varying vec2 vUv;

void main()
{
    float strength = length(vUv - .5);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}