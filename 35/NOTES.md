# 35 - Lights Shading (wip)

So this lesson is essentially recreating shaders for light, tbh i'm not very interested and i can already smell the hard math involved but i'm doing all the lessons and bruno said it's nice to learn so here we go

`
Also, note that the implementation we are going to do is not physics-based. It’s more of an old-school and performant approach, quite similar to the Phong shading with minor tweaks.

Most of the calculations will be done in the fragment shader in order to avoid visual artifacts. Yet, it could be done easily in the vertex shader, which is actually what we call Gouraud shading.
`

well this might be simpler than what i anticipated

-------------------

we can start with the ambient light which sends an uniform light on the objects regardless of their orientation