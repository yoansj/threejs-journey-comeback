import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Pane } from 'tweakpane'


/**
 * Base
 */
// Debug
const gui = new Pane({ title: 'Lights debug menu', expanded: false })
const debugObject = {
    ambientLightColor: '#ffffff',
    directionalLightColor: '0x00fffc',
    hemisphereLightSkyColor: '0xff0000',
    hemisphereLightGroundColor: '0x0000ff',
    pointLightPosition: { x: 1, y: 1 },
    pointLightColor: '#ff5d00',
    rectAreaLightColor: '#ff1400',
    rectAreaLightPosition: { x: -2, y: 3},
    rectAreaLightLookAt: { x: 0, y: 0, z: 0},
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Ambient light
// Applies light in every direction and on all geometries in the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const aLF = gui.addFolder({ title: 'AmbientLight'})
aLF.addBinding(ambientLight, 'visible')
aLF.addBinding(ambientLight, 'intensity', { step: 0.001, max: 3, min: 0 })
aLF.addBinding(debugObject, 'ambientLightColor', {label: 'color'})
    .on('change', ({ value }) => {
        ambientLight.color = new THREE.Color(value)
    })

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const dlF = gui.addFolder({ title: 'DirectionalLight'})
dlF.addBinding(directionalLight, 'visible')
dlF.addBinding(directionalLight, 'intensity', { step: 0.001, max: 3, min: 0 })
dlF.addBinding(debugObject, 'directionalLightColor', {label: 'color'})
    .on('change', ({ value }) => {
        directionalLight.color = new THREE.Color(value)
    })

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)

const hlF = gui.addFolder({ title: 'HemisphereLight'})
hlF.addBinding(hemisphereLight, 'visible')
hlF.addBinding(hemisphereLight, 'intensity', { step: 0.001, max: 3, min: 0 })
hlF.addBinding(debugObject, 'hemisphereLightSkyColor', {label: 'color'})
    .on('change', ({ value }) => {
        hemisphereLight.color = new THREE.Color(value)
    })
hlF.addBinding(debugObject, 'hemisphereLightGroundColor', {label: 'color'})
    .on('change', ({ value }) => {
        hemisphereLight.color = new THREE.Color(value)
    })

// Point light
const pointLight = new THREE.PointLight('#ff5d00', 1.300, 1.685, 1.304)
pointLight.position.set(0, - 0.5, 0.29)
scene.add(pointLight)

const plF = gui.addFolder({ title: 'PointLight'})
plF.addBinding(pointLight, 'visible')
plF.addBinding(pointLight, 'intensity', { step: 0.001, max: 5, min: 0 })
plF.addBinding(pointLight, 'distance', { step: 0.001, max: 5, min: 0 })
plF.addBinding(pointLight, 'decay', { step: 0.001, max: 5, min: 0 })
plF.addBinding(debugObject, 'pointLightPosition', { label: 'position', picker: 'inline', expanded: true })
    .on('change', ({ value }) => {
        pointLight.position.x = value.x
        pointLight.position.z = value.y
    })
plF.addBinding(debugObject, 'pointLightColor', {label: 'color'})
    .on('change', ({ value }) => {
        pointLight.color = new THREE.Color(value)
    })


// React area light
const rectAreaLight = new THREE.RectAreaLight(debugObject.rectAreaLightColor, 8, 1, 1)
scene.add(rectAreaLight)

rectAreaLight.position.set(- 2, 0, 3)
rectAreaLight.lookAt(new THREE.Vector3())


const raL = gui.addFolder({ title: 'RectAreaLight'})

raL.addBinding(rectAreaLight, 'visible')
raL.addBinding(rectAreaLight, 'intensity', { step: 0.01, max: 15, min: 0 })
raL.addBinding(debugObject, 'rectAreaLightPosition', { label: 'position', picker: 'inline', expanded: true })
    .on('change', ({ value }) => {
        rectAreaLight.position.x = value.x
        rectAreaLight.position.z = value.y
    })
raL.addBinding(debugObject, 'rectAreaLightLookAt', { label: 'look', picker: 'inline', expanded: true })
    .on('change', ({ value }) => {
        rectAreaLight.lookAt(new THREE.Vector3(value.x, value.y, value.z))
    })
raL.addBinding(debugObject, 'rectAreaLightColor', {label: 'color'})
    .on('change', ({ value }) => {
        rectAreaLight.color = new THREE.Color(value)
    })

// Spot light
// const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 3, 5)
// spotLight.target.position.set(0, 0, 0)
// scene.add(spotLight.target)
// scene.add(spotLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)
axesHelper.visible = false
gui.addBinding(axesHelper, 'visible', { label: 'Axes'})


// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()