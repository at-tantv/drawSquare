var Squad = /** @class */ (function () {
    function Squad(canvas) {
        var _this = this;
        this.canvas = null;
        this.gl = null;
        this.texture = null;
        this.pMatrix = null;
        this.vMatrix = null;
        this.mMatrix = null;
        this.matrix = null;
        this.time = 0;
        this.currentTime = 0;
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
        this.render = function () {
            var dt = _this.time - _this.currentTime;
            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT | _this.gl.DEPTH_BUFFER_BIT);
            _this.update(dt);
            _this.currentTime = _this.time;
            _this.time += 0.01;
            window.requestAnimationFrame(_this.render);
        };
        this.canvas = canvas;
    }
    Squad.prototype.init = function () {
        this.gl = this.canvas.getContext("experimental-webgl");
        var vertex_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        var index_Buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, index_Buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        var textcoord_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textcoord_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texCoords), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        var vertCode = 'attribute vec3 position;' +
            'attribute vec2 vertTexCoord;' +
            'varying vec2 fragTexCoord;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'void main(void) { ' +
            '  gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
            '  fragTexCoord = vertTexCoord;' +
            '} ';
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, vertCode);
        this.gl.compileShader(vertShader);
        var fragCode = 'precision mediump float;' +
            'varying vec2 fragTexCoord;' +
            'uniform sampler2D sampler;' +
            'void main(void) {' +
            ' gl_FragColor = texture2D(sampler, fragTexCoord);' +
            ' } ';
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, fragCode);
        this.gl.compileShader(fragShader);
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertShader);
        this.gl.attachShader(program, fragShader);
        this.gl.linkProgram(program);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, index_Buffer);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
        var coord = this.gl.getAttribLocation(program, "position");
        this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coord);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, textcoord_buffer);
        var texCoordAttribLocation = this.gl.getAttribLocation(program, 'vertTexCoord');
        this.gl.vertexAttribPointer(texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(texCoordAttribLocation);
        this.gl.useProgram(program);
        this.texture = this.loadTexture(this.gl, "https://c1.staticflickr.com/5/4641/25459647538_b2521aa242.jpg");
        this.pMatrix = this.gl.getUniformLocation(program, "Pmatrix");
        this.vMatrix = this.gl.getUniformLocation(program, "Vmatrix");
        this.mMatrix = this.gl.getUniformLocation(program, "Mmatrix");
        this.matrix = new Matrix();
        this.matrix.getProMatrix(this.canvas);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
        this.gl.clearDepth(1.0);
        this.gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    };
    Squad.prototype.update = function (dt) {
        this.matrix.rotateZ(this.matrix.mov_matrix, dt * 0.5);
        this.matrix.rotateY(this.matrix.mov_matrix, dt * 0.2);
        this.matrix.rotateX(this.matrix.mov_matrix, dt * 0.3);
        this.gl.uniformMatrix4fv(this.pMatrix, false, this.matrix.proj_matrix);
        this.gl.uniformMatrix4fv(this.vMatrix, false, this.matrix.view_matrix);
        this.gl.uniformMatrix4fv(this.mMatrix, false, this.matrix.mov_matrix);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
    };
    Squad.prototype.loadTexture = function (gl, url) {
        var _this = this;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        var level = 0;
        var internalFormat = gl.RGBA;
        var width = 1;
        var height = 1;
        var border = 0;
        var srcFormat = gl.RGBA;
        var srcType = gl.UNSIGNED_BYTE;
        var pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
        var image = new Image();
        image.crossOrigin = "";
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
            if (_this.isPowerOf2(image.width) && _this.isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
        return texture;
    };
    Squad.prototype.isPowerOf2 = function (value) {
        return (value & (value - 1)) == 0;
    };
    return Squad;
}());
//# sourceMappingURL=quare.js.map