uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;


vec3 ambientLight(vec3 lightColor, float lightIntensity)
{
    return lightColor * lightIntensity;
}

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);
    
    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0., specular);
    specular = pow(specular, specularPower);

    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    return lightColor * lightIntensity * (shading + specular);
}

vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{
    vec3 lightDelta = lightPosition - position;
    vec3 lightDirection = normalize(lightDelta);
    float lightDistance = length(lightDelta);
    vec3 lightReflection = reflect(- lightDirection, normal);
    
    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0., specular);
    specular = pow(specular, specularPower);

    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0., decay);

    return lightColor * lightIntensity * decay * (shading + specular);
}


void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 color = uColor;
    vec3 normal = normalize(vNormal);

    // Lights
    vec3 light = vec3(0.0);

    light += ambientLight(
        vec3(1.0),
        0.03
    );

    light += directionalLight(
        vec3(0.1, 0.1, 1.0),
        1.,
        normal,
        vec3(0., 0., 3.),
        viewDirection,
        20.
    );

    light += pointLight(
        vec3(1.0, 0.1, 0.1),
        1.,
        normal,
        vec3(0.0, 2.5, 0.0),
        viewDirection,
        20.,
        vPosition,
        .25
    );


    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}