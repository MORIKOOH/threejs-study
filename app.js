window.addEventListener('DOMContentLoaded', init, false);

function init() {
  const width = 600;
  const height = 600;

  // レンダラーを作成する
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
  });
  renderer.setSize(width, height);

  // シーンを作成する
  const scene = new THREE.Scene();

  // カメラを作成する
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // カメラコントローラを作成する(OrbitControls.js)
  const controls = new THREE.OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 球体を作成する
  // ジオメトリ・マテリアルを作成合わせたメッシュを作成する
  // 球体のジオメトリを作成する
  const geometry = new THREE.SphereBufferGeometry(200, 30, 30);
  // 画像を読み込み、テクスチャを作成する
  const loader = new THREE.TextureLoader();
  const texture = loader.load('imgs/earthmap1k.jpg');
  // マテリアルにテクスチャーを設定する
  const material = new THREE.MeshStandardMaterial({
    map: texture
  });
  // メッシュを作成する
  const mesh = new THREE.Mesh(geometry, material);
  // シーンにメッシュを追加する
  scene.add(mesh);

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(5,3,5);
  // 平行光源をシーンに追加
  scene.add(directionalLight);

  animate();

  function animate() {
    mesh.rotation.y += 0.01;

    controls.update();


    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
}
