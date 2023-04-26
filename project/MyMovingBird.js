import {CGFobject, CGFappearance} from "../lib/CGF.js";

import { MyBird } from './MyBird.js';

export class MyMovingBird extends CGFobject {
  constructor(scene, orientationAngle, position) {

    let bird = new MyBird(scene);

    super(scene, orientationAngle, position);

    this.orientationAngle = orientationAngle; //ângulo em torno do eixo YY
    this.speed = 0;
    this.position = position;
    this.rotationLeft = false;
    this.rotationRight = false;
    this.bird = bird;
    this.scaleFactor = 1;
  }
  update(t) {
    this.scene.speedFactor = t;
    this.position[0] += this.speed * Math.sin(this.orientationAngle); //x
    this.position[2] += this.speed * Math.cos(this.orientationAngle);//z
  }
  turn(val) {
    val < 0 ? this.rotationRight = true : this.rotationLeft = true;
    this.orientationAngle += val;
  }
  accelerate(val) {
    if(this.speed + val < 0){
      this.speed = 0;
      this.scene.speedFactor = 1;
    }
    else {
      this.speed += val;
    }

  }
  reset() {
      this.position = [0,3,0];
      this.orientationAngle = 0;
      this.speed = 0;
      this.scene.speedFactor = 1;
  }
  display() {
    this.scene.pushMatrix()

    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.orientationAngle, 0, 1, 0);
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bird.display();
    this.scene.popMatrix();
  }
}