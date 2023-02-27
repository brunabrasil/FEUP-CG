import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import {CGFappearance} from '../lib/CGF.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.tangram = new MyTangram(this);
    this.cube = new MyUnitCube(this);
    this.quad = new MyQuad(this);
    this.unitCubeQuad = new MyUnitCubeQuad(this);

    // this.diamond = new MyDiamond(this);
    // this.triangle = new MyTriangle(this);
    // this.parallelogram = new MyParallelogram(this);
    // this.triangleSmall = new MyTriangleSmall(this);
    // this.triangleBig = new MyTriangleBig(this);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    // this.displayDiamond = true;
    // this.displayTriangle = false;
    // this.displayParallelogram = false;
    // this.displayTriangleBig = true;
    // this.displayTriangleSmall = false;
    this.displayTangram = true;
    this.displayCube = true;
    this.displayQuad = true;
    this.displayCubeQuad = true;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    // this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    if (this.displayTangram) {
        this.pink = new CGFappearance(this);
        this.pink.setColor(255/255,192/255,203/255,1);
        
        this.pushMatrix();
        this.translate(4, 0.05, 5);
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.tangram.display();
        this.popMatrix();
    }
    // if (this.displayCube) {
    //     this.pushMatrix();
    //     this.scale(8,8,8);
    //     this.translate(0.5, -0.5, 0.5);
    //     this.pink.apply();
    //     this.cube.display();
    //     this.popMatrix();
    // } 


    if(this.displayCubeQuad) {
      this.pushMatrix();
      this.scale(8,8,8);
      this.translate(0.5, -0.5, 0.5);
      this.pink.apply();
      this.unitCubeQuad.display();
      this.popMatrix();
    }
    
    // ---- END Primitive drawing section



  }
}
