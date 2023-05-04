// import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
// import { MyQuad } from './MyQuad.js';

// export class MyBillboard {
//     constructor(scene, coords=[0,0,0]) {
//         this.x = coords[0];
//         this.y = coords[1];
//         this.z = coords[2];


//         this.quad = new MyQuad(scene);
//         this.material = new CGFappearance(scene);
//         this.material.setAmbient(1, 1, 1, 1);
//         this.material.setDiffuse(1, 1, 1, 1);
//         this.material.setSpecular(0, 0, 0, 1);
//         this.material.setShininess(10.0);
//         this.material.setTexture(new CGFtexture(scene, "images/billboardtree.png"));
//         this.material.setTextureWrap("REPEAT", "REPEAT");
//     }

//     display(x, y, z) {

//         //let origin = [this.x, this.y, this.z];

//         //let cameraPosition = this.quad.scene.camera.position;
//         //let toCamera = [cameraPosition[0] - origin[0], cameraPosition[1] - origin[1], cameraPosition[2] - origin[2]];
//         //toCamera = CGFvec3.normalize(toCamera);
//         //let quadNormal = [0, 1, 0];
//         //let angle = Math.acos(CGFvec3.dot(toCamera, quadNormal));
//         //let axis = CGFvec3.cross(quadNormal, toCamera);
//         //axis = CGFvec3.normalize(axis);

//         //let modelViewMatrix = mat4.create();
//         //mat4.translate(modelViewMatrix, modelViewMatrix, [x, y, z]);
//         //mat4.rotate(modelViewMatrix, modelViewMatrix, angle, axis);
//         //mat4.rotate(modelViewMatrix, modelViewMatrix, -Math.PI/2, [1, 0, 0]);
//         //this.quad.scene.setActiveShader(this.quad.scene.textureShader);
//         //this.material.apply();
//         //this.quad.display();
//         //this.quad.scene.setActiveShader(this.quad.scene.defaultShader);
        
//         let cameraPosition = vec3.fromValues(x, y, z);
//         let cameraToQuad = vec3.create();
//         cam.subtract(cameraToQuad, cameraPosition, quadPosition);
//         vec3.normalize(cameraToQuad, cameraToQuad);

//         const horizontalCameraToQuad = vec3.fromValues(cameraToQuad[0], 0, cameraToQuad[2]);
//         vec3.normalize(horizontalCameraToQuad, horizontalCameraToQuad);

//         const angle = Math.acos(vec3.dot(cameraToQuad, vec3.fromValues(0, 1, 0)));
//         vec3.cross(rotationAxis, vec3.fromValues(0, 1, 0), cameraToQuad);

//         this.quad.scene.pushMatrix();
//         this.quad.scene.translate(x, y, z);
//         this.quad.scene.rotate(angle, 0, 1, 0);
//         //this.quad.scene.rotate(-Math.PI / 2, 1, 0, 0); // para ficar na vertical
//         this.material.apply();
//         this.quad.display();
//         this.quad.scene.popMatrix();
//     }

//     update() {

//         let camx = this.scene.camera.position[0];
//         let camy = this.scene.camera.position[1];
//         let camz = this.scene.camera.position[2];


//     }
// }

import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyBillboard {
    constructor(scene, coords = [0, 0, 0]) {
        //super(scene);

        this.x = coords[0];
        this.y = coords[1];
        this.z = coords[2];

        this.quad = new MyQuad(scene);
        this.material = new CGFappearance(scene);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setShininess(10.0);
        this.material.setTexture(new CGFtexture(scene, 'images/billboardtree.png'));
        this.material.setTextureWrap('REPEAT', 'REPEAT');

         
    }

    display(x, y, z) {
        this.scene.pushMatrix();
        let camPosition = this.scene.camera.position;  
        let quadPosition = [this.x, 0, this.z];
        let cameraToQuad = [cameraPos[0]-quadPosition[0],0,cameraPos[2]-quadPosition[2]];
        vec3.normalize(cameraToQuad, cameraToQuad);

        let billboardNormal = vec3.fromValues(this.billboard.normals[0], this.billboard.normals[1], this.billboard.normals[2]);
        let rotationAxis = vec3.create();
        vec3.cross(rotationAxis, billboardNormal, cameraToQuad);

        let angle = Math.acos(vec3.dot(billboardNormal, cameraToQuad));

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(angle, rotationAxis[0], rotationAxis[1], rotationAxis[2]);
        
        this.scene.translate(this.x, this.y, this.z);

        this.material.apply();
        this.quad.display();
        this.scene.popMatrix();
    }

    update() {
        
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}

