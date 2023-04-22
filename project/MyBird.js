import {CGFobject, CGFappearance} from "../lib/CGF.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MySphere } from "./MySphere.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyCone } from "./MyCone.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyWing } from "./MyWing.js";


/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);

        this.smallTriangle = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.sphere = new MySphere(this.scene, 30, 30, 0.5, false);
        this.pyramid = new MyPyramid(this.scene, 30, 30);
        this.cylinder = new MyCylinder(this.scene, 30, 30);
        this.leftEye = new MySphere(this.scene, 30, 30, 0.1, false);
        this.rightEye = new MySphere(this.scene, 30, 30, 0.1, false);
        this.wing = new MyWing(this.scene);
        this.tail = new MyTriangleSmall(this.scene);
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

        //right wing
        this.scene.pushMatrix();
        //this.scene.rotate((Math.PI)/8,0, 0, 1);
        this.scene.translate(0.5, 0, 0.3, 1);
        this.scene.scale(0.25, 0.5, 0.25);
        this.wing.display();
        this.scene.popMatrix();

        //left wing
        this.scene.pushMatrix();
        //this.scene.rotate((Math.PI)/8,0, 0, 1);
        this.scene.translate(-0.5, 0, 0.3, 1);
        this.scene.scale(-0.25, 0.5, 0.25);
        this.wing.display();
        this.scene.popMatrix();

        //Sphere
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 1.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Bico
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 1.5);
        this.scene.scale(0.2, 0.2, 0.3);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.yellow.apply();
        this.pyramid.display();
        this.scene.popMatrix();
            
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.blue.apply();
        this.cylinder.display();
        this.scene.popMatrix(); 

        //right eye
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.8, 1.4);
        //this.scene.scale(0.3, 0.3, 0.3);
        this.black.apply();
        this.rightEye.display();
        this.scene.popMatrix(); 

        //left eye
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.8, 1.4);
        this.scene.scale(-1, 1, 1);
        this.yellow.apply();
        this.leftEye.display();
        this.scene.popMatrix(); 

        //tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6,1,0,0);
        this.scene.translate(0, 0, -0.77);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5, 0.75, 1);
        this.yellow.apply();
        this.tail.display();
        this.scene.popMatrix(); 
        
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

