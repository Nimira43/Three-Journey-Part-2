import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import './style.css'

const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5,
  cursor.y = - (event.clientY / sizes.height - 0.5)
})

const canvas = document.querySelector('canvas.webgl')
const sizes = {
  width: 800,
  height: 600
}
const scene = new THREE.Scene()
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff4500 })
)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()
const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
