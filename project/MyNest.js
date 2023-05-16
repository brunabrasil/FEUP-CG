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
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.eggs = [];
        this.eggPositions = [
          [0, 0, 0],
          [1, 0, 0],
          [0, 0, 1],
          [-1, 0, 0]
        ];
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
      
            let x = this.radius * Math.cos(theta) * Math.sin(beta * lat);
            let y = this.radius * Math.cos(beta * lat);
            let z = this.radius * Math.sin(theta) * Math.sin(beta * lat);
      
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
    addEgg(egg) {
      egg.x = this.x + this.eggPositions[this.eggs.length].x;
      egg.y = this.y + this.eggPositions[this.eggs.length].y;
      egg.z = this.z + this.eggPositions[this.eggs.length].z;
      this.eggs.push(egg);
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
