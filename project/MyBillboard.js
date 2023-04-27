import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

// /**
//  * MyBillboard
//  * @constructor
//  * @param scene - Reference to MyScene object
//  */
// export class MyBillboard extends CGFobject {
//     constructor(scene) {
//         super(scene);

//         this.plane = new MyPlane(scene, 30);
//         // this.suppliesDelivered = 0;

//         // -- Materials -- //
//         this.material = new CGFappearance(scene);
//         this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
//         this.material.setDiffuse(0.6, 0.6, 0.6, 1.0);
//         this.material.setSpecular(0.4, 0.4, 0.4, 1.0);
//         this.material.setShininess(5.0);
//         this.material.setTextureWrap('REPEAT', 'REPEAT');

//         this.white = new CGFappearance(scene);
//         this.white.setAmbient(1.0, 1.0, 1.0, 1.0);
//         this.white.setDiffuse(1.0, 1.0, 1.0, 1.0);
//         this.white.setSpecular(1.0, 1.0, 1.0, 1.0);
//         this.white.setShininess(5.0);
//         this.white.setTextureWrap('REPEAT', 'REPEAT');

//         this.grey = new CGFappearance(scene);
//         this.grey.setAmbient(0.5, 0.5, 0.5, 1.0);
//         this.grey.setDiffuse(0.5, 0.5, 0.5, 1.0);
//         this.grey.setSpecular(0.5, 0.5, 0.5, 1.0);
//         this.grey.setShininess(5.0);
//         this.grey.setTextureWrap('REPEAT', 'REPEAT');


//         // -- Shaders -- //
//         this.shader = new CGFshader(scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");

//         // this.shader.setUniformsValues({
//         //     suppliesDelivered: this.suppliesDelivered / 5.0
//         // });
//     }

//     // /**
//     //  * Updates the billboard's bar according to the current number of droped supplies
//     //  * @param {number} supplies MyScene's nymber of supplies droped
//     //  */
//     // update(supplies) {
//     //     this.suppliesDelivered = supplies;
//     //     this.shader.setUniformsValues({
//     //         suppliesDelivered: this.suppliesDelivered / 5.0
//     //     });
//     // }

//     /**
//      * Displays the billboard in a certain position
//      */
//     display() {
//         // -- Planes -- //
//         // -- Material -- //
//         // -- Object Front -- //
//         this.scene.pushMatrix();
//         this.scene.translate(0, 3 / 2, 0);
//         this.scene.scale(2, 1, 1);
//         this.plane.display();
//         this.scene.popMatrix();

//         // -- Material -- //
//         this.white.apply();
//         this.scene.pushMatrix();
//         // -- Object Back -- //
//         this.scene.translate(0, 3 / 2, 0);
//         this.scene.scale(2, 1, 1);
//         this.scene.rotate(Math.PI, 0, 1, 0);
//         this.plane.display();
//         this.scene.popMatrix();

//         // -- Posts (Height = 1) -- //
//         // -- Material -- //
//         this.grey.apply();
//         // -- Objects Front -- //
//         this.scene.pushMatrix();
//         this.scene.translate(-15 / 16, 1 / 2, 0);
//         this.scene.scale(1 / 8, 1, 1);
//         this.plane.display();
//         this.scene.popMatrix();
//         this.scene.pushMatrix();
//         this.scene.translate(15 / 16, 1 / 2, 0);
//         this.scene.scale(1 / 8, 1, 1);
//         this.plane.display();
//         this.scene.popMatrix();
//         // -- Objects Back -- //
//         this.scene.pushMatrix();
//         this.scene.translate(-15 / 16, 1 / 2, 0);
//         this.scene.scale(1 / 8, 1, 1);
//         this.scene.rotate(Math.PI, 0, 1, 0);
//         this.plane.display();
//         this.scene.popMatrix();
//         this.scene.pushMatrix();
//         this.scene.translate(15 / 16, 1 / 2, 0);
//         this.scene.scale(1 / 8, 1, 1);
//         this.scene.rotate(Math.PI, 0, 1, 0);
//         this.plane.display();
//         this.scene.popMatrix();

//         // -- Progress Bar -- //
//         // -- Material -- //
//         this.material.apply();
//         // -- Object -- //
//         this.scene.pushMatrix();
//         this.scene.setActiveShader(this.shader);
//         this.scene.translate(0, 3 / 2, 0.005);
//         this.scene.scale(3 / 2, 1 / 5, 1);
//         this.plane.display();
//         this.scene.popMatrix();
//         // -- Shader is reset in MyScene -- //
//     }

//     /**
//      * Enables visualization of Object's normals
//      */
//     enableNormalViz() {
//         this.plane.enableNormalViz()
//     }
//     /**
//      * Disables visualization of Object's normals
//      */
//     disableNormalViz() {
//         this.plane.disableNormalViz()
//     }
// }

export class MyBillboard {
    constructor(scene) {
        this.quad = new MyQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(new CGFtexture(scene, "textures/billboardtree.png"));
        this.material.setTextureWrap("REPEAT", "REPEAT");
    }

    display(x, y, z) {
        this.material.apply();

        const cameraPosition = this.quad.scene.camera.position;
        const quadPosition = vec3.fromValues(x, y, z);
        const cameraToQuad = vec3.create();
        vec3.subtract(cameraToQuad, cameraPosition, quadPosition);
        vec3.normalize(cameraToQuad, cameraToQuad);

        const horizontalCameraToQuad = vec3.fromValues(cameraToQuad[0], 0, cameraToQuad[2]);
        vec3.normalize(horizontalCameraToQuad, horizontalCameraToQuad);

        const angle = Math.acos(vec3.dot(cameraToQuad, vec3.fromValues(0, 1, 0)));
        const rotationAxis = vec3.create();
        vec3.cross(rotationAxis, vec3.fromValues(0, 1, 0), cameraToQuad);

        this.quad.scene.pushMatrix();
        this.quad.scene.translate(x, y, z);
        this.quad.scene.rotate(angle, rotationAxis[0], rotationAxis[1], rotationAxis[2]);
        this.quad.scene.rotate(-Math.PI / 2, 1, 0, 0); // para ficar na vertical
        this.quad.display();
        this.quad.scene.popMatrix();
    }
}
