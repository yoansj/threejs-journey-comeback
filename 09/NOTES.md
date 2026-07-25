# 09 - Debug UI

I was recently thinking about this lesson, most of the lib mentionned are kinda outdated for most
and with the rise of AI i'm pretty sure I can draft my own quick reusable debug ui lib, might be worth it
i'll look into that

```
While you can create your own debug UI using HTML / CSS / JS, there are already multiple libraries:
```
god dammit ! he read my mind

he actually mentions a few of them I didn't know which look neat:
- https://github.com/lo-th/uil
- https://github.com/wearekuva/oui (outdated)

tbh i never really liked lil.gui i'm more of a Tweakpane chad and it's still pretty much maintained
guify is simmilar but not Tweakpane feels the best overall

https://tweakpane.github.io/docs/
I should use it more often even for non three js projects

```
By doing that, we get a handy range input that we can drag and drop.

If you don’t like to have that many parameters, you can use the methods min(...), max(...), and step(...) by chaining directly after the add(...) method:

gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01)
```

lil-gui calls can be chained nice

```
One important thing to note here is that lil-gui can only modify properties. If you want to update a variable, you can’t:

let myVariable = 1337
gui.add(myVariable, '???')

But you can use some tricks to do so, such as creating an object whose purpose is to hold properties for lil-gui to be used on the object:

const myObject = {
    myVariable: 1337
}
gui.add(myObject, 'myVariable')
```

probably because it uses proxies underneath so it makes sense

```
lil-gui will automatically detect what kind of property you want to tweak and use the corresponding interface. A good example is the visible property of Object3D. It is a boolean that, if false, will hide the object:
```

neat but colors need addColor though

```
Building a geometry can be a rather lengthy process for the CPU. Right now, we are listening to the change event which can be triggered a lot if the user drags and drops the range tweak too much.

Instead of using onChange, we are going to use onFinishChange, which will only be triggered when we stop tweaking the value:
```

that's important

i skipped the rest of the lesson tbh

next up textures but that's probably for another day