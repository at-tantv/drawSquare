
class Squad {
    canvas: any = null;
    gl: any = null;
    texture: any = null;
    pMatrix: any = null;
    vMatrix: any = null;
    mMatrix: any = null;
    matrix: any = null;
    proj_matrix: any = null;
    time = 0;
    currentTime = 0;

    vertices = [
        -1, -1, -1,  1, -1, -1,  1,  1, -1, -1,  1, -1,
        -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,  1,
        -1, -1, -1, -1,  1, -1, -1,  1,  1, -1, -1,  1,
         1, -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,
        -1, -1, -1, -1, -1,  1,  1, -1,  1,  1, -1, -1,
        -1,  1, -1, -1,  1,  1,  1,  1,  1,  1,  1, -1,
    ];

    indices = [
        0,  1,  2,   0,  2,  3,
        4,  5,  6,   4,  6,  7,
        8,  9,  10,  8,  10, 11,
        12, 13, 14,  12, 14, 15,
        16, 17, 18,  16, 18, 19,
        20, 21, 22,  20, 22, 23,
    ];

    texCoords = [
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
    ];
 
    constructor(canvas) {
        this.canvas = canvas;
    }

    init() {
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
            'uniform mat4 pMatrix;' +
            'uniform mat4 vMatrix;' +
            'uniform mat4 mMatrix;' +
            'void main(void) { ' +
            '  gl_Position = pMatrix*vMatrix*mMatrix*vec4(position, 1.);' +
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
        this.texture = Helper.loadTexture(this.gl, "https://c1.staticflickr.com/5/4641/25459647538_b2521aa242.jpg");

        this.pMatrix = this.gl.getUniformLocation(program, "pMatrix");
        this.vMatrix = this.gl.getUniformLocation(program, "vMatrix");
        this.mMatrix = this.gl.getUniformLocation(program, "mMatrix");
        this.matrix = new Matrix();
        this.proj_matrix = this.matrix.getProMatrix(this.canvas);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
        this.gl.clearDepth(1.0);
        this.gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    }

    update(dt) {
        this.matrix.rotateZ(this.matrix.mov_matrix, dt * 0.7);
        this.matrix.rotateY(this.matrix.mov_matrix, dt * 0.5);
        this.matrix.rotateX(this.matrix.mov_matrix, dt * 0.9);
        this.gl.uniformMatrix4fv(this.pMatrix, false, this.proj_matrix);
        this.gl.uniformMatrix4fv(this.vMatrix, false, this.matrix.view_matrix);
        this.gl.uniformMatrix4fv(this.mMatrix, false, this.matrix.mov_matrix);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
  
    render = () => {   
        var dt = this.time - this.currentTime;
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);    
        this.update(dt);
        this.currentTime = this.time;
        this.time += 0.01;
        window.requestAnimationFrame(this.render);
    }
    
}
