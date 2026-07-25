import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.SphereGeometry(1, 32, 32)

// custom geometry
const geometry_ = new THREE.BufferGeometry()

const pos = new Float32Array([
    0, 0, 0, // first vertex
    0, 1, 0, // second vertex
    1, 0, 0 // third vertex
])

// convert before setting the geometry
// The first parameter corresponds to your typed array
// the second parameter corresponds to how much values make one vertex attribute.
// As we saw earlier, to read this array, we have to go 3 by 3 because a vertex position
// is composed of 3 values (x, y and z):
const posAttribute = new THREE.BufferAttribute(pos, 3)

// set the attribute
geometry_.setAttribute('position', posAttribute)

// random
const geom3 = new THREE.BufferGeometry()
const count = 50
const posRandom = new Float32Array(
    count *
    3 * // three values per vertex (x, y, z)
    3 // each triangle has 3 vertices
)

for (let i = 0; i < count * 3 * 3; i++) {
    posRandom[i] = (Math.random() - 0.5) * 4
}

const posAttrRan = new THREE.BufferAttribute(posRandom, 3)
const geometry_r = new THREE.BufferGeometry()
geometry_r.setAttribute('position', posAttrRan)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry_, material)
const mesh3 = new THREE.Mesh(geometry_r, material)

mesh.position.setX(3)
mesh3.position.setX(-3)


scene.add(mesh, mesh2, mesh3)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()