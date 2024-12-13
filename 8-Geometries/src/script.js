import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

// Demo 1
// const geometry = new THREE.BoxGeometry(3, 1, 4, 3, 7, 5) 

const positionsArray = new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0
])

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true 

})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()