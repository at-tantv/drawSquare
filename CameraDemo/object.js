var Object3D = /** @class */ (function () {
    function Object3D(model, shader, texture, canvas) {
        this.model = null;
        this.shader = null;
        this.texture = null;
        this.position = null;
        this.scale = 1;
        this.rotationX = 40;
        this.rotationY = 40;
        this.rotationZ = 40;
        this.canvas = null;
        this.model = model;
        this.shader = shader;
        this.texture = texture;
        this.canvas = canvas;
    }
    Object3D.prototype.init = function () {
        this.position = new Vector3(0, 0, 0);
    };
    Object3D.prototype.render = function (camera) {
        var gl = this.canvas.getContext('experimental-webgl');
        //Tinh World Matrix
        gl.uniformMatrix4fv(this.shader.MmatrixAddress, false, this.getWorldMatrix().buffer());
        //View Matrix Camera
        var viewMatrix = camera.getWorldMatrix().inverse();
        gl.uniformMatrix4fv(this.shader.VmatrixAddress, false, viewMatrix.buffer());
        //Ve Hinh
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture);
        gl.activeTexture(gl.TEXTURE0);
        gl.drawElements(gl.TRIANGLES, this.model.indices.length, gl.UNSIGNED_SHORT, 0);
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
        var scaleMatrix = Matrix4.scale(this.scale);
        var rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        var translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    };
    return Object3D;
}());
//# sourceMappingURL=object.js.map