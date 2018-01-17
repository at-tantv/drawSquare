
class Object3D {
    model:   Model = null;
    shader:  Shader = null;
    texture: Texture = null;

    position: Vector3 = null;
    scale = 1;
    rotationX = 0;
    rotationY = 0;
    rotationZ = 0;
    gl: any = null;
    canvas: any = null;

    constructor(model, shader, texture, canvas, gl) {
        this.model = model;
        this.shader = shader;
        this.texture = texture;
        this.canvas = canvas;
        this.gl = gl;
    }

    init() {
        this.position = new Vector3(0, 0, 0);
    }

    render(camera) {
        this.gl.useProgram(this.shader.programShader);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.vertexBuffer);
        this.gl.vertexAttribPointer(this.shader.coordLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.shader.coordLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.normalBuffer);
        this.gl.vertexAttribPointer(this.shader.normalLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.shader.normalLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.textcoordBuffer);
        this.gl.vertexAttribPointer(this.shader.texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.shader.texCoordAttribLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
        this.gl.uniform3f(this.shader.lightLocation, camera.lightPosition.x, camera.lightPosition.y, camera.lightPosition.z);

        this.gl.uniformMatrix4fv(this.shader.mlocation, false, this.getWorldMatrix().buffer());
        var viewMatrix = camera.getWorldMatrix().inverse();
        this.gl.uniformMatrix4fv(this.shader.vLocaion, false, viewMatrix.buffer());
        this.gl.uniformMatrix4fv(this.shader.pLocation, false, camera.projectMatrix.buffer());
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.texture);
        
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, this.model.indices.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    setScale(scale) {
        this.scale = scale;
    }

    setRotateX(xAngle) {
        this.rotationX = xAngle;
    }

    setRotateY(yAngle) {
        this.rotationY = yAngle;
    }

    setRotateZ(zAngle) {
        this.rotationZ = zAngle;        
    }

    setTranslate(vec3: Vector3) {
        this.position.x = vec3.x;
        this.position.y = vec3.y;
        this.position.z = vec3.z;
    }

    getWorldMatrix() {     
       // this.rotationZ += 0.5;
        //this.rotationX += 0.3;
        //this.rotationY += 0.2;
        let scaleMatrix = Matrix4.scale(this.scale);
        let rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        let translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    }

    getPositionAsOtherObject(otherObject) {
        let worldMatrix: Matrix4 = otherObject.getWorldMatrix();
        let invertWorldMatrix: Matrix4 = worldMatrix.inverse();
        let newPosition = invertWorldMatrix.transform(this.position, 1.0);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
        this.position.z = newPosition.z;
    }


    rotatePoint(point, angle) {
        var radians = angle * Math.PI / 180.0;
        var    cos = Math.cos(radians);
        var    sin = Math.sin(radians);
        var    dX = point.x - this.position.x;
        var    dY = point.y - this.position.y;
        this.position.x = cos * dX - sin * dY + this.position.x;
        this.position.y = sin * dX + cos * dY + this.position.y;
    }
}
