precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t) {
  return vec3(0.07 + 0.5 * sin(6.2831 * t + 0.0), 0.8 * abs(sin(t + 1.0)), 0.6 + 0.4 * cos(t + 2.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv = uv * 2.0 - 1.0;
  float len = length(uv);
  float pulse = sin(u_time * 0.5 + len * 3.0);
  float glow = smoothstep(1.0, 0.0, len) + pulse * 0.15;
  vec3 color = mix(vec3(0.02, 0.03, 0.08), palette(len + u_time * 0.05), glow);
  gl_FragColor = vec4(color, 1.0);
}
