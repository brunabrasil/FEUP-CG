import {CGFobject} from '../lib/CGF.js';
/**
* MyPrism
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        
        for(var j = 0; j < this.stacks; j++){
            var ang = 0;
            var alphaAng = 2*Math.PI/this.slices;
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca,sa, j/this.stacks);
                this.vertices.push(caa, saa, j/this.stacks);
                this.vertices.push(ca,sa, (j+1)/this.stacks);
                this.vertices.push(caa, saa, (j+1)/this.stacks);

                //v0=4*1 v1=4*1+1 v2=4*1+2 v3=4*1+3
                this.indices.push(4*i+(this.slices*j*4), (4*i+1)+(this.slices*j*4), (4*i+2)+(this.slices*j*4),
                (4*i+2)+(this.slices*j*4), (4*i+1)+(this.slices*j*4), (4*i+3)+(this.slices*j*4),
                (4*i+2)+(this.slices*j*4), (4*i+3)+(this.slices*j*4), (4*i+1)+(this.slices*j*4),
                (4*i+2)+(this.slices*j*4), (4*i+1)+(this.slices*j*4), (4*i)+(this.slices*j*4));

                // triangle normal computed by cross product of two edges
                var ca2 = Math.cos(alphaAng/2);
                var sa2 = Math.sin(alphaAng/2);
                var caa2 = Math.cos(alphaAng*i+alphaAng/2);
                var saa2 = Math.sin(alphaAng*i+alphaAng/2);

                var normal= [
                    caa2, saa2, 0
                ];

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                ang+=alphaAng;
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    
}


