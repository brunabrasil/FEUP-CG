import {CGFobject, CGFappearance, CGFtexture} from "../lib/CGF.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";


/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);

        this.smallTriangle = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        
        this.featherText = new CGFtexture(this.scene, "images/feather-red.jpg");
        this.bodyAppearance = new CGFappearance(this.scene);
        this.bodyAppearance.setTexture(this.featherText);
        this.bodyAppearance.setTextureWrap('REPEAT');
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

        //Parallelogram
        this.scene.pushMatrix();
        //this.scene.scale(0.25, 0.5, 1);
        //this.scene.translate(0.5, 0, 0.5);
        this.scene.rotate((Math.PI)/2, 1, 0, 0);
        this.scene.rotate((Math.PI)/4, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangle
        this.scene.pushMatrix();
        this.scene.translate(2.02,-0.35, 2.12);
        this.scene.rotate(-(Math.PI)/6, 0, 0, 1);
        this.scene.rotate((Math.PI)/4, 0, 1, 0);
        this.scene.rotate(-(Math.PI)/2, 1, 0, 0);
        this.smallTriangle.display();
        this.scene.popMatrix();
        
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

