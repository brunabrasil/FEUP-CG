import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";

import { MyBird } from "./MyBird.js";
import { MyMovingBird } from "./MyMovingBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MySphere } from "./MySphere.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
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
    this.movingBird = new MyMovingBird(this, 0, [0,3,0]);
    this.terrain = new MyTerrain(this);
    this.nest = new MyNest(this, 10, 7);
    /* this.egg = new MyBirdEgg(this, 10, 10, 1, 1, 1.7);
    this.egg2 = new MyBirdEgg(this, 10, 10, 1, 1, 1.7); */

    this.eggs = [];

    // Loop to create each egg
    for (let i = 0; i < 4; i++) {
      const egg = new MyBirdEgg(this, 10, 10, 1, 1, 1.7);
      this.eggs.push(egg);
    }
    //Objects connected to MyInterface
    this.displayAxis = true;

    this.speedFactor = 1;
    this.acceleration = 0;

    this.enableTextures(true);

    this.setUpdatePeriod(60);
    // this.texture = new CGFtexture(this, "images/terrain.jpg");
    // this.appearance = new CGFappearance(this);
    // this.appearance.setTexture(this.texture);
    // this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthText = new CGFtexture(this, "images/earth.jpg");
    this.earth = new CGFappearance(this);
    this.earth.setTexture(this.earthText);
    this.earth.setTextureWrap('REPEAT', 'REPEAT');

    this.panoramaText = new CGFtexture(this, "images/panorama4.jpg");
    this.panorama4 = new CGFappearance(this);
    this.panorama4.setTexture(this.panoramaText);
    this.panorama4.setTextureWrap('REPEAT', 'REPEAT');

    this.nText = new CGFtexture(this, "images/nest2.png");
    this.nestText = new CGFappearance(this);
    this.nestText.setTexture(this.nText);
    this.nestText.setTextureWrap('REPEAT', 'REPEAT');

    this.eText = new CGFtexture(this, "images/egg.png");
    this.eggText = new CGFappearance(this);
    this.eggText.setTexture(this.eText);
    this.eggText.setTextureWrap('REPEAT', 'REPEAT');

    this.time = Date.now();
    this.amplitude = 0.3;

    this.panorama = new MyPanorama(this, this.panorama4);

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(10, 10, 10, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.5,
      0.5,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(10, 10, 10, 1.0);
    this.setDiffuse(1, 1, 1, 1.0);
    this.setSpecular(1, 1, 1, 1.0);
    this.setShininess(10.0);
  }
  update() {
    this.checkKeys();
    this.movingBird.update((this.speedFactor + this.acceleration));
    
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

    // ---- BEGIN Primitive drawing section

    //this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.panorama.display();

    const now = Date.now();
    const freq = 1;
    const period = 2 * Math.PI / freq;
    const elapsedTime = (now - this.time) / 1000;
    const oscillation = Math.sin(elapsedTime * 2 + Math.PI / period);    
    

    this.eggs.forEach(egg => {
      this.pushMatrix();
      this.translate(egg.x,0,egg.z);
      this.scale(0.3, 0.3, 0.3);
      this.rotate(Math.PI/3, egg.rotationX,egg.rotationY,egg.rotationZ); //que angulo usar? tb altera lo de forma random??
      this.eggText.apply();
      egg.display();
      this.popMatrix();
    });
    
    this.pushMatrix();
    this.rotate(Math.PI, 0, 0, 1);
    this.nestText.apply();
    this.nest.display();  
    this.popMatrix();

    this.pushMatrix();
    this.translate(0, oscillation*this.amplitude, 0);
    this.movingBird.display();  
    this.popMatrix();

    this.terrain.display();  

    // ---- END Primitive drawing section
  }
  
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.acceleration += 0.1;
      this.movingBird.accelerate(0.1);
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
      if(this.acceleration > 0){
        this.acceleration -= 0.1;
      }
      else {
        this.acceleration = 0;

      }
      this.movingBird.accelerate(-0.1);
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      keysPressed=true;
      this.movingBird.turn(0.1);
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      keysPressed=true;
      this.movingBird.turn(-0.1);
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text+=" R ";
      keysPressed=true;
      this.acceleration = 0;
      this.movingBird.reset();
    }
    if (keysPressed)
      console.log(text);
    }
  
}
