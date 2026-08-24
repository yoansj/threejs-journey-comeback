varying vec2 vUv;

void main()
{
    float x = abs(vUv.x - 0.5);
    float y = abs(vUv.y - 0.5);
    float strength = min(x, y);

    // Repeating pyramid
    // float x = abs(vUv.x - 0.5);
    // float y = abs(vUv.y - 0.5);
    // float strength = mod(x + y, .3);
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}