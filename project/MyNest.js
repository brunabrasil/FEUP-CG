import {CGFobject} from '../lib/CGF.js';
/**
* MyNest
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyNest extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.x = 25;
        this.y = 9.5;
        this.z = -5;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.eggs = [];
        this.eggPositions = [];

        this.eggPositions.push({position: [5,-10,23], occupied: false});
        this.eggPositions.push({position: [5,-10,25], occupied: false});
        this.eggPositions.push({position: [6,-10,24], occupied: false});
        this.eggPositions.push({position: [3,-10,23], occupied: false});

        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
      
        var alpha = 2 * Math.PI / this.slices;
        var beta = Math.PI / (2 * this.stacks);
      
        for (var lat = 0; lat <= this.stacks; lat++) {
          for (var long = 0; long <= this.slices; long++) {
            let theta = long * alpha;
      
            let x = this.radius * Math.cos(theta) * Math.sin(beta * lat) + this.x;
            let y = this.radius * Math.cos(beta * lat) + this.y;
            let z = this.radius * Math.sin(theta) * Math.sin(beta * lat) + this.z;
      
            this.vertices.push(z, y, x);
            this.normals.push(x, y, z);

            this.normals.push(x, y, z);
            this.normals.push(-x, -y, -z);

            this.texCoords.push(long / this.slices, lat / this.stacks);
          }
        }
      
        for (var lat = 0; lat < this.stacks; lat++) {
          for (var long = 0; long < this.slices; long++) {
            let first = lat * (this.slices + 1) + long;
            let second = first + this.slices + 1;
      
            this.indices.push(second, first, first + 1);
            this.indices.push(second + 1, second, first + 1);

            this.indices.push(second, first + 1, first);
            this.indices.push(second + 1, first + 1, second);
          }
        }
      
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    update(){
      this.eggs.forEach(egg => {
        egg.update();
      });
    }
    addEgg(egg) {
      this.eggs.push(egg);
    }

    getNestPosition(){
      for (const position of this.eggPositions) {
        if (!position.occupied) {
          position.occupied = true;
          return position;
        }
      }
      return null;
    }

    display(){
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI, 0, 0, 1);
      super.display();
      this.scene.popMatrix();

      this.eggs.forEach(egg => {
        this.scene.pushMatrix();
        egg.display();
        this.scene.popMatrix();
      });
      
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = complexity*2; //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    
}


