import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

	}

	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,  //0
			0.5, -0.5, 0.5,	  //1
			-0.5, 0.5, 0.5,	  //2
			0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,   //7

			-0.5, -0.5, 0.5,  //8
			0.5, -0.5, 0.5,	  //9
			-0.5, 0.5, 0.5,	  //10
			0.5, 0.5, 0.5,    //11
            -0.5, -0.5, -0.5, //12
            0.5, -0.5, -0.5,  //13
            -0.5, 0.5, -0.5,  //14
            0.5, 0.5, -0.5,   //15

			-0.5, -0.5, 0.5,  //16
			0.5, -0.5, 0.5,	  //17
			-0.5, 0.5, 0.5,	  //18
			0.5, 0.5, 0.5,    //19
            -0.5, -0.5, -0.5, //20
            0.5, -0.5, -0.5,  //21
            -0.5, 0.5, -0.5,  //22
            0.5, 0.5, -0.5    //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			//first
			//front
			0, 1, 2,
			3, 2, 1,

			//right
            1, 5, 3,
            7, 3, 5,

			//back
            5, 4, 7,
            6, 7, 4,

			//left
            2, 4, 0,
            4, 2, 6,

			//top
            2, 3, 6,
            7, 6, 3,

			//bottom
            5, 1, 4,
            4, 1, 0,

			//second
			//front
            8, 9, 10,
            11, 10, 9,

            //right
            9, 13, 11,
            15, 11, 13,

            //back
            13, 12, 15,
            14, 15, 12,

            //left
            10, 12, 8,
            12, 10, 14,

            //top
            10, 11, 14,
            15, 14, 11,
            
            //bottom
            13, 9, 12,
            12, 9, 8,

			// third round of vertices
            //front
            16, 17, 18,
            19, 18, 17,

            //right
            17, 21, 19,
            23, 19, 21,

            //back
            21, 20, 23,
            22, 23, 20,

            //left
            18, 20, 16,
            20, 18, 22,

            //top
            18, 19, 22,
            23, 22, 19,

            //bottom
            21, 17, 20,
            20, 17, 16
		];

		this.normals = [
			-1, 0, 0,   // 0
            1, 0, 0,    // 1
            -1, 0, 0,   // 2
            1, 0, 0,    // 3
            -1, 0, 0,   // 4
            1, 0, 0,    // 5
            -1, 0, 0,   // 6
            1, 0, 0,    // 7
            
            0, -1, 0,   // 8
            0, -1, 0,   // 9
            0, 1, 0,    // 10
            0, 1, 0,    // 11
            0, -1, 0,   // 12
            0, -1, 0,   // 13
            0, 1, 0,    // 14
            0, 1, 0,    // 15

            0, 0, 1,    // 8
            0, 0, 1,    // 9
            0, 0, 1,    // 10
            0, 0, 1,    // 11
            0, 0, -1,   // 12
            0, 0, -1,   // 13
            0, 0, -1,   // 14
            0, 0, -1,   // 15
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

