varying vec2 vUv;

// The Book of Shaders: https://thebookofshaders.com/10/
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = vec2(floor(vUv.x * 10.) / 10., floor((vUv.y + vUv.x * .5) * 10.) / 10.);
    float strength = random(uv);
    gl_FragColor = vec4(strength, strength, strength, 1.0);
}