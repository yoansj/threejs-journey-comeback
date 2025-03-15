# 02 - What is WebGL and why use Three.js

```
Three.js is a 3D JavaScript library that enables developers to create 3D experiences for the web. It works with WebGL, but you can make it work with SVG and CSS as well. Those two are quite limited, and we won't cover them in this course.
```

Kinda sad some of the links on the showcase section are dead or some still work but the projects are just dead https://threejs-journey.com/lessons/what-is-webgl-and-why-use-three-js#showcase
Zenly is a good example I think it was bought by snapchat ?

## What is WebGL

```
WebGL is a JavaScript API that renders triangles in a canvas at a remarkable speed. It's compatible with most modern browsers, and it's fast because it uses the Graphic Processing Unit (GPU) of the visitor.
WebGL can draw more than triangles and can also be used to create 2D experiences, but we will focus on 3D experiences using triangles for the course's sake.
```

I think knowing that it renders triangles helps for the shader lessons lol

```
The instructions to place the points and draw the pixels are written in what we call shaders. And let me tell you, shaders are hard to master. We also need to provide data to these shaders. For example: how to place the points according to the model transformations and the camera's properties. These are called matrices. We also need to provide data to help colorize the pixels. If there is a light and the triangle is facing that light, it should be brighter than if the triangle isn't.
```

foreshadowing, shaders are hard

```
And this is why native WebGL is so hard. Drawing a single triangle on the canvas would take at least 100 lines of code. Good luck if you want to add perspective, lights, models, and animate everything in that case.

But native WebGL benefits from existing at a low level, very close to the GPU. This enables excellent optimizations and more control.
```

dont test me I did assembly at school (i had no choice)

## Three.js to the rescue

```
Three.js is a JavaScript library under MIT license that works right above WebGL. The library's goal is to drastically simplify the process of handling all of what we just stated. You'll have an animated 3D scene in just a few code lines, and you won't have to provide shaders and matrices.

Because Three.js is right above WebGL, we can still interact with it in some ways. At some point, we will get to writing shaders and create matrices.
```

:yay_emoji: 

```
Ricardo Cabello, aka Mr.doob (Website, Twitter), is the developer who created Three.js. He is still working on it, but now he's helped by a large community. You can check the list of contributors here: https://github.com/mrdoob/three.js/graphs/contributors

Currently, the library gets an update every month and you can see what's changed in the releases page here: https://github.com/mrdoob/three.js/releases

You can discover many exceptional projects using Three.js on the website's homepage: https://threejs.org/
```

S/O Mr.doob you created a whole industry, I spent quite some time on the threejs homepage and the docs too, having one of my projects there would be quite something tbh

