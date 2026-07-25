# 08 - Geometries

```
We use geometries to create meshes, but you can also use geometries to form particles. Each vertex (singular of vertices) will correspond to a particle, but this is for a future lesson.
```

I don't think i ever did particles

There are so many geometries I don't think it's useful to list them here, I might just check the docs when I need them

```
If you need a particular geometry that is not supported by Three.js, you can create your own geometry in JavaScript, or you can make it in a 3D software, export it and import it into your project. We will learn more about that later.
```

___blender foreshadowing__

```
The BoxGeometry has 6 parameters:

    width: The size on the x axis
    height: The size on the y axis
    depth: The size on the z axis
    widthSegments: How many subdivisions in the x axis
    heightSegments: How many subdivisions in the y axis
    depthSegments: How many subdivisions in the z axis

Subdivisions correspond to how much triangles should compose the face. By default it's 1, meaning that there will only be 2 triangles per face. If you set the subdivision to 2, you'll end up with 8 triangles per face:
```

ts helps we can just hover the constructor to figure out the params

```
A good solution is to add wireframe: true to our material. The wireframe will show the lines that delimit each triangle:
```

cheapest way to make an experiment feel like tron

```
As you can see, there are 8 triangles by face.

While this is not relevant for a flat face cube, it gets more interesting when using a SphereGeometry:

const geometry = new THREE.SphereGeometry(1, 32, 32)
```

is that the death star ?

you can almost make the sim logo using 1, 32, 1

1, 1, 32 creates a really odd shape on the other hand

```
The more subdivisions we add, the less we can distinguish the faces. But keep in mind that too many vertices and faces will affect performances.
```

we could probably tweak that depending on the user device too

```
Sometimes, we need to create our own geometries. If the geometry is very complex or with a precise shape, it's better to create it in a 3D software (and we will cover that in a future lesson), but if the geometry isn't too complex, we can build it ourself by using BufferGeometry.
```

it seems overly complicated but we'll do it for the sake of learning

```
Or you can pass an array:

const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])

As you can see, the coordinates of the vertices are specified linearly. The array is a one-dimensional array where you specify the x, y, and z of the first vertex, followed by the x, y, and z of the second vertex, and so on.
```

tedious

```
We chose 'position' as the name because Three.js internal shaders will look for that value to position the vertices. We will see more about that in the shaders lessons.

The faces will be automatically created following the order of the vertices.
```

human to shader communication

```
The only difficulty might be the count * 3 * 3 part but it's quite simple to explain: We need 50 triangles. Each triangle is composed of 3 vertices and each vertex is composed of 3 values (x, y, and z).
```

headache i'm getting old

was wondering wy it wasn't working but i hadn't wrote the loop lol