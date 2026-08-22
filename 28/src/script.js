import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


// Imports every shaders/pattern-*/{vertex,fragment}.glsl at build time
const patternFiles = import.meta.glob('./shaders/pattern-*/*.glsl', {
    eager: true,
    import: 'default'
})

/**
 * { 'pattern-1': { vertex: '...', fragment: '...' }, 'pattern-2': { ... } }
 * @type {Record<string, { vertex: string, fragment: string }>}
 */
const patternShaders = {}

for (const [path, source] of Object.entries(patternFiles)) {
    const [, name, stage] = path.match(/\.\/shaders\/([^/]+)\/([^/]+)\.glsl$/)

    patternShaders[name] ??= {}
    patternShaders[name][stage] = source
}

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let patterns = 0;
const meshes = [];

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

/**
 * 
 * @param {THREE.ShaderMaterialParameters} materialParams 
 * @param {number} index 
 */
function createPlaneForPattern(materialParams) {
    const material = new THREE.ShaderMaterial(materialParams)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    meshes.push(mesh)

    const COLUMNS = 5
    const SPACING = 1.25

    const column = patterns % COLUMNS
    const row = Math.floor(patterns / COLUMNS) 

    mesh.position.x = column * SPACING
    mesh.position.y = -row * SPACING 

    patterns += 1;
}


createPlaneForPattern({
    vertexShader: patternShaders['pattern-1'].vertex,
    fragmentShader: patternShaders['pattern-1'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-2'].vertex,
    fragmentShader: patternShaders['pattern-2'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-3'].vertex,
    fragmentShader: patternShaders['pattern-3'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-4'].vertex,
    fragmentShader: patternShaders['pattern-4'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-5'].vertex,
    fragmentShader: patternShaders['pattern-5'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-6'].vertex,
    fragmentShader: patternShaders['pattern-6'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-7'].vertex,
    fragmentShader: patternShaders['pattern-7'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-8'].vertex,
    fragmentShader: patternShaders['pattern-8'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-9'].vertex,
    fragmentShader: patternShaders['pattern-9'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-10'].vertex,
    fragmentShader: patternShaders['pattern-10'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-11'].vertex,
    fragmentShader: patternShaders['pattern-11'].fragment,
    side: THREE.DoubleSide
})

createPlaneForPattern({
    vertexShader: patternShaders['pattern-12'].vertex,
    fragmentShader: patternShaders['pattern-12'].fragment,
    side: THREE.DoubleSide
})

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
camera.position.set(1.25 * 2, - 2, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableRotate = false
controls.enablePan = false

controls.target = new THREE.Vector3(1.25 * 2, - 2,1)

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
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()