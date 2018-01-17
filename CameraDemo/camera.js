var Camera = /** @class */ (function () {
    function Camera(data) {
        if (data === void 0) { data = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]; }
        this.data = data;
        this.position = new Vector3(0, 0, 0);
        this.scale = 1;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.lightPosition = new Vector3(0, 0, 0);
        this.projectMatrix = null;
    }
    Camera.prototype.init = function (canvas, shader) {
        var gl = canvas.getContext('experimental-webgl');
        this.projectMatrix = Matrix4.perspective(45, canvas.width / canvas.height, 0.1, 1000);
    };
    Camera.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    Camera.prototype.setPosition = function (vec3) {
        this.position.x = vec3.x;
        this.position.y = vec3.y;
        this.position.z = vec3.z;
    };
    Camera.prototype.getWorldMatrix = function () {
        var scaleMatrix = Matrix4.scale(this.scale);
        var rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        var translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    };
    Camera.prototype.translateZ = function (z) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(0, 0, z);
        var vector3InWorldMatrix = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    };
    Camera.prototype.translateX = function (x) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(x, 0, 0);
        var vector3InWorldMatrix = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    };
    Camera.prototype.translateY = function (y) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(0, y, 0);
        var vector3InWorldMatrix = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    };
    return Camera;
}());
//# sourceMappingURL=camera.js.map