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

    this.descendFlag = false;

    this.bird = bird;
    this.scaleFactor = 1;

    this.pickedEgg = undefined;
    this.eggs = []; //eggs nest
    this.carryingEgg = false;

    this.droppingEgg = undefined;
    this.eggStartTime = undefined;

    this.time = Date.now();
    this.clickTime = null;

  }
  
  update(val) {
    this.bird.update();

    this.position[0] += this.speed * Math.sin(this.orientationAngle) * this.scene.speedFactor; //x
    this.position[2] += this.speed * Math.cos(this.orientationAngle) * this.scene.speedFactor;//z

    if(this.droppingEgg != undefined){
      this.droppingEgg.update();
    }


  }
  setDroppingEgg(){
    this.droppingEgg = null;
  }

  moveBird(){
    const now = Date.now();
    const freq = 1;
    const period = 2 * Math.PI / freq;
    const elapsedTime = (now - this.time) / 1000; 
    const oscillation = Math.sin(elapsedTime * 2 + Math.PI / period);  

    if(!this.descendFlag){
      this.position[1] = 3+oscillation*0.3;
    }

    const elapsedPTime = (now - this.clickTime) / 1000;
    const descendTime = 1; // Duration of descend phase in seconds
    const ascendTime = 1; // Duration of ascend phase in seconds
  
    // Check if the bird is descending
    if (this.descendFlag) {
      if (elapsedPTime <= descendTime) {
        const descendHeight = 3; // Height to descend to (position[1] = 0)
        const descendSpeed = descendHeight / descendTime; // Speed to descend per second
        const descendDistance = descendSpeed * elapsedPTime; // Distance to descend based on elapsed time
        this.position[1] = 3 - descendDistance; // Update the bird's y position

      } else if (elapsedPTime <= descendTime + ascendTime) {
        const ascendHeight = 3; // Height to ascend to (position[1] = 3)
        const ascendSpeed = ascendHeight / ascendTime; // Speed to ascend per second
        const ascendElapsedTime = elapsedPTime - descendTime; // Elapsed time during the ascend phase
        const ascendDistance = ascendSpeed * ascendElapsedTime; // Distance to ascend based on elapsed time
        this.position[1] = ascendDistance; // Update the bird's y position
      } else {
        // End of descend and ascend phases
        this.descendFlag = false; // Reset the descend flag
      }
    }
  
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

  descend(){
    this.descendFlag = true;  
    this.clickTime = Date.now();
  }

  reset() {
    this.position = [0,-10,0];
    this.orientationAngle = 0;
    this.speed = 0;
    this.scene.speedFactor = 1;
  }

  checkEggCollision(eggs) {
    // Get the bird's position
    const birdPos = this.position;
    let closestDistance = 99999;
    let dist;
    if(this.position[1] < 0.5){
      // Check for collision with each egg
      for (const egg of eggs) {
        const eggPos = [egg.x, egg.y, egg.z];
    
        dist = vec3.distance(birdPos, eggPos);
        //pick up closest to bird
        if(dist < closestDistance){
          if (dist < 3) {
            this.pickedEgg = egg; // Store the reference to the picked up egg in the bird object
            closestDistance = dist;
          }
        }
      }

      // If the distance is within a tolerance margin, pick up the egg
      if (this.pickedEgg != undefined) {
        eggs.splice(eggs.indexOf(this.pickedEgg), 1); // Remove the egg from the scene
        return true; // Return true if an egg was picked up
      }
    }

    return false; // Return false if no egg was picked up
  }

  //add egg to nest
  addEgg(egg) {
    this.eggs.push(egg);
  }

  dropEgg(){
    if(this.pickedEgg){

      const distance = vec3.distance(this.position, [this.scene.nest.x, this.scene.nest.y, this.scene.nest.z]);
      if (distance > this.scene.nest.radius+2) return; //hmm nao sei se isto a bem nao
      this.droppingEgg = this.pickedEgg;
      let pos = this.scene.nest.getNestPosition().position;
      console.log("pos: ", pos)
      this.droppingEgg.setParabolicThrow(pos)
      this.pickedEgg = undefined;
    }
  }

  eggPosition(){
    this.pickedEgg.x = this.position[0];
    this.pickedEgg.y = this.position[1]-0.8;
    this.pickedEgg.z = this.position[2]+0.08;
  }
 
  display() {
    this.moveBird();

    // Draw the bird's egg
    if (this.droppingEgg != undefined) {
      this.scene.pushMatrix();
      this.droppingEgg.display();
      this.scene.popMatrix();
    }
    // Draw the bird's egg
    if (this.pickedEgg != undefined) {
      this.eggPosition();
      this.scene.pushMatrix();
      //this.scene.translate(this.pickedEgg.x, this.pickedEgg.y, this.pickedEgg.z); // Assuming the egg is positioned at the center of the base
      this.pickedEgg.display();
      this.scene.popMatrix();
    }

    this.scene.pushMatrix();
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.scene.scale(2, 2, 2);
    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.orientationAngle, 0, 1, 0);
    this.bird.display();
    this.scene.popMatrix();
  }
}