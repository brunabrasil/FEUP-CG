import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

// /**
//  * MyTerrain
//  * @constructor
//  * @param scene - Reference to MyScene object
//  */
// export class MyTerrain extends CGFobject {
// 	constructor(scene) {
// 		super(scene);

//         this.plane = new MyPlane(scene, 30);
// 		this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
//         this.terrainShader.setUniformsValues({ uSampler: 0 });
//         this.terrainShader.setUniformsValues({ uSampler2: 2 });
//         this.terrainShader.setUniformsValues({ uSampler3: 3 });
//         this.initMaterials(scene);
//         this.initShaders(scene);
// 	}

// 	updateTextures(textures) {
// 		//this.terrainTex = textures[0];
// 		//this.terrainMap = textures[1];

// 		//this.terrainShader.setUniformsValues({ terrainTex: 0 });
// 		//this.terrainShader.setUniformsValues({ terrainMap: 1 });
//         //this.terrainShader.setUniformsValues({ uSampler2: 0 });
// 	}

//     initShaders(scene) {
// 		//this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
//         //this.terrainShader.setUniformsValues({ terrainMap: 1, offset: 0.2, multiplier: 0.3 });
//     }


//     initMaterials(scene) { 
// 		this.textureHeightmap = new CGFtexture(scene, "images/heightmap.jpg");
//         this.altimetry = new CGFtexture(scene, "images/altimetry.png");

//         this.appearance = new CGFappearance(scene);
//         this.appearance.loadTexture("images/terrain.jpg");
//         this.appearance.setTextureWrap('REPEAT', 'REPEAT');
//         //this.appearance.setTexture(this.textureTerrain);
//         //this.appearance.setTextureWrap('REPEAT', 'REPEAT');

//     }

//     display() {	
//         this.scene.setActiveShader(this.terrainShader);
//         this.textureHeightmap.bind(1);
//         this.altimetry.bind(2);

//         this.scene.pushMatrix();
//         this.appearance.apply();
// 		// this.scene.rotate(-Math.PI/2, 1, 0, 0);
//         this.plane.display();
//         this.scene.popMatrix();

//         this.scene.setActiveShader(this.scene.defaultShader);
//     }

    
// }

class MyTerrain extends CGFobject {
    constructor(scene) {
            super(scene);

            this.plane = new MyPlane(scene, 30);

            this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    }

    /**
     * Set Method for changing current textures
     * @param {Array<Object>} textures Array with 2 textures which are applied to the terrain
     */
    updateTextures(textures) {
            this.terrainTex = textures[0];
            this.terrainMap = textures[1];

            this.terrainShader.setUniformsValues({ terrainTex: 0 });
            this.terrainShader.setUniformsValues({ terrainMap: 1 });
    }

    /**
     * Displays the terrain in a certain position
     */
    display() {
            this.scene.pushMatrix();
            this.scene.setActiveShader(this.terrainShader);
            this.terrainTex.bind(0);
            this.terrainMap.bind(1);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.scene.scale(50, 50, 1);
            this.plane.display();
            this.scene.popMatrix();
            // -- Shader is reset in MyScene -- //
    }
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
            this.plane.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
            this.plane.disableNormalViz();
    }
}