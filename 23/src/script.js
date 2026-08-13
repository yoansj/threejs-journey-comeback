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
// const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

const burgersText = document.querySelector('.burgers')

// Scene
const scene = new THREE.Scene()

const BURGER_COUNT = 100;
let burgersAte = 0;

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

let objectsToTest = []

gltfLoader.load(
    '/models/burger.glb',
    (gltf) =>
    {
        for (let i = 0; i < BURGER_COUNT; i++) {
            const clone = gltf.scene.clone()

            clone.castShadow = true
            clone.receiveShadow = true

            const scale = gsap.utils.random(0.25, 1.25)

            clone.scale.set(
                scale,
                scale,
                scale,
            )

            gsap.set(clone.rotation, {
                x: Math.PI * gsap.utils.random(0, 2),
                y: Math.PI * gsap.utils.random(0, 2),
                z: Math.PI * gsap.utils.random(0, 2),
            })

            gsap.to(clone.rotation, { x: Math.PI * gsap.utils.random(0, 2), yoyo: true, duration: gsap.utils.random(1, 10), delay: gsap.utils.random(1, 5)  })
            gsap.to(clone.rotation, { y: Math.PI * gsap.utils.random(0, 2), yoyo: true, duration: gsap.utils.random(1, 10), delay: gsap.utils.random(1, 5) })

            gsap.to(clone.position, {
                x: gsap.utils.random(-50, 50),
                y: gsap.utils.random(-50, 50),
                z: gsap.utils.random(-50, 50),

                onComplete: () => {

                    const goToRandomPosition = () => {
                        gsap.to(clone.position, {
                            x: gsap.utils.random(-50, 50),
                            y: gsap.utils.random(-50, 50),
                            z: gsap.utils.random(-50, 50),
                            duration: gsap.utils.random(1, 10),
                            delay: gsap.utils.random(0.5, 5),
                            ease: gsap.utils.random(['bounce.in', 'expo', 'power1', 'none', 'sine']),
                            onComplete: goToRandomPosition
                        })
                    }

                     return goToRandomPosition()
                }
            })


            objectsToTest.push(clone)
            scene.add(clone)
        }
    }
)

const eatSound = new Audio('/sounds/eat.mp3')

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

const mousePos = new THREE.Vector2()

window.addEventListener('mousemove', (event) =>
{
    mousePos.x = event.clientX / sizes.width * 2 -1
    mousePos.y = - (event.clientY / sizes.height) * 2 + 1
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 8, 4, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 1, 0)
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

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

let currentIntersect = null

window.addEventListener('click', () =>
{
    if (currentIntersect !== null) {

        currentIntersect.object.visible = false

        const parent = currentIntersect.object.parent
        const idx = objectsToTest.findIndex((obj) => obj.uuid === parent.uuid)

        if (idx !== -1) {
            objectsToTest.splice(idx, 1)

            parent.visible = false

            eatSound.volume = 1
            eatSound.currentTime = 0
            eatSound.play()

            currentIntersect = null

            burgersAte += 1

            burgersText.textContent = `burgers ate: ${burgersAte}`

            if (burgersAte === BURGER_COUNT) {
                burgersText.textContent = `you're a hungry fella !!!`
            }
        }


    }
})

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Cast a ray
    raycaster.setFromCamera(mousePos, camera)

    const intersects = raycaster.intersectObjects(objectsToTest)

    if(intersects.length)
    {
        if(!currentIntersect)
        {
        }

        currentIntersect = intersects[0]
    }
    else
    {
        if(currentIntersect)
        {
        }
        
        currentIntersect = null
    }

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