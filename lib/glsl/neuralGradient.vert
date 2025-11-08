uniform float u_time;
attribute vec3 position;
void main() {
  vec3 pos = position;
  pos.z += sin(u_time * 0.5 + position.x * 0.5) * 0.1;
  gl_Position = vec4(pos, 1.0);
}
