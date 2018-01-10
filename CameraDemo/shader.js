var Shader = /** @class */ (function () {
    function Shader(model, gl) {
        this.programShader = null;
        this.model = null;
        this.PmatrixAddress = null;
        this.VmatrixAddress = null;
        this.MmatrixAddress = null;
        this.LightPositionAddress = null;
        this.gl = null;
        this.model = model;
        this.gl = gl;
    }
    Shader.prototype.init = function () {
        var vertCode = 'attribute vec3 position;' +
            'attribute vec2 vertTexCoord;' +
            'attribute vec3 normal;' +
            'varying vec3 vNormal;' +
            'varying vec3 vPosition;' +
            'varying vec2 fragTexCoord;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'uniform vec3 lightPosition;' +
            'varying vec3 vLightPosition;' +
            'void main(void) { ' +
            '  vPosition = (Mmatrix * vec4(position, 1.0)).xyz;' +
            '  vNormal = (Mmatrix * vec4(normal, 0.0)).xyz;' +
            '  fragTexCoord = vertTexCoord;' +
            '  vLightPosition = lightPosition;' +
            '  gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1);' +
            '} ';
        var fragCode = 'precision mediump float;' +
            'varying vec2 fragTexCoord;' +
            'varying vec3 vNormal;' +
            'varying vec3 vPosition;' +
            'varying vec3 vLightPosition;' +
            'uniform sampler2D sampler;' +
            'void main(void) {' +
            'float ka = 1.0;' +
            'float kd = 1.0;' +
            'float ks = 1.0;' +
            'vec3 ambientColor = vec3(2.0, 1.0, 1.0);' +
            'vec3 diffuseColor = vec3(1.0, 1.0, 1.0);' +
            'vec3 specularColor = vec3(1.0, 1.0, 1.0);' +
            'vec3 N = normalize(vNormal);' +
            'vec3 L = normalize(vLightPosition - vPosition);' +
            'float shininessVal = 2.0;' +
            'float lambertian = max(dot(N, L), 0.0);' +
            'vec3 R = reflect(-L, N);' +
            'vec3 V = normalize(vec3(0.0,0.0,0.0) - vPosition);' +
            'float specAngle = max(dot(R, V), 0.0);' +
            'float specular = pow(specAngle, shininessVal);' +
            'vec3 vColor = ka * ambientColor + kd * lambertian * diffuseColor + ks * specular * specularColor;' +
            'vec4 texelColor = texture2D(sampler, fragTexCoord);' +
            'gl_FragColor = vec4(texelColor.rgb * vColor, texelColor.a);' +
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
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.model.indexBuffer);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.vertexBuffer);
        var coord = this.gl.getAttribLocation(this.programShader, "position");
        this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coord);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.normalBuffer);
        var normal = this.gl.getAttribLocation(this.programShader, "normal");
        this.gl.vertexAttribPointer(normal, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(normal);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.textcoordBuffer);
        var texCoordAttribLocation = this.gl.getAttribLocation(this.programShader, 'vertTexCoord');
        this.gl.vertexAttribPointer(texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(texCoordAttribLocation);
        this.PmatrixAddress = this.gl.getUniformLocation(this.programShader, "Pmatrix");
        this.VmatrixAddress = this.gl.getUniformLocation(this.programShader, "Vmatrix");
        this.MmatrixAddress = this.gl.getUniformLocation(this.programShader, "Mmatrix");
        this.LightPositionAddress = this.gl.getUniformLocation(this.programShader, "lightPosition");
        this.gl.useProgram(this.programShader);
    };
    return Shader;
}());
//# sourceMappingURL=shader.js.map