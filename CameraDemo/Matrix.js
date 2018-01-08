var Matrix4 = /** @class */ (function () {
    function Matrix4(data) {
        if (data === void 0) { data = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]; }
        this.data = data;
    }
    Matrix4.translate = function (x, y, z) {
        if (z === void 0) { z = 0.0; }
        return new Matrix4([
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [x, y, z, 1.0],
        ]);
    };
    Matrix4.scale = function (sx, sy, sz) {
        if (sy === void 0) { sy = undefined; }
        if (sz === void 0) { sz = undefined; }
        if (sy == undefined) {
            sy = sx;
            sz = sx;
        }
        return new Matrix4([
            [sx, 0.0, 0.0, 0.0],
            [0.0, sy, 0.0, 0.0],
            [0.0, 0.0, sz, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);
    };
    Matrix4.rotateX = function (alpha) {
        alpha *= Math.PI / 180.0;
        var sinA = Math.sin(alpha);
        var cosA = Math.cos(alpha);
        return new Matrix4([
            [1.0, 0.0, 0.0, 0.0],
            [0.0, cosA, sinA, 0.0],
            [0.0, -sinA, cosA, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);
    };
    Matrix4.rotateY = function (alpha) {
        alpha *= Math.PI / 180.0;
        var sinA = Math.sin(alpha);
        var cosA = Math.cos(alpha);
        return new Matrix4([
            [cosA, 0.0, sinA, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [-sinA, 0.0, cosA, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);
    };
    Matrix4.rotateZ = function (alpha) {
        alpha *= Math.PI / 180.0;
        var sinA = Math.sin(alpha);
        var cosA = Math.cos(alpha);
        return new Matrix4([
            [cosA, sinA, 0.0, 0.0],
            [-sinA, cosA, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]);
    };
    Matrix4.perspective = function (fov, aspect, near, far) {
        var y = Math.tan(fov * Math.PI / 360) * near;
        var x = y * aspect;
        return Matrix4.frustum(-x, x, -y, y, near, far);
    };
    Matrix4.frustum = function (left, right, bottom, top, near, far) {
        if (near === void 0) { near = -100.0; }
        if (far === void 0) { far = 100.0; }
        return new Matrix4([
            [2 * near / (right - left), 0, 0, 0],
            [0, 2 * near / (top - bottom), 0, 0],
            [(right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1],
            [0, 0, -2 * near * far / (far - near), 0]
        ]);
    };
    Matrix4.prototype.transform = function (vector, w) {
        if (w === void 0) { w = 0.0; }
        var x = this.data[0][0] * vector.x
            + this.data[1][0] * vector.y
            + this.data[2][0] * vector.z
            + this.data[3][0] * w;
        var y = this.data[0][1] * vector.x
            + this.data[1][1] * vector.y
            + this.data[2][1] * vector.z
            + this.data[3][1] * w;
        var z = this.data[0][2] * vector.x
            + this.data[1][2] * vector.y
            + this.data[2][2] * vector.z
            + this.data[3][2] * w;
        w = this.data[0][3] * vector.x
            + this.data[1][3] * vector.y
            + this.data[2][3] * vector.z
            + this.data[3][3] * w;
        if (w == 0) {
            w = 1;
        }
        return new Vector3(x / w, y / w, z / w);
    };
    Matrix4.prototype.buffer = function () {
        return this.data[0].concat(this.data[1], this.data[2], this.data[3]);
    };
    Matrix4.prototype.inverse = function () {
        var rows = 4;
        var cols = 4;
        var A = this.data.concat();
        for (var r = 0; r < rows; r++) {
            A[r] = A[r].concat();
        }
        var B = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ].valueOf();
        for (var c = 0; c < cols; c++) {
            var r = c;
            while (r < rows && A[r][c] == 0) {
                r++;
            }
            if (r == rows || A[r][c] == 0) {
                return this;
            }
            if (r != c) {
                var temp = A[c];
                A[c] = A[r];
                A[r] = temp;
                temp = B[c];
                B[c] = B[r];
                B[r] = temp;
            }
            var Ac = A[c], Bc = B[c];
            for (r = 0; r < rows; r++) {
                var Ar = A[r], Br = B[r];
                if (r != c) {
                    if (Ar[c] != 0) {
                        var f = -Ar[c] / Ac[c];
                        for (var s = c; s < cols; s++) {
                            Ar[s] = Ar[s] + (f * Ac[s]);
                        }
                        for (var s = 0; s < cols; s++) {
                            Br[s] = Br[s] + (f * Bc[s]);
                        }
                    }
                }
                else {
                    var f = Ac[c];
                    if (f == 0) {
                        console.log('Cannot calculate inverse, determinant is zero');
                        return this;
                    }
                    for (var s = c; s < cols; s++) {
                        Ar[s] = Ar[s] / f;
                    }
                    for (var s = 0; s < cols; s++) {
                        Br[s] = Br[s] / f;
                    }
                }
            }
        }
        return new Matrix4([B[0], B[1], B[2], B[3]]);
    };
    Matrix4.prototype.concat = function (matrix) {
        var result = new Matrix4([
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0]
        ]);
        if (matrix == null) {
            return result;
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    result.data[i][k] += this.data[i][j] * matrix.data[j][k];
                }
            }
        }
        return result;
    };
    return Matrix4;
}());
//# sourceMappingURL=matrix.js.map