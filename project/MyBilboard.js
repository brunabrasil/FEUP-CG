import {CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";


/**
 * MyBilboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBilboard extends CGFobject {
	constructor(scene) {
		super(scene);

        this.quad = new MyQuad(this.scene);
	}

    initMaterials() {
        //Yellow
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(0, 0, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);

        //Blue
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0, 0, 1, 1);
        this.blue.setDiffuse(0, 0, 0, 1);
        this.blue.setSpecular(0, 0, 1, 1);
        this.blue.setShininess(10.0);

        //Black
        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0, 0, 0, 1);
        this.black.setDiffuse(0, 0, 0, 1);
        this.black.setSpecular(0, 0, 1, 1);
        this.black.setShininess(10.0);
    }
	
	display() {
        this.initMaterials();

        //Quaad
        this.scene.pushMatrix();
        //this.scene.scale(0.25, 0.5, 1);
        //this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.quad.display();
        this.scene.popMatrix();
        
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

