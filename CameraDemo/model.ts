﻿class Model {

    vertexBuffer: any = null;
    indexBuffer: any = null;
    textcoordBuffer: any = null;
    canvas: any = null;

    constructor(canvas) {
        this.canvas = canvas;
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
    ];

    texCoords = [
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
        0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0,
    ];

    init() {
        let gl = this.canvas.getContext('experimental-webgl');
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


        this.textcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

}
