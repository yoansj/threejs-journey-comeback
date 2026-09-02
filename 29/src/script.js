import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
gui.close()
const debugObject = {}

debugObject.depthColor = '#8000ff'
debugObject.surfaceColor = '#ff80c0'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(20, 20, 512, 512)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uBigWavesElevation: { value: 0.105 },
        uBigWavesFrequency: { value: new THREE.Vector2(3.558, 0.464)},
        uBigWavesSpeed: { value: 1.039 },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uColorOffset: { value: 0.128 },
        uColorMultiplier: { value: 1.516 },
        uSmallWavesElevation: { value: 0.198 },
        uSmallWavesFrequency: { value: 1.531 },
        uSmallWavesSpeed: { value: 0.328 },
        uSmallIterations: { value: 5 },
        uFoamThreshold: { value: 0.08 },
        uFoamSoftness: { value: 0.05 },
        uFoamColor: { value: new THREE.Color().lerpColors(new THREE.Color('white'), new THREE.Color(debugObject.depthColor), 0.5) },
    }
})

gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value')
    .min(0)
    .max(1)
    .step(0.001)
    .name('uBigWavesElevation')

gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x')
    .min(0)
    .max(100)
    .step(0.001)
    .name('uBigWavesFrequency X')

gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y')
    .min(0)
    .max(100)
    .step(0.001)
    .name('uBigWavesFrequency Y')

gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

gui.addColor(debugObject, 'depthColor').onChange(() => { waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor) })
gui.addColor(debugObject, 'surfaceColor').onChange(() => { waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })

gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')


gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 2, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enabled = false
gui.add(controls, 'enabled').name('Enable camera')

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setClearColor( new THREE.Color( debugObject.depthColor))
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()