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

        this.left = new MyTriangleSmall(this.scene);
        this.middle = new MyTriangleSmall(this.scene);
        this.right = new MyTriangleSmall(this.scene);
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
    }
	
	display() {
        this.initMaterials();


        //Left
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-(Math.PI)/6, 0, 0, 1);
        this.scene.scale(0.25, 1, 1);
        //this.scene.rotate((Math.PI)/2, 1, 0, 0);
        //this.yellow.apply();
        //this.left.display();
        this.scene.popMatrix();
            
        //Middle
        this.scene.pushMatrix();
        this.scene.scale(0.25, 1, 1);
        this.middle.display();
        this.scene.popMatrix(); 

        //Right
        //this.scene.pushMatrix();
        //this.scene.translate(0.3, 0.8, 1.4);
        //this.scene.scale(-1, 1, 1);
        //this.yellow.apply();
        //this.right.display();
        //this.scene.popMatrix(); 
        
	}


    enableNormalViz() {
        this.parallelogram.enableNormalViz();
        this.smallTriangle.enableNormalViz();
    }
}

