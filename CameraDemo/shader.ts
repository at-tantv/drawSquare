class Shader {
    programShader = null;
    model: Model = null;
    PmatrixAddress: any = null;
    VmatrixAddress: any = null;
    MmatrixAddress: any = null;
    gl: any = null;
    constructor(model, gl){
        this.model = model;
        this.gl = gl;
    }

    init() {
        let vertCode = 'attribute vec3 position;' +
            'attribute vec2 vertTexCoord;' +
            'varying vec2 fragTexCoord;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +            
            'varying highp vec3 vLighting;'+
            'void main(void) { ' +
            '  gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1);' +
            '  fragTexCoord = vertTexCoord;' +            
            '  highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);'+
            '  highp vec3 directionalLightColor = vec3(1, 1, 1);'+
            '  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));'+
            '  highp vec4 transformedNormal = Mmatrix * vec4(position, 1);'+
            '  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);'+
            '  vLighting = ambientLight + (directionalLightColor * directional);'+
            '} ';

        let fragCode = 'precision mediump float;' +
            'varying vec2 fragTexCoord;' +
            'uniform sampler2D sampler;' +            
            'varying highp vec3 vLighting;'+
            'void main(void) {' +
            ' highp vec4 texelColor = texture2D(sampler, fragTexCoord);'+
            ' gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);'+
            ' } ';
        let vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, vertCode);
        this.gl.compileShader(vertShader);
        let fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
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

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.model.textcoordBuffer);
        var texCoordAttribLocation = this.gl.getAttribLocation(this.programShader, 'vertTexCoord');
        this.gl.vertexAttribPointer(texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(texCoordAttribLocation);

        this.PmatrixAddress = this.gl.getUniformLocation(this.programShader, "Pmatrix");
        this.VmatrixAddress = this.gl.getUniformLocation(this.programShader, "Vmatrix");
        this.MmatrixAddress = this.gl.getUniformLocation(this.programShader, "Mmatrix");
        this.gl.useProgram(this.programShader);
    }
}