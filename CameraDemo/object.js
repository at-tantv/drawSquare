var Object3D = /** @class */ (function () {
    function Object3D(model, shader, texture, canvas, gl) {
        this.model = null;
        this.shader = null;
        this.texture = null;
        this.position = null;
        this.scale = 1;
        this.rotationX = 45;
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
        //Tinh World Matrix
        this.gl.uniformMatrix4fv(this.shader.MmatrixAddress, false, this.getWorldMatrix().buffer());
        //View Matrix Camera
        var viewMatrix = camera.getWorldMatrix().inverse();
        this.gl.uniformMatrix4fv(this.shader.VmatrixAddress, false, viewMatrix.buffer());
        //Ve Hinh
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.model.vertices.length / 3);
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
        this.rotationZ += 0.5;
        this.rotationX += 0.2;
        this.rotationY += 0.1;
        var scaleMatrix = Matrix4.scale(this.scale);
        var rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        var translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    };
    return Object3D;
}());
//# sourceMappingURL=object.js.map