import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Helpers
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.z = -10
mesh.position.x = 3
mesh.position.y = 2

mesh.scale.z = 5
mesh.scale.x = 18
mesh.scale.y = 2

mesh.rotation.x = Math.PI * 2
// mesh.rotation.y = Math.PI * 0.25

scene.add(mesh)

// Group
const meshTwo = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0080 })
)
meshTwo.position.x = -3

const meshThree = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xaf19d0 })
)
meshThree.position.x = 3

const group = new THREE.Group()
group.add(meshTwo, meshThree)
group.position.y = -1
group.scale.set(0.5, 0.5, 0.5)

scene.add(group)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)