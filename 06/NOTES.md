# 06 - Cameras

We created a `PerspectiveCamera` before, but there are other types of camera

`Camera` is an abstract class, all cameras inherit from it

`ArrayCamera` renders the scene multiple times with multiple cameras kinda like multiplayer split screen
`StereoCamera` renders using two cameras, used for vr stuff
`CubeCamera` renders every direction of a cube, can be used to creare env maps
`OrthographicCamera` renders without perspective like a RTS or CrossyRoads I think ?
`PerspectiveCamera` mimicks a real-life camera with perspective

# PerspectiveCamera

Last time we didn't use all the params, we used fov and aspect ratio but we can add the near and far
`const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)`

## FOV

Small angle = long scope effect
Large angle = fish eye effect
Bruno usally puts it between 45 and 75
*i love high fov so i'll probably put it higher than this*

## Aspect ratio

Usually width / height but can vary in some cases

## Near and far

Near = Any object closer than the near value won't show up
Far = Any object further than the far value won't show up
Be careful about small values it can cause z-fighting 
litterally: https://x.com/Snapman_I_Am/status/800567120765616128

# OrthographicCamera

```
Instead of a field of view, you must provide how far the camera can see in each direction (left, right, top and bottom). Then you can provide the near and far values just like we did for the PerspectiveCamera.
```

we need to use the aspect ratio for the values of the camera otherwise it won't look good

# Custom controls

*finally*

Use some native js to handle mouse movement and move the camera

```
window.addEventListener('mousemove', (event) => {
    console.log(event.clientX, event.clientY)
})
```

then adjust the values to make them easier to work with
` cursor.x = event.clientX / sizes.width - 0.5`

don't forget to adjust the y because it's reversed, y goes upwards in threejs but it goes downwards in the dom

using lookAt during the tick produces a cool effect

we can do even more using sin and cos
`camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 4`

combinaison of all this makes some interesting showcase camera movement

# Built-in controls

threejs has a lot of built-in controls https://threejs.org/docs/index.html?q=controls#examples/en/controls/TransformControls

## OrbitControls

Not part of the THREE object, needs to be imported from the node.js modules
`import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'`
`const controls = new OrbitControls(camera, canvas)`

easier than writing your own controls right ?

### Target

.target is a Vector3 that can be edited, controls need to be updated in the loop though

### Damping

Smoothes out the movement when moving the camera

