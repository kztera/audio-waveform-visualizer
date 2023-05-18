import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export default class SceneInit {
	constructor(canvasID, camera, scene, stats, controls, renderer, fov = 36) {
		this.fov = fov;
		this.scene = scene;
		this.stats = stats;
		this.camera = camera;
		this.controls = controls;
		this.renderer = renderer;
		this.canvasID = canvasID;
	}

	initScene() {
		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		this.camera.position.z = 196;

		this.clock = new THREE.Clock();
		this.scene = new THREE.Scene();

		this.uniforms = {
			u_time: { type: "f", value: 1.0 },
			colorB: { type: "vec3", value: new THREE.Color(0xfff000) },
			colorA: { type: "vec3", value: new THREE.Color(0xffffff) },
		};

		this.renderer = new THREE.WebGLRenderer({
			antialias: true, // khử răng cưa
		});

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		this.stats = Stats();
		document.body.appendChild(this.stats.dom);

		// Tạo ánh sáng ambient và spot
		let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		ambientLight.castShadow = false;
		this.scene.add(ambientLight);

		let spotLight = new THREE.SpotLight(0xffffff, 0.55);
		spotLight.castShadow = true;
		spotLight.position.set(0, 80, 10);
		this.scene.add(spotLight);

		// Nếu cửa sổ window thay đổi thì tự động resize
		window.addEventListener("resize", () => this.onWindowResize(), false);
	}

	animate() {
		window.requestAnimationFrame(this.animate.bind(this));
		this.render();
		this.stats.update();
		this.controls.update();
	}

	render() {
		this.uniforms.u_time.value += this.clock.getDelta();
		this.renderer.render(this.scene, this.camera);
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
