import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyMovingBird } from "./MyMovingBird.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyNest } from "./MyNest.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

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
    this.nest = new MyNest(this, 20, 7, 4);
    this.treeGroupPatch = new MyTreeGroupPatch(this);
    this.treeRowPatch = new MyTreeRowPatch(this);
    this.eggs = [];

    // Loop to create each egg
    for (let i = 0; i < 4; i++) {
      const egg = new MyBirdEgg(this, 10, 10, 1, 1, 1.7);
      this.eggs.push(egg);
    }

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.speedFactor = 1;
    this.acceleration = 0;

    this.enableTextures(true);
    this.setUpdatePeriod(20);

    this.earthText = new CGFtexture(this, "images/earth.jpg");
    this.earth = new CGFappearance(this);
    this.earth.setTexture(this.earthText);
    this.earth.setTextureWrap('REPEAT', 'REPEAT');

    this.panorama4 = new CGFappearance(this);
    this.panorama4.loadTexture("images/panorama4.jpg");
    this.panorama4.setTextureWrap('REPEAT', 'REPEAT');
    
    this.nText = new CGFtexture(this, "images/nest.png");
    this.nestText = new CGFappearance(this);
    this.nestText.setTexture(this.nText);
    this.nestText.setTextureWrap('REPEAT', 'REPEAT');

    this.panorama = new MyPanorama(this, this.panorama4);

  }
  initLights() {
    this.lights[0].setPosition(1, 1, 1, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update(); 

    this.lights[1].setPosition(10, 10, -10, 20);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setAmbient(5.0, 5.0, 5.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update(); 

    this.lights[2].setPosition(-5, 0, 5, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setAmbient(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
    this.lights[2].update(); 

  }
  initCameras() {
    this.camera = new CGFcamera(
      0.9,
      0.9,
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
    if(this.movingBird.pickedEgg == undefined){
      const eggPickedUp = this.movingBird.checkEggCollision(this.eggs);
      if (eggPickedUp) {
        this.movingBird.addEgg(this.movingBird.pickedEgg);
      }
    }
    this.nest.update();

    this.movingBird.update((this.speedFactor + this.acceleration));
    
  }
  display() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.applyViewMatrix();

    if (this.displayAxis) this.axis.display();

    this.eggs.forEach(egg => {
      this.pushMatrix();
      egg.display();
      this.popMatrix();
    });
    
    this.pushMatrix();
    this.nestText.apply();
    this.nest.display();  
    this.popMatrix();

    this.pushMatrix();
    this.movingBird.display();  
    this.popMatrix();

    this.pushMatrix();
    this.terrain.display(); 
    this.panorama.display();
    this.treeGroupPatch.display();
    this.treeRowPatch.display();
    this.popMatrix(); 
    
  }
  
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      //this.acceleration += 0.05;
      this.movingBird.accelerate(0.03);
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
      this.movingBird.accelerate(-0.03);
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
    if (this.gui.isKeyPressed("KeyP")) {
      text+=" P ";
      keysPressed=true;
      this.movingBird.descend();
    }
    if (this.gui.isKeyPressed("KeyO")) {
      text+=" O ";
      keysPressed=true;
      this.movingBird.dropEgg();
    }
    if (keysPressed)
      console.log(text);
    }
  
}
