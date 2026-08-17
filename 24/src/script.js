import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js'
/**
 * Base
 */
// Debug
const gui = new GUI()
const debugObject = { envMap: 'street', groundProjection: false }

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()
const loader = new GLTFLoader()
const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()
const textureLoader = new THREE.TextureLoader()

// LDR cube texture
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png'
])

const environmentMapSecond = cubeTextureLoader.load([
    '/environmentMaps/1/px.png',
    '/environmentMaps/1/nx.png',
    '/environmentMaps/1/py.png',
    '/environmentMaps/1/ny.png',
    '/environmentMaps/1/pz.png',
    '/environmentMaps/1/nz.png'
])

const environmentMapThree = cubeTextureLoader.load([
    '/environmentMaps/2/px.png',
    '/environmentMaps/2/nx.png',
    '/environmentMaps/2/py.png',
    '/environmentMaps/2/ny.png',
    '/environmentMaps/2/pz.png',
    '/environmentMaps/2/nz.png'
])


let hdriStreet = null
rgbeLoader.load('/environmentMaps/0/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    hdriStreet = environmentMap
})

let blenderHdri = null
rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    blenderHdri = environmentMap
})

let studioHdri = null
rgbeLoader.load('/environmentMaps/studio-2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    studioHdri = environmentMap
})

let nvidiaExr = null

exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    nvidiaExr = environmentMap
})

scene.background = environmentMap
scene.environment = environmentMap

gui.add(debugObject, 'envMap', ['street', 'theatre', 'field', 'hdri-street', 'blender-hdri', 'studio-hdri', 'nvidia-exr', 'realtime'])
    .onChange((val) => {
        // if (debugObject.groundProjection) {
        //     switch (debugObject.envMap) {
        //         case 'street':
        //             return setGroundedSkybox(environmentMap)
        //         case 'theatre':
        //             return setGroundedSkybox(environmentMapSecond)
        //         case 'field':
        //             return setGroundedSkybox(environmentMapThree)
        //         case 'hdri-street':
        //             return setGroundedSkybox(hdriStreet)
        //         case 'blender-hdri':
        //             return setGroundedSkybox(blenderHdri)
        //         case 'studio-hdri':
        //             return setGroundedSkybox(studioHdri)
        //         case 'nvidia-exr':
        //             return setGroundedSkybox(nvidiaExr)
        //     }
        // }

        switch (val) {
            case 'street':
                scene.background = environmentMap
                scene.environment = environmentMap
                break;
            case 'theatre':
                scene.background = environmentMapSecond
                scene.environment = environmentMapSecond
                break;
            case 'field':
                scene.background = environmentMapThree
                scene.environment = environmentMapThree

                break;
            case 'hdri-street':
                // scene.background = hdriStreet
                scene.environment = hdriStreet
                scene.environmentIntensity = 1
                scene.backgroundIntensity = 1

                const skybox = new GroundedSkybox(hdriStreet, 15, 70)
                skybox.material.wireframe = false
                skybox.position.y = 15
                scene.add(skybox)
                break;
            case 'blender-hdri':
                scene.background = blenderHdri
                scene.environment = blenderHdri
                scene.environmentIntensity = 1
                scene.backgroundIntensity = 1
                break;
            case 'studio-hdri':
                scene.background = studioHdri
                scene.environment = studioHdri
                scene.environmentIntensity = 1
                scene.backgroundIntensity = 0
                break;
            case 'nvidia-exr':
                scene.background = nvidiaExr
                scene.environment = nvidiaExr
                scene.environmentIntensity = 1
                scene.backgroundIntensity = 1
                break;
            case 'realtime':
                scene.background = em
                scene.environment = cubeRenderTarget.texture
                holyDonut.visible = true
                break;
        }
    })

scene.environmentIntensity = 1
scene.backgroundIntensity = 1

let em = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
em.mapping = THREE.EquirectangularReflectionMapping
em.colorSpace = THREE.SRGBColorSpace

// scene.background = em

// Holy donut
let holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
)
holyDonut.position.y = 3.5
holyDonut.layers.enable(1)
holyDonut.visible = false
scene.add(holyDonut)

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.FloatType
    }
)

// Cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)

scene.environment = cubeRenderTarget.texture

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001)

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001)
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)

gui.add(scene.backgroundRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('backgroundRotationY')
gui.add(scene.environmentRotation, 'y').min(0).max(Math.PI * 2).step(0.001).name('environmentRotationY')


loader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', (model) => {
    model.scene.scale.set(10, 10, 10)
    scene.add(model.scene)
})

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
)
torusKnot.position.x = - 4
torusKnot.position.y = 4
scene.add(torusKnot)

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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
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

    // Time
    const elapsedTime = clock.getElapsedTime()
        
    // Real time environment map
    if(holyDonut)
    {
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        cubeCamera.update(renderer, scene)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()