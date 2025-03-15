# 04 - Transform objects

*fancy stuff*

## The 4 properties to transform

- postition (move the object)
- scale (resize the object)
- rotation (rotate the object)
- quaternion (rotation for smart people)

```
All classes that inherit from the Object3D class possess those properties like PerspectiveCamera or Mesh and classes that we haven't covered yet.

You can see from what classes inherit each class on top of the Three.js documentation.

Those properties will be compiled in what we call matrices. Matrices are used internally by Three.js, by the WebGL, and by the GPU to transform things. Fortunately, you don't have to handle matrices by yourself and you can just modify the previously-mentioned properties.
```

*thank god I don't have to*

## Position breakdown

x, y, z the three axis
direction can change and is arbitrary

**in threejs y goes up**
**z goes backwards**
**x goes to the right**

the meaning of a unit is ut to the user, 1 can be anything

```
As for the meaning of 1 unit, it's up to you. 1 can be 1 centimeter, 1 meter, or even 1 kilometer. I recommend that you adapt the unit to what you want to build. If you're going to create a house, you probably should think of 1 unit as 1 meter.
```

position is a Vector3 so you have a lot of cool functions you can use
`.length()` -> length of a vector
`.distanceTo(vec)` -> distance to another vector
`.normalize()` -> distance to another vector ```You can normalize its values (meaning that you will reduce the length of the vector to 1 unit but preserve its direction)```
you can also use .set to change the values 
`mesh.position.set(0.7, - 0.6, 1)`

## Axes helper

*Useful thing but there's even better (foreshadowing)*

```
/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

## Scaling breakdown

scale is also a Vector3
1 scale = base size
0,5 = half the size
2 = ? (big brain needed)

## Rotation breakdown

2 ways of doing this, easy way using roation or smart way using quaternion

rotation as a x,y,z but its an Euler no a Vector3
```
When you change the x, y, and z properties of a Euler, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick.
```

reminder 1 PI is only a half rotation (i failed twice)

*that's actually a great visualisation I love this*

```
If you spin on the y axis, you can picture it like a carousel.
If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.
```

*this is neat*

```
The value of these axes is expressed in radians. If you want to achieve half a rotation, you'll have to write something like 3.14159... You probably recognize that number as π. In native JavaScript, you can end up with an approximation of π using Math.PI.
```

```
 The rotation applies in the following order: x, y, and then z. That can result in weird behaviors like one named gimbal lock when one axis has no more effect, all because of the previous ones.

We can change this order by using the reorder(...) method object.rotation.reorder('YXZ')

While Euler is easier to understand, this order problem can cause issues. And this is why most engines and 3D softwares use another solution named Quaternion.
```

*well i'm pretty sure I had no idea about this*

```
...keep in mind that the quaternion updates when you change the rotation. This means that you can use any one of the two as you please.
```

*good to know*

# Look at

`Object3D.lookAt(Vector3)`

