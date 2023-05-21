const vertexShader = () => {
	return `
      varying float x;
      varying float y;
      varying float z;
      varying vec3 vUv;

      uniform float u_time;
      uniform float u_amplitude;
      uniform float[64] u_data_arr;

      void main() {
        vUv = position;

        x = abs(position.x);
	      y = abs(position.y);

        float floor_x = round(x);
	      float floor_y = round(y);

        // z = sin(u_data_arr[int(floor_x)] / 50.0 - u_data_arr[int(floor_y)] / 50.0) * u_amplitude;
        // z = u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0;
        // z = u_data_arr[int(floor_x)] / 1.0 + u_data_arr[int(floor_y)] / 1.0; 
        z = sin(u_data_arr[int(floor_x)] / 50.0 + u_data_arr[int(floor_y)] / 50.0) * u_amplitude;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
      }
    `;
};

const fragmentShader = () => {
	return `
    varying float x;
    varying float y;

    float rand = 35.0;

    void main() {
      gl_FragColor = vec4((rand - abs(x)) / rand, (rand - abs(y)) / rand, (abs(x + y) / 2.0) / rand, 1.0);
    }
  `;
};

export { vertexShader, fragmentShader };
