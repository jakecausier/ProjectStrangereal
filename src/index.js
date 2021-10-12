import * as THREE from 'three'
import * as d3 from "d3"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GeoJsonGeometry } from 'three-geojson-geometry'
const { svgtogeojson } = require('svg-to-geojson')

document.addEventListener('DOMContentLoaded', () => {
  var svg = document.getElementById('svg')
  var geoJson = svgtogeojson.svgToGeoJson([[90, 180], [-80, -180]], svg, 10)

  const alt = 50;
  const lineObjs = [
    new THREE.LineSegments(
      new GeoJsonGeometry(d3.geoGraticule10(), alt),
      new THREE.LineBasicMaterial({ color: 'blue', opacity: 0.4, transparent: true })
    )
  ];

  // GeoJSON lines
  geoJson.features.forEach((item) => {
    lineObjs.push(new THREE.LineSegments(
      new GeoJsonGeometry(item.geometry, alt + 0.01),
      new THREE.LineBasicMaterial({ color: 'blue', opacity: 1, transparent: true })
    ))
  })

  console.log(geoJson)
  
  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('three').appendChild(renderer.domElement);

  // Setup scene
  const scene = new THREE.Scene();
  lineObjs.forEach(obj => scene.add(obj));
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(alt, 32, 32), new THREE.MeshBasicMaterial({ color: 'black', opacity: 0.6, transparent: true })))
  scene.add(new THREE.AmbientLight(0xbbbbbb));
  scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

  // Setup camera
  const camera = new THREE.PerspectiveCamera();
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  camera.position.z = 200;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.rotateSpeed = 2;
  controls.zoomSpeed = 0.5;
  controls.enableDamping = true;

  (function animate() {
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();

})