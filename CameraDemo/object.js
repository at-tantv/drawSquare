var Object3D = /** @class */ (function () {
    function Object3D(model, shader, texture, canvas, gl) {
        this.model = null;
        this.shader = null;
        this.texture = null;
        this.position = null;
        this.scale = 1;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.gl = null;
        this.canvas = null;
        this.model = model;
        this.shader = shader;
        this.texture = texture;
        this.canvas = canvas;
        this.gl = gl;
    }
    Object3D.prototype.init = function () {
        this.position = new Vector3(0, 0, 0);
    };
    Object3D.prototype.render = function (camera) {
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
    };
    Object3D.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    Object3D.prototype.setRotateX = function (xAngle) {
        this.rotationX = xAngle;
    };
    Object3D.prototype.setRotateY = function (yAngle) {
        this.rotationY = yAngle;
    };
    Object3D.prototype.setRotateZ = function (zAngle) {
        this.rotationZ = zAngle;
    };
    Object3D.prototype.setTranslate = function (vec3) {
        this.position.x = vec3.x;
        this.position.y = vec3.y;
        this.position.z = vec3.z;
    };
    Object3D.prototype.getWorldMatrix = function () {
        // this.rotationZ += 0.5;
        //this.rotationX += 0.3;
        //this.rotationY += 0.2;
        var scaleMatrix = Matrix4.scale(this.scale);
        var rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        var translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    };
    Object3D.prototype.getPositionAsOtherObject = function (otherObject) {
        var worldMatrix = otherObject.getWorldMatrix();
        var invertWorldMatrix = worldMatrix.inverse();
        var newPosition = invertWorldMatrix.transform(this.position, 1.0);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
        this.position.z = newPosition.z;
    };
    Object3D.prototype.rotatePoint = function (point, angle) {
        var radians = angle * Math.PI / 180.0;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var dX = point.x - this.position.x;
        var dY = point.y - this.position.y;
        this.position.x = cos * dX - sin * dY + this.position.x;
        this.position.y = sin * dX + cos * dY + this.position.y;
    };
    return Object3D;
}());
//# sourceMappingURL=object.js.map