import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);

        this.plane = new MyPlane(scene, 30);

        this.initMaterials(scene);
        this.initShaders(scene);
	}

    initShaders(scene) {
		//this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        //this.terrainShader.setUniformsValues({ terrainMap: 1, offset: 0.2, multiplier: 0.3 });
    }


    initMaterials(scene) { 
		this.textureHeightmap = new CGFtexture(scene, "images/heightmap.jpg");
        this.altimetry = new CGFtexture(scene, "images/altimetry.png");

        this.appearance = new CGFappearance(scene);
        this.appearance.loadTexture("images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        //this.appearance.setTexture(this.textureTerrain);
        //this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
        this.scene.setActiveShader(this.terrainShader);
        this.textureHeightmap.bind(1);
        this.altimetry.bind(2);

        this.scene.pushMatrix();
        this.appearance.apply();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    
}