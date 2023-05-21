import { useEffect, useState } from "react";
import * as THREE from "three";
import SceneInit from "./lib/SceneInit";
import { vertexShader, fragmentShader } from "./lib/Shaders";

export default function Home() {
	let test, audioContext, audioElement, dataArray, analyser, source;

	let gui;
	const initGui = async () => {
		const dat = await import("dat.gui");
		gui = new dat.GUI();
	};

	const setupAudioContext = () => {
		audioContext = new window.AudioContext();
		audioElement = document.getElementById("myAudio");
		source = audioContext.createMediaElementSource(audioElement);
		analyser = audioContext.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		analyser.fftSize = 4096;
		dataArray = new Uint8Array(analyser.frequencyBinCount);
	};

	const play = async () => {
		if (audioContext === undefined) {
			setupAudioContext();
		}

		const uniforms = {
			u_time: {
				type: "f",
				value: 1.0,
			},
			u_amplitude: {
				type: "f",
				value: 3.0,
			},
			u_data_arr: {
				type: "float[64]",
				value: dataArray,
			},
			u_black: { type: "vec3", value: new THREE.Color(0x000000) },
			u_white: { type: "vec3", value: new THREE.Color(0xffffff) },
		};

		// Một vài hình dạng khác để thử
		// const planeGeometry = new THREE.SphereGeometry(16, 64, 64);
		// const planeGeometry = new THREE.TorusGeometry(16, 8, 64, 64);
		// const planeGeometry = new THREE.TorusKnotGeometry(16, 8, 64, 64);
		// const planeGeometry = new THREE.DodecahedronGeometry(16, 0);
		// const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);

		// Thiết lập Mesh và thêm vào scene
		const planeGeometry = new THREE.BoxGeometry(100, 100, 50, 100, 100, 100);
		const planeCustomMaterial = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexShader(),
			fragmentShader: fragmentShader(),
			wireframe: true,
		});
		const planeMesh = new THREE.Mesh(planeGeometry, planeCustomMaterial);
		planeMesh.rotation.x = -Math.PI / 4;
		planeMesh.scale.x = 2;
		planeMesh.scale.y = 2;
		planeMesh.scale.z = 2;
		planeMesh.position.y = 8;
		test.scene.add(planeMesh);

		if (gui === undefined) {
			await initGui();
			const audioWaveGui = gui.addFolder("Audio Setting");
			audioWaveGui
				.add(uniforms.u_amplitude, "value", 1.0, 8.0)
				.name("Amplitude")
				.listen();
			audioWaveGui
				.add(audioElement, "src", {
					"Long Legend Study": "./a-long-legend-study.mp3",
					"Điều chưa nói - Tùa":
						"./TÙA & CM1X - Điều Chưa Nói (Whisky & Fucc Flip) [Lyrics video].mp3",
					"Đêm dài lắm mộng em có biết không?":
						"./dem-dai-lam-mong-em-co-biet-khong.mp3",
					"Rainy Night": "./rain.mp3",
					"Rain, you and me.. - Duckie": "./Rain, you and me.. - Duckie.mp3",
					"Why you won't stay? - Karrot": "./why you wont stay.mp3",
					"Đó chẳng phải là lý do nữa": "./Đó chẳng phải là lý do nữa.mp3",
					"Pogo - Forget": "./Pogo Forget.mp3",
					"Lonely World": "./Lonely World.mp3",
					"Be the One": "./Be the One - Dua Lipa.mp3",
				})
				.name("Song")
				.listen();
			audioWaveGui.open();

			const planeGeometryGui = gui.addFolder("Wave Setting");
			planeGeometryGui
				.add(planeCustomMaterial, "wireframe")
				.name("Wireframe")
				.listen();
			planeGeometryGui
				.add(planeMesh.scale, "x", 1.0, 8.0)
				.name("Scale x")
				.listen();
			planeGeometryGui
				.add(planeMesh.scale, "y", 1.0, 8.0)
				.name("Scale y")
				.listen();
			planeGeometryGui
				.add(planeMesh.scale, "z", 1.0, 8.0)
				.name("Scale z")
				.listen();
		}

		const render = (time) => {
			// Cập nhật dữ liệu từ audio vào mảng dataArray
			analyser.getByteFrequencyData(dataArray);

			// Cập nhật thông số uniforms
			uniforms.u_time.value = time;
			uniforms.u_data_arr.value = dataArray;

			// Gọi hàm render mỗi khung hình
			requestAnimationFrame(render);
		};

		render();
	};

	useEffect(() => {
		test = new SceneInit("myThreeJsCanvas");
		test.initScene();
		test.animate();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="absolute bottom-2 right-2">
				<audio
					id="myAudio"
					src="./a-long-legend-study.mp3" // Đường dẫn đến file audio mặc định khi load trang
					className="w-80"
					controls
					autoPlay
					onPlay={play}
				/>
			</div>
		</div>
	);
}
