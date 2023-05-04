import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTerrain extends CGFobject {

constructor(scene) {
    super(scene);
    this.terrain = new MyPlane(scene, 30);

    this.initMaterials(scene);
    this.initShaders(scene);
  }

initShaders(scene) {

    this.shader = new CGFshader(scene.gl, "./shaders/terrain.vert", "./shaders/terrain.frag");
    this.shader.setUniformsValues({ bumpMap: 1, offset: 0.2, multiplier: 0.3, altimetry: 2});
}

initMaterials(scene) {
    this.bumpMap = new CGFtexture(this.scene, "images/heightmap.jpg");
    this.altimetry = new CGFtexture(this.scene, "images/altimetry.png");
    this.appearance = new CGFappearance(scene);
    this.appearance.loadTexture("images/terrain.jpg");
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

}

display() {
    this.scene.setActiveShader(this.shader);
    this.bumpMap.bind(1);
    this.altimetry.bind(2);
    
    this.scene.pushMatrix();
    this.appearance.apply();
    this.scene.translate(0, -30, 0);
    this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.scale(400, 400, 200);
    this.terrain.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
}
}