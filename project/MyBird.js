import {CGFobject, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MySphere } from "./MySphere.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyWing } from "./MyWing.js";
import { MyTail } from "./MyTail.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

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
        this.head = new MySphere(this.scene, 30, 30, 0.5, false);
        this.body = new MySphere(this.scene, 30, 30, 0.5, false);
        this.pyramid = new MyPyramid(this.scene, 30, 30);
        this.leftEye = new MySphere(this.scene, 30, 30, 0.1, false);
        this.rightEye = new MySphere(this.scene, 30, 30, 0.1, false);
        this.wing = new MyWing(this.scene);
        this.tail = new MyTail(this.scene);
        this.foot = new MyUnitCubeQuad(this.scene);

        this.time = Date.now();
        this.amplitude = 0.3;

        this.featherText = new CGFtexture(this.scene, "images/feathers.jpg");
        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
        this.bodyAppearance.setSpecular(0.8, 0.8, 0.8, 1);

        this.bodyAppearance.setTexture(this.featherText);
        this.bodyAppearance.setTextureWrap('REPEAT');

        this.eyeText = new CGFtexture(this.scene, "images/chicken-eye.jpeg");
        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setTexture(this.eyeText);
        //this.eyeAppearance.setTextureWrap('REPEAT');
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

        //Red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.5,0,0, 1);
        this.red.setDiffuse(0, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);


        //Red
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(0.5,0,0, 1);
        this.red.setDiffuse(0, 0, 0, 1);
        this.red.setSpecular(1, 0, 0, 1);
        this.red.setShininess(10.0);


        //Orange
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1, 0.5, 0, 1);
        this.orange.setDiffuse(1, 0.5, 0, 1);
        this.orange.setSpecular(1, 0.5, 0, 1);
        this.orange.setShininess(10.0);
    }
	
	display() {
 
        this.initMaterials();
        const now = Date.now();
        const freq = 1;
        const period = (2 * Math.PI / freq);
        const elapsedTime = ((now - this.time) / 1000)/2;
        let speedWing = 1 + this.scene.movingBird.speed;
        const oscillation = Math.sin(elapsedTime * 2 * this.scene.speedFactor * speedWing + Math.PI / period);

        this.scene.pushMatrix();
        this.scene.translate(0.2,-0.5, 0.1);
        this.scene.scale(0.07,0.4,0.06);
        this.orange.apply();
        this.foot.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2,-0.5, 0.1);
        this.scene.scale(0.07,0.4,0.06);
        this.orange.apply();

        this.foot.display();
        this.scene.popMatrix();

        //right wing
        this.scene.pushMatrix();
        this.scene.rotate(oscillation * Math.PI/3 / 4, 0, 0, 1);
        this.scene.translate(0.5, 0, 0.3, 1);
        this.scene.scale(0.25, 0.5, 0.25);
        this.yellow.apply();

        this.wing.display();
        this.scene.popMatrix();

        //left wing
        this.scene.pushMatrix();
        this.scene.rotate(oscillation * -Math.PI/3 / 4, 0, 0, 1);
        this.scene.translate(-0.5, 0, 0.3, 1);
        this.scene.scale(-0.25, 0.5, 0.25);
        this.wing.display();
        this.scene.popMatrix();

        //right eye
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0.8, 1.4);
        this.black.apply();
        this.rightEye.display();
        this.scene.popMatrix(); 

        //left eye
        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0.8, 1.4);
        this.black.apply();
        this.leftEye.display();
        this.scene.popMatrix(); 

        //Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 1.1);
        this.bodyAppearance.apply();
        this.head.display();
        this.scene.popMatrix();

        //Bico
        this.scene.pushMatrix();
        this.scene.translate(0, 0.6, 1.5);
        this.scene.scale(0.2, 0.2, 0.3);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.yellow.apply();
        this.pyramid.display();
        this.scene.popMatrix();
            
    
        //tail
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/6,1,0,0);
        this.scene.translate(0, 0, -0.77);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.tail.display();
        this.scene.popMatrix(); 

        //Body
        this.scene.pushMatrix();
        this.scene.scale(1, 1, 1.5);
        this.scene.translate(0, 0, 0.3);
        this.bodyAppearance.apply();
        this.body.display();
        this.scene.popMatrix(); 
	}

    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

