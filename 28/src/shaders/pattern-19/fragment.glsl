varying vec2 vUv;

void main()
{
    float x = abs(vUv.x - 0.5);
    float y = abs(vUv.y - 0.5);
    float strength = step(0.2, max(x, y));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}