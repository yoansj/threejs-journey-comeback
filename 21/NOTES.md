# 21 - Imported models

Well i pretty much already know how it works but let's gooo

there's a bunch of formats we can use but cool kids only use gltf, iirc we got animations, materials, model data etc
> bruno said have data like cameras, lights, scene graph, animations, skeletons, morphing and even multiple scene.
so i wasn't that far

we can also use other formats like OBJ, FBX, STL, or PLY

there are multiple gltf formats such as:
- glTF
- glTF-Binary
- glTF-Draco
- glTF-Embedded

classic gltf is basically a json
it contains references to other files that need to be located at the same place

gltf binary (glb)
is the same contained into a single file, not readable in the editor

gltf draco
just like the default gltf but heavily compressed

gltf embedded is just like glb cause it's one file but it's a json

------

to choose it depends on the case
if we want to edit texture or coordinates of lights: gltf default
if we want only one file: gltf binary

to load a gltf we can use the GLTFLoader in the examples
a model always contains a scene that can be explored and inspected

when we don't load the whole scene and only take some children
we need to clone the childre array for the model scene
and then iterate through all the children and add them to the scene
a simpler solution is just to add the whole scene though

to import draco compressed models we need a special loader
the loader needs a decoder located at
/node_modules/three/examples/jsm/libs/draco
for this lesson we can take the whole folder and put it in /static/

draco compression isn't always needed and generates a noticeable freeze when it loads

-------

to handle animations we need an AnimationMixer instance basically an animaiton player tied to an object

there's also a threejs editor to visualize models https://threejs.org/editor/
doesn't have has many features but can be useful