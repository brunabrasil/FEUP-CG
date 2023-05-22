import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
			1, 1, 0,	//2
			3, 1, 0,	//3

			0, 0, 0,	//4
			2, 0, 0,	//5
			1, 1, 0,	//6
			3, 1, 0		//7
		];

		this.indices = [
			0, 1, 2,
			1, 3, 2,
            0, 2, 1,
            1, 2, 3,

			4, 5, 6,
			5, 7, 6,
			4, 6, 5,
			5, 6, 7
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

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

