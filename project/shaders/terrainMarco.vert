attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
uniform sampler2D uSampler2;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec3 vCoors;

void main() {
    vTextureCoord = aTextureCoord;

    vec4 filter = texture2D(terrainMap, vTextureCoord);

    vec3 offset = vec3(0.0, 0.0, 0.0);

    offset = aVertexNormal * texture2D(uSampler2, 1.0* vec2(0.0, 5.0) + vTextureCoord).r * 0.35;

    vCoors = aVertexPosition + offset;

    gl_Position = uPMatrix * uMVMatrix * vec4(vCoors, 1.0);
    
}