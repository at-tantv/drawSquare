 class Matrix4 {    

    constructor(public data: number[][] = [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
    ]) {
    }

    static translate(x: number, y: number, z: number = 0.0) {

        return new Matrix4([
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [x, y, z, 1.0],
        ])
    }


    static scale(sx: number, sy: number = undefined, sz: number = undefined) {

        if (sy == undefined) {
            sy = sx;
            sz = sx
        }

        return new Matrix4([
            [sx, 0.0, 0.0, 0.0],
            [0.0, sy, 0.0, 0.0],
            [0.0, 0.0, sz, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ])
    }

    static rotateX(alpha: number) {
        alpha *= Math.PI / 180.0;
        let sinA = Math.sin(alpha);
        let cosA = Math.cos(alpha);
        return new Matrix4([
            [1.0, 0.0, 0.0, 0.0],
            [0.0, cosA, sinA, 0.0],
            [0.0, -sinA, cosA, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ])
    }

    static rotateY(alpha: number) {
        alpha *= Math.PI / 180.0;
        let sinA = Math.sin(alpha);
        let cosA = Math.cos(alpha);
        return new Matrix4([
            [cosA, 0.0, sinA, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [-sinA, 0.0, cosA, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ])
    }

    static rotateZ(alpha: number) {
        alpha *= Math.PI / 180.0;
        let sinA = Math.sin(alpha);
        let cosA = Math.cos(alpha);
        return new Matrix4([
            [cosA, sinA, 0.0, 0.0],
            [-sinA, cosA, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ])
    }
    

    static perspective(fov: number, aspect: number, near: number, far: number) {
        var y = Math.tan(fov * Math.PI / 360) * near;
        var x = y * aspect;
        return Matrix4.frustum(-x, x, -y, y, near, far)
    }

   static frustum(left: number, right: number,
        bottom: number, top: number,
        near: number = -100.0, far: number = 100.0) {
        return new Matrix4([
            [2 * near / (right - left), 0, 0, 0],
            [0, 2 * near / (top - bottom), 0, 0],
            [(right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1],
            [0, 0, -2 * near * far / (far - near), 0]
        ]);
    }

    transform(vector: Vector3, w: number = 0.0) {

        let x = this.data[0][0] * vector.x
            + this.data[1][0] * vector.y
            + this.data[2][0] * vector.z
            + this.data[3][0] * w;

        let y = this.data[0][1] * vector.x
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
            w = 1
        }

        return new Vector3(
            x / w, y / w, z / w
        )
    }


    buffer() {
        return this.data[0].concat(this.data[1], this.data[2], this.data[3])
    }


    inverse() {
        let rows = 4;
        let cols = 4;

        let A = this.data.concat();
        for (let r = 0; r < rows; r++) {
            A[r] = A[r].concat();
        }

        var B = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ].valueOf();

        for (let c = 0; c < cols; c++) {
            let r = c;
            while (r < rows && A[r][c] == 0) {
                r++;
            }
            if (r == rows || A[r][c] == 0) {
                return this;
            }
            if (r != c) {
                let temp = A[c]; A[c] = A[r]; A[r] = temp;
                temp = B[c]; B[c] = B[r]; B[r] = temp;
            }

            var Ac = A[c],
                Bc = B[c];
            for (r = 0; r < rows; r++) {
                var Ar = A[r],
                    Br = B[r];
                if (r != c) {
                    if (Ar[c] != 0) {
                        let f = -Ar[c] / Ac[c];
                        for (let s = c; s < cols; s++) {
                            Ar[s] = Ar[s] + (f * Ac[s]);
                        }
                        for (let s = 0; s < cols; s++) {
                            Br[s] = Br[s] + (f * Bc[s]);
                        }
                    }
                }
                else {
                    let f = Ac[c];
                    if (f == 0) {
                        console.log('Cannot calculate inverse, determinant is zero');
                        return this;
                    }
                    for (let s = c; s < cols; s++) {
                        Ar[s] = Ar[s] / f;
                    }
                    for (let s = 0; s < cols; s++) {
                        Br[s] = Br[s] / f;
                    }
                }
            }
        }
        return new Matrix4([B[0], B[1], B[2], B[3]]);
        
    }

    concat(matrix: Matrix4) {
        var result = new Matrix4([
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 0.0, 0.0, 0.0]
        ]);

        if (matrix == null) {
            return result
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    result.data[i][k] += this.data[i][j] * matrix.data[j][k];
                }
            }
        }
        return result
    }

   
}
