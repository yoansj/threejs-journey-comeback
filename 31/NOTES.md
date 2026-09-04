# 31 - Modified materials

I don't exactly remember doing this, the lesson was already checked though

So to modify materials we have two options which in my opinion are both sketchy:
- We can use a hook before a shader is compiled to inject shader code
- We can recreate a material by looking at the source code and then extend it

For this lesson we will use the first technique, i think TSL the new shading language actually solves this and allows us to easily edit the pre made materials but that's a future concern

`
In this lesson, we will make the model vertices twist in a funny way but with all the base features of the material still working like shadows, texture, normal map, etc.
`

The setup is the same as the realistic model render except we use this odd looking model that kinda looks like bruno lol
We use MeshStandardMaterial so we have access to lights shadows etc

------------

we can use onBeforeCompile on the material to get access to the shaders, uniforms and much more

the vertex shader is a bunch of includes, we can see what each one does by going into the source code in the ShaderChunk directory

`
it seems that begin_vertex is handling the position first by creating a variable named transformed.
`

we can use the replace function since the shaders are strings to replace the begin_vertex include by whatever we want and then include our code

to do the twist animation we'll use a matrice to transform the coordinates of our vertices, we do a 2d transformation since we just rotate the vertices on x and z

we use a function for that get2dRotateMatrix, the thing is we can't just place it after our begin_vertex replace since we're already in the main function

for that we can just add another replace targetting the common import which is outside of the main function and always present

we make the angle vary based on the elevation to accentuate the twist the more up it gets
            float angle = position.y * .9;
feed the angle to the function that generates a matrix
            mat2 rotateMatrix = get2dRotateMatrix(angle);
apply the matrix by multiplying our matrix
            transformed.xz = rotateMatrix * transformed.xz;

-------------

to animate we use a uTime uniform just like before, we have access to uniforms in the onBeforeCompile so we can just add it

the thing is this is not a shader material so we cannot access the uniforms
we can create a custom uniforms object and make the shader uniroms point to our custom uniforms in the onBeforeCompile

    shader.uniforms.uTime = customUniforms.uTime

----------

to fix the shadows we actually need to override the defualt material used for them which is the depthMaterial
we can update the loaded mesh for that

        mesh.customDepthMaterial = depthMaterial

then we apply the same onBeforeCompile logic but on the depth material to make the shadow rotate too

there's still a weird shadow on the model still because of the normals
basically we rotated the positions of our vertices but we didn't rotate the normals

we need to target and replace the beginnormal_vertex part, move our declarations in that part since it happens before begin_vertex, rotating the normals is pretty much the same, the normals is just objectNormal

----------

it's the end of the lesson but i wanna try the disturbing formula lol

i ended up adding the mouse movement and it's pretty funny lol