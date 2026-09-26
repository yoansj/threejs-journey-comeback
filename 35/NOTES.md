# 35 - Lights Shading (wip)

So this lesson is essentially recreating shaders for light, tbh i'm not very interested and i can already smell the hard math involved but i'm doing all the lessons and bruno said it's nice to learn so here we go

`
Also, note that the implementation we are going to do is not physics-based. It’s more of an old-school and performant approach, quite similar to the Phong shading with minor tweaks.

Most of the calculations will be done in the fragment shader in order to avoid visual artifacts. Yet, it could be done easily in the vertex shader, which is actually what we call Gouraud shading.
`

well this might be simpler than what i anticipated

-------------------

we can start with the ambient light which sends an uniform light on the objects regardless of their orientation

i feel a bit lazy to move the functions in the includes so i might do it later on

-----------------

directional light

it's almost the same but the intensity depends on the orientation of the face and the direction of the light
for the face orientation we get the normal from the vertex shader
for the light direction we can just normalize the light position we added as a param

we use the dot product to calculate our shading

```
If they are in opposite direction, we want 1
If they are at a 90° angle, we want 0
In between, we want the interpolated value
```

the light move although the light itself isn't moving because we haven't applied the model matrix to the normal so we need to do it in the vertex shader

----------------

mixing the two lights together makes an odd result
then dot product from the directional light actually returns negative values so we need to clamp it, at first i was thinking the solution was to use absolute but that's kinda different

----------------

next up specular, basically light reflection, we need to calculate how the light reflects and the more the reflection is aligned with the view, the more it shines if i understand correctly

so for that we need the model position, and the camera position which we already have as uniforms and pass them as varyings

for the view direction we substract destination from the origin while normalizing

```
    vec3 viewDirection = normalize(vPosition - cameraPosition);
```

once done we can use the built in reflect that calculates a reflection

```
We want the reflection of the light coming toward the surface, but the lightDirection is currently the exact opposite and corresponds to a vector going toward the light:
We can simply invert lightDirection
```

i haven't noted a bunch of steps that were pretty complicated i might comeback to this lesson once i understand a bit more

-------------------

pointLight

it's a light that originates from a position
it decays based on the distance

the light direction should be a vector going from the surface of the object towards the light, we give the position as a param in our light

it's pretty much the same as the directionalLight but with the decay, same as before i haven't written all the steps here and i need to comeback to this lesson later

```
As always, feel free to go further. Here are some suggestions:

    Animate the lights.
    Add more control over the specular.
    Support other types of lights like the hemisphere light.
    Control the lights using the debug panel.

And if you want to learn more about light shading, have a look at the OGLDEV channel and more specifically the following videos:

    https://www.youtube.com/watch?v=e-lnyzN2wrM&ab_channel=OGLDEV
    https://www.youtube.com/watch?v=dJo1Ao9XydM&t=740s&ab_channel=OGLDEV
    https://www.youtube.com/watch?v=ToCSRyXva5w&ab_channel=OGLDEV
    https://www.youtube.com/watch?v=MAJqiDll0a8&ab_channel=OGLDEV
```