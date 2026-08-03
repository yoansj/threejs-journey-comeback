import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Pane } from "tweakpane"
import gsap from 'gsap'

/**
 * Base unit for this project
 */
const BASE_UNIT = 1
const u = (n) => n * BASE_UNIT

/**
 * Base
 */
// Debug
const gui = new Pane({ title: 'Haunted house debug menu' })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Helpers
 */
const debugFolder = gui.addFolder({ title: 'Helpers'})
const gridHelper = new THREE.GridHelper(50, 50)
gridHelper.visible = false

const axesHelper = new THREE.AxesHelper(5)
axesHelper.visible = false


scene.add(gridHelper, axesHelper)
debugFolder.addBinding(gridHelper, 'visible', {label: 'Grid Helper'})
debugFolder.addBinding(axesHelper, 'visible', { label: 'Axes Helper'})

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/brown_mud_leaves_01_1k/brown_mud_leaves_01_disp_1k.jpg')

// more accurate colors
floorColorTexture.colorSpace = THREE.SRGBColorSpace

// set how many times we repeat the texture for a given size
// the higher value the smaller the pattern
floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

// set horizontal wrap
floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

// set vertical wrap
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(u(30), u(30), 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementScale: 0.3,
        displacementBias: - 0.1
    })
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

gui.addBinding(floor.material, 'displacementScale')
gui.addBinding(floor.material, 'displacementBias')

// House container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(u(4), u(2.5), u(4)),
    new THREE.MeshStandardMaterial()
)
walls.position.y += u(1.25)
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(u(3.5), u(1.5), u(4)),
    new THREE.MeshStandardMaterial()
)
roof.position.y += u(2.5 + 0.75)
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(u(2.2), u(2.2)),
    new THREE.MeshStandardMaterial({ color: 'red' })
)
door.position.y = u(1)
door.position.z = u(2 + 0.01)
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 100; i++)
{
    // Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Coordinates
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 8
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius


    grave.position.x = x
    grave.position.y = -1
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    gsap.to(grave.position, { y: Math.random() * 0.4, delay: 0.01, duration: 2 })
    gsap.to(grave.rotation, {
        y: (Math.random() - 0.5) * 0.4,
        x: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
        delay: 0.1,
        duration: 2
    })

    // Add to the graves group
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()