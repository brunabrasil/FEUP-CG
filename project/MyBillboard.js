import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";


/**
    * MyBillboard
    * @constructor
    * @param scene - Reference to MyScene object
*/
export class MyBillboard extends CGFobject {
    constructor (scene, randomScale) {
        super(scene);
        this.randomScale = randomScale; //Boolean to randomize the scale of the billboard
        this.randomValue = 0; //Random value to scale the billboard
        this.quad = new MyQuad(this.scene);
        this.initMaterials(scene);
    }

    initMaterials(scene) {
        this.treeText = new CGFappearance(scene);
        const textures = ["images/billboardtree.png", "images/billboardtree2.png", "images/billboardtree3.png"];
        const index = Math.floor(Math.random() * textures.length);
        this.treeText.loadTexture(textures[index]);
        this.treeText.setTextureWrap('REPEAT', 'REPEAT');

        if(this.randomScale){
            this.randomValue = Math.random() * 2;
        }
    }

    display(x, y, z) {
        this.scene.pushMatrix();
        
        this.treeText.apply();
        this.scene.translate(x, y, z);

        //Position of the camera
        const cameraPos = this.scene.camera.getViewMatrix()

        //Front vector of the camera
        const front = vec3.fromValues(-cameraPos[2], -cameraPos[6], -cameraPos[10]);
        vec3.normalize(front, front);

        //Angle of the camera
        const angle = Math.atan2(-front[0], -front[2]);
      
        this.scene.rotate(angle, 0, 1, 0);
        this.scene.scale(15, 17, 15);

        if(this.randomScale){
            this.scene.scale(this.randomValue, 1, this.randomValue);
        }

        this.quad.display();
        this.scene.popMatrix();
    }
           
}
