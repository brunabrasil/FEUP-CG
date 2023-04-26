#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D altimetry;

void main() {
  vec4 color = texture2D(terrainTex, vTextureCoord);
  float height = texture2D(heightmap, vTextureCoord).r;
  vec4 altimetryColor = texture2D(altimetry, vec2(0, -height));

  gl_FragColor = mix(color, altimetry, 0.3);

}