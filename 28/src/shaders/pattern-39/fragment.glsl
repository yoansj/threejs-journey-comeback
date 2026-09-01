varying vec2 vUv;

void main()
{
    vec2 wavedUv = vec2(
        vUv.x + cos(vUv.y * 100.) * .1,
        vUv.y + cos(vUv.x * 100.) * .1
    );

    float strength = 1. - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}