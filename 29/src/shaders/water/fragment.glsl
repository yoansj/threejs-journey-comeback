uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uFoamThreshold;
uniform float uFoamSoftness;
uniform vec3 uFoamColor;

varying float vElevation;

void main()
{
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    // doesn't work cause elevartion is small
    float foam = smoothstep(uFoamThreshold, uFoamThreshold + uFoamSoftness, vElevation * 10.);
    color = mix(color, uFoamColor, foam);

    gl_FragColor = vec4(color, 1.0);
    
    #include <colorspace_fragment>
}