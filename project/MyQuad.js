import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, 0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			-0.5, -0.5, 0	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0, 2, 1,
            1, 2, 3,
			2, 0, 1,
			1, 3, 2
		];

		this.normals = [
			0, 0, 1,	// 0 front
			0, 0, 1,	// 1 front
			0, 0, 1,	// 2 front
			0, 0, 1,	// 3 front

			0, 0, -1,	// 0 back
			0, 0, -1,	// 1 back
			0, 0, -1,	// 2 back
			0, 0, -1,	// 3 back
		];

		this.texCoords = [
			0, 0,
			0, 1,
			1, 0,
			1, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		// this.initNormalVizBuffers();
	}

	updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

}

