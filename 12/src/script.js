import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = { matcap: 2, }

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcaps = [matcapTexture, matcapTexture2, matcapTexture3, matcapTexture4, matcapTexture5, matcapTexture6, matcapTexture7]

matcaps.forEach((m) => {
    m.colorSpace = THREE.SRGBColorSpace
})

/**
 * Fonts
 */
const fontLoader = new FontLoader()

const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 })

fontLoader.load(
    '/fonts/Satoshi_Variable_Bold.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            '// STUDIO [1N]',
            {
                font: font,
                size: 0.5,
                depth: 0.1,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2
            }
        )

        textGeometry.computeBoundingBox()
        console.log(textGeometry.boundingBox)

        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, textMaterial)
        gui.add(debugObject, 'matcap', [0, 1, 2, 3, 4, 5, 6])
            .onChange((val) => {
                textMaterial.matcap = matcaps[val]
            })
        scene.add(text)
    }
)

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, textMaterial)
    scene.add(donut)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI, // since a donut is symmetric we don't really need random z
    )

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
}


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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()