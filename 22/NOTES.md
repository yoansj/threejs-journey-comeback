# 22 - Raycaster and Mouse Events

this should be a simple one since i already know the concept

a raycaster shoots a ray in a direction and notices us if we hit something
we can use it to detect clicks but also for a bunch of other stuff,
we could make some kind of hovercraft that shoots a ray continuously towards
the ground to check the distance and keep it up for example

when we intersect an object, the result is always an array cause the same ray can go through the same object multiple
times
also the ray direction vector needs to be normalized
we get a bunch of data that we can use however we want:
- distance (distance between ray origin and collision point)
- face (what face of the geometry was hit)
- faceIndex (index of that face)
- object (object that was hit)
- point (vector 3 of the hit position in 3d space)
- uv (coordinates of the geometry)

--------

cast a ray from the mouse position
for that we need normalized values that work with webgl, values that go from -1 to +1
vertical is positive when moving upwards
horizontal is negative when moving left

we can record the mouse position into a vector and then use
raycaster.setFromCamera(mouse, camera)

we can then test the intersections in a loop and get the result

we can do click events if we hold a variable for the currently hovered objects

-------

intersects works the same for imported models, it supports groups and recursively tests
by default

great lesson, next one is blender
i remember at this stage it was the portal scene but seems like it was moved much further later into the lesson
since there's a while chapter about shaders now this makes sense