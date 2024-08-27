import * as THREE from 'three'
import './style.css'

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

camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  mesh.rotation.y = elapsedTime

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
