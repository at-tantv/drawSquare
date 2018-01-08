var Shader = /** @class */ (function () {
    function Shader(model) {
        this.programShader = null;
        this.model = null;
        this.PmatrixAddress = null;
        this.VmatrixAddress = null;
        this.MmatrixAddress = null;
        this.model = model;
    }
    Shader.prototype.init = function () {
        var gl = this.model.canvas.getContext('experimental-webgl');
        var vertCode = 'attribute vec3 position;' +
            'attribute vec2 vertTexCoord;' +
            'varying vec2 fragTexCoord;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'void main(void) { ' +
            '  gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1);' +
            '  fragTexCoord = vertTexCoord;' +
            '} ';
        var fragCode = 'precision mediump float;' +
            'varying vec2 fragTexCoord;' +
            'uniform sampler2D sampler;' +
            'void main(void) {' +
            ' gl_FragColor = texture2D(sampler, fragTexCoord) + vec4(fragTexCoord, 0.0, 0.0);' +
            ' } ';
        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertCode);
        gl.compileShader(vertShader);
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragCode);
        gl.compileShader(fragShader);
        this.programShader = gl.createProgram();
        gl.attachShader(this.programShader, vertShader);
        gl.attachShader(this.programShader, fragShader);
        gl.linkProgram(this.programShader);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertexBuffer);
        var coord = gl.getAttribLocation(this.programShader, "position");
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.model.textcoordBuffer);
        var texCoordAttribLocation = gl.getAttribLocation(this.programShader, 'vertTexCoord');
        gl.vertexAttribPointer(texCoordAttribLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordAttribLocation);
        this.PmatrixAddress = gl.getUniformLocation(this.programShader, "Pmatrix");
        this.VmatrixAddress = gl.getUniformLocation(this.programShader, "Vmatrix");
        this.MmatrixAddress = gl.getUniformLocation(this.programShader, "Mmatrix");
        gl.useProgram(this.programShader);
    };
    return Shader;
}());
//# sourceMappingURL=shader.js.map