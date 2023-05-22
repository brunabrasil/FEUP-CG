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

        this.sphere = new MySphere(this.scene, 50, 50, 600, true);

        this.scene.pushMatrix();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.text.apply();
        
        this.sphere.display();
        this.scene.popMatrix();
        
    }
}
