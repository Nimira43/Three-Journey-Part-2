import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const loadingManager = new THREE.LoadingManager()

const textureLoader = new THREE.TextureLoader(loadingManager)

// const colourTexture = textureLoader.load('/textures/door/color.jpg')
// const colourTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colourTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const colourTexture = textureLoader.load('/textures/minecraft.png')
  
colourTexture.colorSpace = THREE.SRGBColorSpace

// colourTexture.repeat.x = 2
// colourTexture.repeat.y = 3
// colourTexture.wrapS = THREE.MirroredRepeatWrapping
// colourTexture.wrapT = THREE.MirroredRepeatWrapping
// colourTexture.offset.x = 0.5
// colourTexture.offset.y = 0.5
// colourTexture.rotation = Math.PI / 4
// colourTexture.center.x = 0.5
// colourTexture.center.y = 0.5

colourTexture.generateMipmaps = false
colourTexture.minFilter = THREE.NearestFilter
colourTexture.magFilter = THREE.NearestFilter

const canvas = document.querySelector('canvas.canvas')
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colourTexture })

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()