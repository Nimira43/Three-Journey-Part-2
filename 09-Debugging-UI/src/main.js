import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './main.css'
import gsap from 'gsap'
import GUI from 'lil-gui'

const gui = new GUI()
const debugObject = {}

const canvas = document.querySelector('.canvas')
const scene = new THREE.Scene()

debugObject.color = '#ff4500'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

gui.add(mesh.position, 'x').min(- 3).max(3).step(0.01).name('X Position')
gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('Y Position')
gui.add(mesh.position, 'z').min(- 3).max(3).step(0.01).name('Z Position')

gui.add(mesh, 'visible').name('Add/Remove Mesh')
gui.add(material, 'wireframe').name('Add/Remove Wireframe')
gui
  .addColor(debugObject, 'color')
  .onChange(() => {
    material.color.set(debugObject.color)
})

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 6,
    x: mesh.rotation.x + Math.PI * 7,
    z: mesh.rotation.z + Math.PI * 9
  })
}

gui.add(debugObject, 'spin')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()