import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './main.css'
import gsap from 'gsap'
import GUI from 'lil-gui'

const gui = new GUI({
  width: 300,
  title: 'Cube GUI'
})

const debugObject = {}
const canvas = document.querySelector('.canvas')
const scene = new THREE.Scene()

debugObject.color = '#ff4500'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

const material = new THREE.MeshBasicMaterial({
  color: debugObject.color, 
  wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeChanges = gui.addFolder('Change Cube Characteristics')

cubeChanges.add(mesh.position, 'x').min(- 3).max(3).step(0.01).name('X Position')
cubeChanges.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('Y Position')
cubeChanges.add(mesh.position, 'z').min(- 3).max(3).step(0.01).name('Z Position')
cubeChanges.add(mesh, 'visible').name('Add/Remove Mesh')
cubeChanges.add(material, 'wireframe').name('Add/Remove Wireframe')

cubeChanges
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
cubeChanges.add(debugObject, 'spin')

debugObject.subdivision = 2
cubeChanges
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(
      1, 1, 1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    )
  })

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