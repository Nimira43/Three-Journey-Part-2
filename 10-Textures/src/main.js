import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => console.log('onStart')
loadingManager.onLoad = () => console.log('onLoad')
loadingManager.onProgress = () => console.log('onProgress')
loadingManager.onError = () => console.log('onError')

const textureLoader = new THREE.TextureLoader(loadingManager)

const colourTexture = textureLoader.load('/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/textures/alpha.jpg')
// const heightTexture = textureLoader.load('/texture/height.jpg')
// const normalTexture = textureLoader.load('/texture/normal.jpg')
// const metalnessTexture = textureLoader.load('/texture/metalness.jpg')
// const ambientOcclusionTexture = textureLoader.load('/texture/ambientOcclusion.jpg')
// const roughnessTexture = textureLoader.load('/texture/roughness.jpg')
  
colourTexture.colorSpace = THREE.SRGBColorSpace
// alphaTexture.colorSpace = THREE.SRGBColorSpace
// heightTexture.colorSpace = THREE.SRGBColorSpace
// normalTexture.colorSpace = THREE.SRGBColorSpace
// metalnessTexture.colorSpace = THREE.SRGBColorSpace
// ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
// roughnessTexture.colorSpace = THREE.SRGBColorSpace

const canvas = document.querySelector('canvas.canvas')
const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ map: colourTexture })
// const material = new THREE.MeshBasicMaterial({ map: alphaTexture })
// const material = new THREE.MeshBasicMaterial({ map: heightTexture })
// const material = new THREE.MeshBasicMaterial({ map: normalTexture })
// const material = new THREE.MeshBasicMaterial({ map: metalnessTexture })
// const material = new THREE.MeshBasicMaterial({ map: ambientOcclusionTexture })
// const material = new THREE.MeshBasicMaterial({ map: roughnessTexture })

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

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()