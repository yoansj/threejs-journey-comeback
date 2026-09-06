uniform sampler2D uTexture;
uniform vec3 uColor;

void main()
{
    float texture = texture(uTexture, gl_PointCoord).r;
    // Final color
    gl_FragColor = vec4(uColor, texture);

    // Includes
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}