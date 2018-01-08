var Vector3 = /** @class */ (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.clone = function () {
        return new Vector3(this.x, this.y, this.z);
    };
    Vector3.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector3.prototype.set = function (a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
    };
    Vector3.prototype.invert = function () {
        return new Vector3(-this.x, -this.y, -this.z);
    };
    Vector3.prototype.rotate90 = function () {
        return new Vector3(this.y, -this.x, this.z);
    };
    Vector3.prototype.add = function (a) {
        return new Vector3(this.x + a.x, this.y + a.y, this.z + a.z);
    };
    Vector3.prototype.subtract = function (a) {
        if (!a) {
            return this.clone();
        }
        return new Vector3(this.x - a.x, this.y - a.y, this.z - a.z);
    };
    Vector3.prototype.multiply = function (a) {
        return new Vector3(a * this.x, a * this.y, a * this.z);
    };
    Vector3.prototype.rotateBy = function (a) {
        var cos = Math.cos(a * Math.PI / 180);
        var sin = Math.sin(a * Math.PI / 180);
        return new Vector3(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    };
    Vector3.prototype.cross = function (a) {
        return new Vector3(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
    };
    Vector3.prototype.dot = function (a) {
        return a.x * this.x + a.y * this.y + a.z * this.z;
    };
    Vector3.prototype.getX = function () {
        return this.x;
    };
    return Vector3;
}());
//# sourceMappingURL=vector3.js.map