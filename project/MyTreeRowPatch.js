import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";


export class MyTreeRowPatch extends CGFobject {
    constructor (scene) {
        super(scene);
        this.trees = [];
        
        this.initBillboards(scene);
    }

    initBillboards(scene) {  
        let z = 0;
        let y = -13;
        let x = 0;
        for(let i = 0; i < 6; i++){
            let randomX = Math.random()*(4-2) + 2;
            let randomZ = Math.random()*(4-2) + 2;
            let tree = new MyBillboard(scene, true);
            this.trees.push({tree: tree, x: x + randomX, y: y, z: z + randomZ}); 
            x += 10;
        }
    }


    display() {
        this.scene.pushMatrix();
        for(let i = 0; i < this.trees.length; i++){
            this.trees[i].tree.display(this.trees[i].x, this.trees[i].y, this.trees[i].z);
        }
        this.scene.popMatrix();
    }
           
}
