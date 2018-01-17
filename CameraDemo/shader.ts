class Shader {
    programShader = null;    
    pLocation: any = null;
    vLocaion: any = null;
    mlocation: any = null;
    lightLocation: any = null;
    gl: any = null;

    coordLocation: any = null;
    normalLocation: any = null;
    texCoordAttribLocation: any = null;

    constructor(model, gl){        
        this.gl = gl;
    }

    init() {

        let vertCode = 'attribute vec3 position;' +
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

        let fragCode = 'precision mediump float;' +
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
            'vec3 vColor = ka * ambientColor + kd * lambertian * diffuseColor + ks * specular * specularColor;'+
            'vec4 texelColor = texture2D(sampler, fragTexCoord);' +
            'gl_FragColor = vec4(texelColor.rgb * vColor, texelColor.a);'+
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

        this.coordLocation = this.gl.getAttribLocation(this.programShader, "position");
        this.normalLocation = this.gl.getAttribLocation(this.programShader, "normal");
        this.texCoordAttribLocation = this.gl.getAttribLocation(this.programShader, 'vertTexCoord');

        this.pLocation = this.gl.getUniformLocation(this.programShader, "Pmatrix");
        this.vLocaion = this.gl.getUniformLocation(this.programShader, "Vmatrix");
        this.mlocation = this.gl.getUniformLocation(this.programShader, "Mmatrix");
        this.lightLocation = this.gl.getUniformLocation(this.programShader, "lightPosition");        
    }

    initFrameBuffer() {

        let vertCode = 'attribute vec3 position;' +
            'attribute vec2 vertTexCoord;' +
            'varying vec3 vPosition;' +
            'varying vec2 fragTexCoord;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'void main(void) { ' +
            '  vPosition = position;' +
            '  fragTexCoord = vertTexCoord;' +
            '  gl_Position = vec4(position, 1);' +
            '} ';

        let fragCode = 'precision mediump float;' +
            'varying vec2 fragTexCoord;' +
            'varying vec3 vPosition;' +
            'uniform sampler2D sampler;' +
            'void main(void) {' +
            'gl_FragColor = texture2D(sampler, fragTexCoord);' +
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

        this.coordLocation = this.gl.getAttribLocation(this.programShader, "position");
        this.texCoordAttribLocation = this.gl.getAttribLocation(this.programShader, 'vertTexCoord');

        this.pLocation = this.gl.getUniformLocation(this.programShader, "Pmatrix");
        this.vLocaion = this.gl.getUniformLocation(this.programShader, "Vmatrix");
        this.mlocation = this.gl.getUniformLocation(this.programShader, "Mmatrix");
    }
}