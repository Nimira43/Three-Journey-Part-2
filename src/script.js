import * as THREE from 'three'
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

// Place Orthographic Camera code here - see below

camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()
const tick = () => {
  
  const elapsedTime = clock.getElapsedTime()

  // mesh.rotation.y = elapsedTime

  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.lookAt(mesh.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()

//=========================================================
// Orthographic Camera code
//=========================================================
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   - 1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   - 1,
//   0.1,
//   100
// )
// camera.position.x = 2
// camera.position.y = 2
