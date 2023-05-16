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
    this.eggs = [];
    this.carryingEgg = false;
    this.droppingEgg = false;
    this.eggStartTime = undefined;

    this.time = Date.now();
    this.clickTime = null;

  }
  update(t) {

    this.position[0] += this.speed * Math.sin(this.orientationAngle) * this.scene.speedFactor; //x
    this.position[2] += this.speed * Math.cos(this.orientationAngle) * this.scene.speedFactor;//z
  

    if (this.droppingEgg) {
      const t = (performance.now() - this.eggStartTime) / 1000; // time in seconds
      const g = -9.8; // gravity in m/s^2
      const v0 = 3; // initial velocity in m/s (adjust as needed)
      const x = this.eggCurrentPos[0] + v0 * Math.cos(Math.PI/4) * t;
      const y = this.eggCurrentPos[1] + v0 * Math.sin(Math.PI/4) * t + 0.5 * g * t * t;
      const z = this.eggCurrentPos[2] + v0 * Math.cos(Math.PI/4) * t;
    
      this.egg.setPosition(x, y, z);
    
      if (y <= this.nestHeight) {
        // Egg has landed in nest
        this.nest.addEgg(this.egg);
        this.egg = null;
        this.isDroppingEgg = false;
      }
    }
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
      this.position = [0,3,0];
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
        return true; // Return true to indicate that an egg was picked up
      }
    }

    return false; // Return false if no egg was picked up
  }
  addEgg(egg) {
    this.eggs.push(egg);
  }
  dropEgg(){
    if(this.carryingEgg){
      const distance = vec3.distance(this.position, [this.scene.nest.x, this.scene.nest.y, this.scene.nest.z]);
      if (distance > this.nest.radius) return; //hmm nao sei se isto a bem nao
      this.droppingEgg = true;
      this.eggStartTime = performance.now();
      this.eggCurrentPos = [this.position[0], this.position[1], this.position[2]];
    }
  }
  eggPosition(){
    for (const egg of this.eggs) {
      
      egg.x = this.position[0];
      egg.y = this.position[1]-0.8;
      egg.z = this.position[2]+0.08;
      console.log(egg.y);
    }
  }
 
  display() {
    this.eggPosition();
    // Draw the bird's eggs
    for (const egg of this.eggs) {
      this.scene.pushMatrix();
      this.scene.translate(egg.x, egg.y, egg.z); // Assuming the egg is positioned at the center of the base
      egg.display();
      this.scene.popMatrix();
    }
    this.moveBird();
    this.scene.pushMatrix()
    this.scene.translate(this.position[0], this.position[1], this.position[2]);

    this.scene.rotate(this.orientationAngle, 0, 1, 0);
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bird.display();
    this.scene.popMatrix();
  }
}