var Model = /** @class */ (function () {
    function Model(canvas, gl) {
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.textcoordBuffer = null;
        this.canvas = null;
        this.gl = null;
        this.vertices = [
            -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
            -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
            -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
            1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
            -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
            -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
        ];
        this.indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ];
        this.texCoords = [
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        ];
        this.canvas = canvas;
        this.gl = gl;
    }
    Model.prototype.init = function () {
        //  this.initVerticesAndTextCoords();
        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.textcoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textcoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texCoords), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    };
    Model.prototype.initVerticesAndTextCoords = function () {
        for (var i = 0; i < FileHelper.faceArrays.length; i++) {
            var linesX = FileHelper.faceArrays[i].x.split("/");
            this.updateVerticesAndTextCoords(linesX);
            var linesY = FileHelper.faceArrays[i].y.split("/");
            this.updateVerticesAndTextCoords(linesY);
            var linesZ = FileHelper.faceArrays[i].z.split("/");
            this.updateVerticesAndTextCoords(linesZ);
        }
    };
    Model.prototype.updateVerticesAndTextCoords = function (data) {
        if (data.length >= 3) {
            var positionObject = FileHelper.positionArrays[data[0] - 1];
            var textCoordObject = FileHelper.textCoordArrays[data[1] - 1];
            this.vertices.push(positionObject.x);
            this.vertices.push(positionObject.y);
            this.vertices.push(positionObject.z);
            this.texCoords.push(textCoordObject.x);
            this.texCoords.push(textCoordObject.y);
            this.texCoords.push(textCoordObject.z);
        }
    };
    return Model;
}());
//# sourceMappingURL=model.js.map