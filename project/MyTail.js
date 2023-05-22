import {CGFobject, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTail
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTail extends CGFobject {
	constructor(scene) {
		super(scene);
        this.tail = new MyTriangleSmall(this.scene);
	}

    initMaterials() {
        //Yellow
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(0, 0, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);
    }
	
	display() {
        this.initMaterials();
<<<<<<< HEAD
=======
            
>>>>>>> 1667f2c7992dc64e1eb634f4e13f7c98d31d3bf6
        //Tail
        this.scene.pushMatrix();
        this.scene.scale(0.25, 1, 1);
        this.tail.display();
<<<<<<< HEAD
        this.scene.popMatrix(); 
=======
        this.scene.popMatrix();  
>>>>>>> 1667f2c7992dc64e1eb634f4e13f7c98d31d3bf6
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

