import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025, 0.025)

        gltf.scene.position.x = 2

        mixer = new THREE.AnimationMixer(gltf.scene)

        const look = mixer.clipAction(gltf.animations[0])
        const run = mixer.clipAction(gltf.animations[1])
        const galop = mixer.clipAction(gltf.animations[2])

        gui.add(look, 'play').name('Look around')
        gui.add(run, 'play').name('Run')
        gui.add(galop, 'play').name('Galop')

        scene.add(gltf.scene)
    },
)


gltfLoader.load(
    '/models/Duck/glTF/Duck.gltf',
    (gltf) =>
    {
        gsap.to(gltf.scene.children[0].rotation, { y: Math.PI * 2, repeat: -1, duration: 7, ease: 'none'  })
        gltf.scene.children[0].position.y = 1
        scene.add(gltf.scene.children[0])
    },
)

gltfLoader.load(
    '/models/Duck/glTF-Binary/Duck.glb',
    (gltf) =>
    {
        const dup = gltf.scene.children[0]
        dup.position.z = 3
        dup.position.y = 1
        gsap.to(dup.rotation, { y: -Math.PI * 2, repeat: -1, duration: 9, ease: 'none', delay: 1  })
        gsap.to(dup.rotation, { x: -Math.PI * 2, repeat: -1, duration: 15, ease: 'none'  })
        scene.add(dup)
    },
)

gltfLoader.load(
    '/models/Duck/glTF-Draco/Duck.gltf',
    (gltf) =>
    {
        const dup = gltf.scene.children[0]
        dup.position.z = -2
        dup.position.x = -3
        dup.position.y = 1
        gsap.to(dup.rotation, { y: -Math.PI * 2, repeat: -1, duration: 7, ease: 'none'  })
        gsap.to(dup.rotation, { z: -Math.PI * 2, repeat: -1, duration: 10, ease: 'none', delay: 1  })
        scene.add(dup)
    },
)

gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) =>
    {
        const children = [...gltf.scene.children]
        for(const child of children)
        {
            gsap.to(child.rotation, { y: Math.PI * 2, repeat: -1, duration: 14, ease: 'none'  })
            child.position.z = -3
            child.position.y = 1
            child.scale.set(2, 2, 2)
            scene.add(child)
        }
    }
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()