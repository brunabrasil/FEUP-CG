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
            
        //Tail
        this.scene.pushMatrix();
        this.scene.scale(0.25, 1, 1);
        this.tail.display();
        this.scene.popMatrix();  
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

