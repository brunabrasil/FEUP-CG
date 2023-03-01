import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

        this.diamond = new MyDiamond(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.yellowParallelogram = new MyParallelogram(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
	}

    initMaterials() {
        //Green
        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.1, 0.35, 0.1, 1);
        this.green.setDiffuse(0.45, 0.55, 0.45, 1);
        this.green.setSpecular(0.45, 0.55, 0.45, 1);
        this.green.setShininess(10.0);

        //Blue
        //Orange
        //Pink
        //Red
        //Purple
        //Yellow
    }
	
	display() {
        //Green Square
        this.scene.pushMatrix();
    
        var trans = [ 
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0, 
            0.0, 0.0, 1.0, 0.0,
            0.0, -Math.sqrt(1/2), 0.0, 1.0
        ];
    
        var rot = [
            Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
            -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ];
    
        this.scene.multMatrix(trans);
        this.scene.multMatrix(rot);
        // this.green.apply();
        this.diamond.display();
        this.scene.popMatrix();
      
        
        //Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0); //CENTRAR?
        this.scene.rotate((-3*Math.PI)/4, 0, 0, 1);
        this.blueTriangle.display();
        this.scene.popMatrix();

        //Orange Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.orangeTriangle.display();
        this.scene.popMatrix();
    
        //Pink Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2*Math.sqrt(2), 0);
        this.scene.rotate(5*(Math.PI)/4, 0, 0, 1);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.scale(1, -1, 1);
        this.scene.translate(Math.sqrt(2)/2, 0, 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        //Red Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2*Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
        this.scene.rotate(-3*(Math.PI)/4, 0, 0, 1);
        this.redTriangle.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-2*Math.sqrt(2)/2, -3*Math.sqrt(2)/2, 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.purpleTriangle.display();
        this.scene.popMatrix();
	}

    updateBuffers() {}

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.orangeTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
    }
}

