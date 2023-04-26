attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D heightmap;

uniform float normScale;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);

    vTextureCoord = aTextureCoord;

    vec4 filter = texture2D(heightmap, vTextureCoord);

    offset = aVertexNormal * 0.2 * filter.b;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
    
}