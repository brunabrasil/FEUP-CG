import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { CGFobject } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
* MyPanorama
* @constructor
*/
export class MyPanorama extends CGFobject {
    constructor(scene, text) {
        super(scene);
        this.text = text;

    }

    display(){

        this.sphere = new MySphere(this.scene, 30, 30, 200);

        this.scene.pushMatrix();
        this.text.apply();

        this.sphere.display();
        this.scene.popMatrix();
        
    }
}
