import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyBillboard extends CGFobject {
    constructor (scene, randomScale) {
        super(scene);
        this.randomScale = randomScale;
        this.randomValue = 0;
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
      
        const cameraPos = this.scene.camera.getViewMatrix();

        const front = vec3.fromValues(-cameraPos[2], -cameraPos[6], -cameraPos[10]);
      
        vec3.normalize(front, front);
        const angle = Math.atan2(-front[0], -front[2]);
      
        this.scene.rotate(angle, 0, 1, 0);
    
        this.scene.scale(10, 10, 10);

        if(this.randomScale){
            this.scene.scale(this.randomValue, 1, this.randomValue);
        }

        this.quad.display();
        this.scene.popMatrix();
    }
           
}
