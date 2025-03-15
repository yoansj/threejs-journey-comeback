# 05 - Animations

*Finally stuff will move*

```
Animations, when using Three.js, work like stop motion. You move the objects, and you do a render. Then you move the objects a little more, and you do another render. Etc. The more you move the objects between renders, the faster they'll appear to move.

The screen you are looking at runs at a specific frequency. We call that a frame rate. The frame rate mostly depends on the screen, but the computer itself has limitations. Most screens run at 60 frames per second. If you do the maths, that means about a frame every 16ms. But some screens can run much faster, and when the computer has difficulties processing things, it'll run more slowly.

We want to execute a function that will move objects and do the render on each frame regardless of the frame rate.

The native JavaScript way of doing so is by using the window.requestAnimationFrame(...) method.
```

*this seems familiar*

```
The primary purpose of requestAnimationFrame is not to run code on each frame.

requestAnimationFrame will execute the function you provide on the next frame. But then, if this function also uses
```

*recursivity a blessing and a nightmare*

# Time based animations with a delta time

So that all computers run the animation at the same speed

```
/**
 * Animate
 */
let time = Date.now()

const tick = () =>
{
		// Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.y += 0.01 * deltaTime

    // ...
}
```

# The better solution using Clock

the Clock class returns how many seconds have passed since it's creation 
when getElapsedTime is used

# Animate with gsap

or other librairies

`gsap.to(mesh.position, { duration: 1, delay: 1, x: 2, repeat: -1 })`