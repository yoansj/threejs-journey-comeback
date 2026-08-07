import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { Pane } from 'tweakpane'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new Pane({ title: 'Galaxy generator', expanded: false })
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/5.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * View settings — these only change how the galaxy is displayed,
 * they never rebuild the geometry
 */
const view = {}

view.background = '#000000'
view.rotationSpeed = 0.001
view.autoGenerate = true

scene.background = new THREE.Color(view.background)

const parameters = {}

parameters.count = 100000
parameters.size = 0.01
parameters.radius = 5
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.2
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    if(points !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
    */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++)
    {
        const i3 = i * 3

        const radius = Math.random() * parameters.radius

        const spinAngle = radius * parameters.spin

        // i % parameters.branches always returns a number between 0 and parameters.branches - 1
        // then it's just a percentage 0 / 3 = 0 * Math.PI * 2
        // Math.PI is a half circle, * 2 it's a full circle
        // basically it's giving a percentage of a circle, an angle
        // much more understandable
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
 
        positions[i3] =  Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        const mixedColor = colorInside.clone()
        // lerp takes a target
        // and a progress between 0 and 1
        // 
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3    ] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
    */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: particleTexture,
        alphaMap: particleTexture,
        transparent: true,
        depthWrite: false
    })

    
    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}

const tabs = gui.addTab({
    pages: [
        { title: 'Galaxy' },
        { title: 'Preview' }
    ]
})

const galaxyTab = tabs.pages[0]
const previewTab = tabs.pages[1]

galaxyTab.addBinding(parameters, 'count', { label: 'Number of stars', min: 100, max: 1000000, step: 100 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'size', { label: 'Star size', min: 0.001, max: 0.1, step: 0.001 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'radius', { label: 'Galaxy width', min: 0.01, max: 20, step: 0.01 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'branches', { label: 'Number of arms', min: 2, max: 20, step: 1 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'spin', { label: 'Arm curl', min: -5, max: 5, step: 0.001 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'randomness', { label: 'Star scatter', min: 0, max: 5, step: 0.001 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'randomnessPower', { label: 'Arm tightness', min: 1, max: 10, step: 0.001 }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'insideColor', { label: 'Core color' }).on("change", generateGalaxy)
galaxyTab.addBinding(parameters, 'outsideColor', { label: 'Edge color' }).on("change", generateGalaxy)

// THREE.Color only parses `rgb()` with integer channels, and tweakpane inferred
// a hex-string input from the initial '#ff6030', so stick to hex here
const randomColor = () => '#' + gsap.utils.random(0, 0xffffff, 1).toString(16).padStart(6, '0')

const loremWords = [
    'lorem', 'ipsum', 'dolor', 'amet', 'consectetur', 'adipiscing', 'tempor',
    'incididunt', 'labore', 'magna', 'aliqua', 'veniam', 'nostrud', 'aliquip',
    'commodo', 'voluptate', 'cillum', 'fugiat', 'pariatur', 'occaecat',
    'proident', 'officia', 'deserunt', 'mollit', 'laborum'
]

const galaxyTypes = ['Major', 'Minor', 'Prime', 'Nebula', 'Cluster', 'Void', 'Expanse', 'Nova']

// gsap.utils.random() picks a random item when you hand it an array
const randomName = () => {
    const word = gsap.utils.random(loremWords)
    const name = word[0].toUpperCase() + word.slice(1)

    return `${name} ${gsap.utils.random(galaxyTypes)} ${gsap.utils.random(1, 999, 1)}`
}

const randomValues = () => {
    // the third argument is a snap increment, it keeps count/branches integers
    parameters.count = gsap.utils.random(100, 1000000, 100)
    parameters.size = gsap.utils.random(0.001, 0.1)
    parameters.radius = gsap.utils.random(0.01, 20)
    parameters.branches = gsap.utils.random(2, 20, 1)
    parameters.spin = gsap.utils.random(-5, 5)
    parameters.randomness = gsap.utils.random(0, 5)
    parameters.randomnessPower = gsap.utils.random(1, 10)
    parameters.insideColor = randomColor()
    parameters.outsideColor = randomColor()
    parameters.name = randomName()

    // random magnitude then a random direction, so it never lands near 0 and stalls
    view.rotationSpeed = gsap.utils.random(0.0005, 0.005) * (gsap.utils.random(0, 1, 1) ? 1 : -1)

    gui.title = parameters.name

    generateGalaxy()
    gui.refresh() // push the new values back into the sliders
}

let autoGenerateTimer = null

const updateAutoGenerate = () => {
    // always clear first, otherwise toggling off then on stacks up intervals
    if(autoGenerateTimer !== null)
    {
        clearInterval(autoGenerateTimer)
        autoGenerateTimer = null
    }

    if(view.autoGenerate)
    {
        autoGenerateTimer = setInterval(randomValues, 15000)
    }
}

const takeScreenshot = () => {
    // draw one fresh frame so we capture exactly what is on screen right now
    renderer.render(scene, camera)

    const link = document.createElement('a')
    link.download = `${parameters.name.replaceAll(' ', '-').toLowerCase()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
}

previewTab.addBinding(view, 'background', { label: 'Background' }).on("change", () => {
    scene.background.set(view.background)
})
previewTab.addBinding(view, 'rotationSpeed', { label: 'Spin speed', min: -0.01, max: 0.01, step: 0.0001 })
previewTab.addBinding(view, 'autoGenerate', { label: 'New galaxy every 15s' }).on("change", updateAutoGenerate)

// added on the pane itself instead of a tab, so they stay visible on both tabs
gui.addButton({ title: 'Generate a new galaxy' }).on("click", randomValues)
gui.addButton({ title: 'Take a screenshot' }).on("click", takeScreenshot)

randomValues()
updateAutoGenerate() // "change" never fires on its own, so kick off the timer here
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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // without this the drawing buffer is wiped after each frame and
    // toDataURL() gives back a blank image
    preserveDrawingBuffer: true
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

    // Update controls
    controls.update()

    points.rotation.y += view.rotationSpeed

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()