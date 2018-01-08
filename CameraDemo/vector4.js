var Vector4 = /** @class */ (function () {
    function Vector4(x, y, z, t) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        if (t === void 0) { t = 0.0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
    }
    Vector4.prototype.getById = function (id) {
        switch (id) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.t;
            default:
                return null;
        }
    };
    Vector4.prototype.setValueById = function (id, value) {
        switch (id) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break;
            case 3:
                this.t = value;
                break;
        }
    };
    return Vector4;
}());
//# sourceMappingURL=vector4.js.map