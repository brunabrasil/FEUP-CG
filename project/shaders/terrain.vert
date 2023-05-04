attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

uniform sampler2D bumpMap;
varying vec2 vTextureCoord;
uniform float offset;
uniform float multiplier;

void main() {

    vec4 color = texture2D(bumpMap, aTextureCoord);
    vec3 position = vec3(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + (color.z - offset) * multiplier);
    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix * uMVMatrix * (vec4(position, 1));

   
}