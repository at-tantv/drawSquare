var Shader = /** @class */ (function () {
    function Shader(model, gl) {
        this.programShader = null;
        this.model = null;
        this.PmatrixAddress = null;
        this.VmatrixAddress = null;
        this.MmatrixAddress = null;
        this.gl = null;
        this.model = model;
        this.gl = gl;
    }
    Shader.prototype.init = function () {
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
            ' gl_FragColor = texture2D(sampler, fragTexCoord);' +
            ' } ';
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, vertCode);
        this.gl.compileShader(vertShader);
        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, fragCode);
        this.gl.compileShader(fragShader);
        this.programShader = this.gl.createProgram();
        this.gl.attachShader(this.programShader, vertShader);
        this.gl.attachShader(this.programShader, fragShader);
        this.gl.linkProgram(this.programShader);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.vertexBuffer);
        var coord = this.gl.getAttribLocation(this.programShader, "position");
        this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coord);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.textcoordBuffer);
        var texCoordAttribLocation = this.gl.getAttribLocation(this.programShader, 'vertTexCoord');
        this.gl.vertexAttribPointer(texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(texCoordAttribLocation);
        this.PmatrixAddress = this.gl.getUniformLocation(this.programShader, "Pmatrix");
        this.VmatrixAddress = this.gl.getUniformLocation(this.programShader, "Vmatrix");
        this.MmatrixAddress = this.gl.getUniformLocation(this.programShader, "Mmatrix");
        this.gl.useProgram(this.programShader);
    };
    return Shader;
}());
//# sourceMappingURL=shader.js.map