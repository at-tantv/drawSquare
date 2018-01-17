class FrameBuffer {
    position: Vector3 = null;
    scale = 1;
    rotationX = 0;
    rotationY = 0;
    rotationZ = 0;

    frameBuffer: any = null;
    texture: any = null;
    canvas: any;
    gl: any = null;

    constructor(gl, canvas) {
        this.gl = gl;
        this.canvas = canvas
    }

    init() {
        this.position = new Vector3(0, 0, -7);
        const targetTextureWidth = this.canvas.width;
        const targetTextureHeight = this.canvas.height;
        
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const border = 0;
        const format = this.gl.RGBA;
        const type = this.gl.UNSIGNED_BYTE;
        const data = null;

        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat, targetTextureWidth, targetTextureHeight, border, format, type, data);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.frameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.frameBuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, level);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    render(camera, shader, model) {
        this.gl.useProgram(shader.programShader);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vertexBuffer);
        this.gl.vertexAttribPointer(shader.coordLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(shader.coordLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.textcoordBuffer);
        this.gl.vertexAttribPointer(shader.texCoordAttribLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(shader.texCoordAttribLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);

        this.gl.uniformMatrix4fv(shader.mlocation, false, this.getWorldMatrix().buffer());
        var viewMatrix = camera.getWorldMatrix().inverse();
        this.gl.uniformMatrix4fv(shader.vLocaion, false, viewMatrix.buffer());
        this.gl.uniformMatrix4fv(shader.pLocation, false, camera.projectMatrix.buffer());
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, 36, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    getWorldMatrix() {     
        //this.rotationZ += 0.3;
        //this.rotationX += 0.2;
        //this.rotationY += 0.1;
        let scaleMatrix = Matrix4.scale(this.scale);
        let rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        let translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    }

}
