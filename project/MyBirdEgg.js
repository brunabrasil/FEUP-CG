import { CGFobject } from '../lib/CGF.js';

/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param radius - radius of the sphere
 * @param scaleTop - scale factor for the top hemisphere
 * @param scaleBottom - scale factor for the bottom hemisphere
 */
export class MyBirdEgg extends CGFobject {
  constructor(scene, slices, stacks, radius, scaleTop, scaleBottom) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    this.scaleTop = scaleTop;
    this.scaleBottom = scaleBottom;
    this.x = Math.floor(Math.random() * 5) + 1;
    this.z = Math.floor(Math.random() * 5) + 1;
    this.rotationX = Math.floor(Math.random() * 2);
    this.rotationY = Math.floor(Math.random() * 2);
    this.rotationZ = Math.floor(Math.random() * 2);
    console.log(this.rotationX);
    console.log(this.rotationY);

    console.log(this.rotationZ);

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 2 * Math.PI / this.slices;
    var beta = Math.PI / this.stacks;

    for (var lat = 0; lat <= this.stacks; lat++) {
      for (var long = 0; long <= this.slices; long++) {
        let theta = long * alpha;

        let x = this.radius * Math.cos(theta) * Math.sin(beta * lat);
        let y = this.radius * Math.cos(beta * lat);
        let z = this.radius * Math.sin(theta) * Math.sin(beta * lat);

        if (lat <= this.stacks / 2) {
          y *= this.scaleTop;
        } else {
          y *= this.scaleBottom;
        }

        this.vertices.push(x, y, z);
        this.normals.push(x, y, z);

        this.texCoords.push(long / this.slices, lat / this.stacks);
      }
    }

    for (var lat = 0; lat < this.stacks; lat++) {
      for (var long = 0; long < this.slices; long++) {
        let first = lat * (this.slices + 1) + long;
        let second = first + this.slices + 1;

        this.indices.push(second, first, first + 1);
        this.indices.push(second + 1, second, first + 1);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  /**
   * Called when user interacts with GUI to change object's complexity.
   * @param {integer} complexity - changes number of slices
   */
  updateBuffers(complexity) {
    this.slices = complexity * 2; //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}
