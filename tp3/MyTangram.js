import {CGFobject, CGFappearance} from '../lib/CGF.js';
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
        this.green.setAmbient(0, 1, 0, 1);
        this.green.setDiffuse(0, 0, 0, 1);
        this.green.setSpecular(0, 1, 0, 1);
        this.green.setShininess(10.0);

        //Blue
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0, 0, 1, 1);
        this.blue.setDiffuse(0, 0, 0, 1);
        this.blue.setSpecular(0, 0, 1, 1);
        this.blue.setShininess(10.0);
        //Orange
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1, 0.6471, 0, 1);
        this.orange.setDiffuse(0, 0, 0, 1);
        this.orange.setSpecular(1, 0.6471, 0, 1);
        this.orange.setShininess(10.0);
        //Pink
        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1, 203/255, 219/255, 1);
        this.pink.setDiffuse(0, 0, 0, 1);
        this.pink.setSpecular(1, 203/255, 219/255, 1);
        this.pink.setShininess(10.0);
        //Red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1);
        this.red.setDiffuse(0, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);
        //Purple
        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(153/255, 51/255, 153/255, 1);
        this.purple.setDiffuse(0, 0, 0, 1);
        this.purple.setSpecular(153/255, 51/255, 153/255, 1);
        this.purple.setShininess(10.0);
        //Yellow
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(0, 0, 0, 1);
        this.yellow.setSpecular(1, 1, 0, 1);
        this.yellow.setShininess(10.0);
    }
	
	display() {

        this.initMaterials();
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
        this.green.apply();
        this.diamond.display();
        this.scene.popMatrix();
      
        
        //Blue Triangle
        this.scene.pushMatrix();
        this.blue.apply();
        this.scene.translate(0, Math.sqrt(2), 0); //CENTRAR?
        this.scene.rotate((-3*Math.PI)/4, 0, 0, 1);
        this.blueTriangle.display();
        this.scene.popMatrix();

        //Orange Triangle
        this.scene.pushMatrix();
        this.orange.apply();
        this.scene.translate(0, Math.sqrt(2), 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.orangeTriangle.display();
        this.scene.popMatrix();
    
        //Pink Triangle
        this.scene.pushMatrix();
        this.pink.apply();
        this.scene.translate(0, 2*Math.sqrt(2), 0);
        this.scene.rotate(5*(Math.PI)/4, 0, 0, 1);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        //Yellow Parallelogram
        this.scene.pushMatrix();
        this.yellow.apply();
        this.scene.scale(1, -1, 1);
        this.scene.translate(Math.sqrt(2)/2, 0, 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        //Red Triangle
        this.scene.pushMatrix();
        this.red.apply();
        this.scene.translate(-2*Math.sqrt(2)/2, -Math.sqrt(2)/2, 0);
        this.scene.rotate(-3*(Math.PI)/4, 0, 0, 1);
        this.redTriangle.display();
        this.scene.popMatrix();

        //Purple Triangle
        this.scene.pushMatrix();
        this.purple.apply();
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

