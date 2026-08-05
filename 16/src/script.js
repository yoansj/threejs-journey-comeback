import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Pane } from "tweakpane"
import gsap from 'gsap'
import { Sky } from 'three/addons/objects/Sky.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Base unit for this project
 */
const BASE_UNIT = 1
const u = (n) => n * BASE_UNIT

const loader = new GLTFLoader();
const tree = await loader.loadAsync( 'tree/dead_tree.glb' );
/**
 * Base
 */
// Debug
const gui = new Pane({ title: 'Haunted house debug menu', expanded: false })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

scene.add(tree.scene)

/** @type {THREE.Group} */
const treeScene = tree.scene

treeScene.scale.set(7, 7, 7)
treeScene.position.x = 4
treeScene.position.z = -2
treeScene.receiveShadow = true
treeScene.castShadow = true


/**
 * Helpers
 */
const debugFolder = gui.addFolder({ title: 'Helpers'})
const gridHelper = new THREE.GridHelper(30, 30)
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

// Wall
const wallColorTexture = textureLoader.load('./wall/weathered_peeling_timber_1k/weathered_peeling_timber_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/weathered_peeling_timber_1k/weathered_peeling_timber_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/weathered_peeling_timber_1k/weathered_peeling_timber_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

wallColorTexture.repeat.set(3, 3)
wallARMTexture.repeat.set(3, 3)
wallNormalTexture.repeat.set(3, 3)

wallColorTexture.wrapS = THREE.RepeatWrapping
wallARMTexture.wrapS = THREE.RepeatWrapping
wallNormalTexture.wrapS = THREE.RepeatWrapping

wallColorTexture.wrapT = THREE.RepeatWrapping
wallARMTexture.wrapT = THREE.RepeatWrapping
wallNormalTexture.wrapT = THREE.RepeatWrapping

// Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


// Bush
const bushColorTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
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
        displacementScale: 0.5,
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
    new THREE.MeshStandardMaterial({
        color: '#c09882',
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += u(1.25)
house.add(walls)

// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(u(3.5), u(1.5), u(4)),
    new THREE.MeshStandardMaterial({
        color: '#79523e',
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y += u(2.5 + 0.75)
roof.rotation.y = Math.PI * 0.25
house.add(roof)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(u(2.2), u(2.2), 100, 100),
    new THREE.MeshStandardMaterial({
        color: '#79523e',
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementScale: 0.3,
        displacementBias: -0.15,
    })
)
door.position.y = u(1)
door.position.z = u(2 + 0.01)
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

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

// rotate bushes for the texture
bush1.rotation.x = - 0.75
bush2.rotation.x = - 0.75
bush3.rotation.x = - 0.75
bush4.rotation.x = - 0.75

house.add(bush1, bush2, bush3, bush4)

// Grave
const graveColorTexture = textureLoader.load('./grave/rock_01_1k/rock_01_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/rock_01_1k/rock_01_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/rock_01_1k/rock_01_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})


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

    gsap.to(grave.position, { y: Math.random() * 0.4, delay: 3 + (0.1 * i), duration: 2 })
    gsap.to(grave.rotation, {
        y: (Math.random() - 0.5) * 0.4,
        x: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4,
        delay: 3 + (0.1 * i),
        duration: 2
    })

    // Add to the graves group
    graves.add(grave)
}

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff0000', 5)
const ghost2 = new THREE.PointLight('#00ff37', 5)
const ghost3 = new THREE.PointLight('#7700ff', 5)

scene.add(ghost1, ghost2, ghost3)

const animateGhost2 = () => {
    const randX = gsap.utils.random(-15, 15)
    const randY = gsap.utils.random(-15, 15)
    const randDur = gsap.utils.random(1, 8)
    const randEase = gsap.utils.random(['bounce.out', 'elastic.out', 'expo.in', 'steps(12)', 'power4.inOut'])

    gsap.to(ghost2.position, {
      x: randX,
      z: randY,
      duration: randDur,
      ease: randEase,
      onComplete: animateGhost2,
    });
}

const animateGhost3 = () => {
    const randX = gsap.utils.random(-8, 8)
    const randY = gsap.utils.random(-8, 8)
    const randDur = gsap.utils.random(0.1, 15)

    gsap.set(ghost3.position, {
      x: randX,
      z: randY,
      delay: randDur,
      onComplete: animateGhost3,
    });
}

animateGhost2()
animateGhost3()

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

gui.addBinding(ambientLight, 'intensity', { label: 'al intensity'})
debugObject.ambientLightColor = ambientLight.color
gui.addBinding(debugObject, 'ambientLightColor', { label: 'al color'})
    .on('change', (ev) => {
        const color = new THREE.Color(ev.value)
        ambientLight.color = color
    })

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 0.7)
gui.addBinding(directionalLight, 'intensity', { label: 'dl intensity'})
debugObject.directionalLightColor = directionalLight.color
gui.addBinding(debugObject, 'directionalLightColor', { label: 'dl color'})
    .on('change', (ev) => {
        const color = new THREE.Color(ev.value)
        directionalLight.color = color
    })
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('rgb(171, 189, 16)', 4)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

gui.addBinding(doorLight, 'intensity', { label: 'door intensity'})
debugObject.doorLightColor = doorLight.color
gui.addBinding(debugObject, 'doorLightColor', { label: 'door l color' })
    .on('change', (ev) => {
        const color = new THREE.Color(ev.value)
        doorLight.color = color
    })

const animateDoorLight = () => {
    // I put -4 to for so there's a many "chances" for
    // the light to be on or off
    const val = gsap.utils.random([0, 0, 1, 2, 3, 4, 0, 0])
    const delay = gsap.utils.random(0.1, 2.5)

    gsap.set(doorLight, { intensity: val, delay, onComplete: animateDoorLight })
}

animateDoorLight()
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
controls.autoRotate = true
controls.autoRotateSpeed = 1
controls.minDistance = 10

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
doorLight.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children)
{
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.set(100, 100, 100)

/**
 * Fog
 */

scene.fog = new THREE.FogExp2('#043f28', 0.08)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const ghost1Angle = elapsedTime * 0.7
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)


    const ghost3Angle = elapsedTime * 0.23
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()