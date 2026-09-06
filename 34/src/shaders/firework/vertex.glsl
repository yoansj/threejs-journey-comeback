uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute float aSize;
attribute float aTimeMultiplier;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main()
{
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Exploding
    // Remap progress value between 0.0 to 0.1 as 0.0 and 1.0
    float explodingProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    // Clamp so it doesn't get bigger than 1.
    explodingProgress = clamp(explodingProgress, 0., 1.);
    // Power to make the animation really fast at the beginning
    explodingProgress = 1. - pow(1. - explodingProgress, 3.0);
    newPosition = mix(vec3(.0), newPosition, explodingProgress);

    // Falling
    float fallingProgress = remap(progress, 0.1, 1.0, 0., 1.);
    fallingProgress = clamp(fallingProgress, .0, 1.);
    fallingProgress = 1. - pow(1. - fallingProgress, 3.);
    newPosition.y -= fallingProgress * .2;

    // Scale in
    float sizeOpeningProgress = remap(progress, 0., .125, 0., 1.);
    float sizeClosingProgress = remap(progress, 0.125, 1., 1., 0.);
    float sizeProgress = min(sizeOpeningProgress, sizeClosingProgress);
    sizeProgress = clamp(sizeProgress, .0, 1.);

    // Twinkling
    float twinklingProgress = remap(progress, 0.2, 0.8, 0.0, 1.0);
    twinklingProgress = clamp(twinklingProgress, 0.0, 1.0);
    float sizeTwinkling = sin(progress * 30.) * .5 + .5;
    sizeTwinkling = 1.0 - sizeTwinkling * twinklingProgress;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);


    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1.0 / - viewPosition.z;

    // Windows fix for the particles not disappearing
    // We just move them away lol
    if(gl_PointSize < 1.0)
        gl_Position = vec4(9999.9);
}