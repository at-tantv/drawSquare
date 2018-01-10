class Model {

    vertexBuffer: any = null;
    indexBuffer: any = null;
    textcoordBuffer: any = null;
    canvas: any = null;
    gl: any = null;
    constructor(canvas, gl) {
        this.canvas = canvas;
        this.gl = gl;
    }
    vertices = [
        -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
        -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1,
        -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1,
        1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1,
        -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1,
        -1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,
    ];
    indices = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23,
    ]

    texCoords = [
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
    ]

    init() {
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
    }

    initVerticesAndTextCoords() {
        for (let i = 0; i < FileHelper.faceArrays.length; i++) {            
            let linesX = FileHelper.faceArrays[i].x.split("/");
            this.updateVerticesAndTextCoords(linesX);
            let linesY = FileHelper.faceArrays[i].y.split("/");
            this.updateVerticesAndTextCoords(linesY);
            let linesZ = FileHelper.faceArrays[i].z.split("/");
            this.updateVerticesAndTextCoords(linesZ);
        }
    }

    updateVerticesAndTextCoords(data) {
        if (data.length >= 3) {
            let positionObject: Vector3 = FileHelper.positionArrays[data[0]-1];
            let textCoordObject = FileHelper.textCoordArrays[data[1]-1];
            this.vertices.push(positionObject.x);
            this.vertices.push(positionObject.y);
            this.vertices.push(positionObject.z);

            this.texCoords.push(textCoordObject.x);
            this.texCoords.push(textCoordObject.y);
            this.texCoords.push(textCoordObject.z);
            
        }
    }

}
