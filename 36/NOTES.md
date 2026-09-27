# 36 - Raging sea shading

This lesson is a continuation of the Raging Sea lesson, bruno told us to add reflections which i did byt they were pretty cheap, he shows the final result and it kinda looks
like yuji's inner domain when he meets sukuna the first time, very cool

first step is just to tweak the parameters of the initial shader
we rename the cnoise function as perlinClassic3D

`cnoise stands for classic noise which is correct, but not accurate enough.`

we improve the gradient using a smoothstep and then add the lights from the previous lesson into the includes (unlike what i did lol)

----------

directionnal light

we need the normal first with the model transformation applied to avoid the light moving

next up we need the view direction which is just the position of the vertex minus the camera position

when we add our directionnal light nothing fancy happens and using our normal with the color shows that our normal all points upwards ignoring the actual shape of the plane

basically the normals from our attributes aren't affected by the transformations we do in the shaders so we need to compute the orientation ourselves

i think i get the theory behind it although i couldn't remake it

----------

this lesson was really interesting and taught me a lot of new stuff i wann fiddle withn definetely one of the lessons i need and want to get back to

```
 Going further

As always, feel free to improve on the lesson.

Here are some suggestions:

    Test different colors
    Tweak the shift
    Improve the way we handle the color gradient
    Put some objects floating on the surface of the sea (you’ll have to calculate the wave in JS)
    Make the depth of the waves more emissive
    Add more lights
    Animate the lights
```

i added some kind of sin to the shift to see it changing in real time it's trippy, i will add more later on