var FrameBuffer = /** @class */ (function () {
    function FrameBuffer(gl, canvas) {
        this.position = null;
        this.scale = 1;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.frameBuffer = null;
        this.texture = null;
        this.gl = null;
        this.gl = gl;
        this.canvas = canvas;
    }
    FrameBuffer.prototype.init = function () {
        this.position = new Vector3(0, 0, -7);
        var targetTextureWidth = this.canvas.width;
        var targetTextureHeight = this.canvas.height;
        var level = 0;
        var internalFormat = this.gl.RGBA;
        var border = 0;
        var format = this.gl.RGBA;
        var type = this.gl.UNSIGNED_BYTE;
        var data = null;
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
    };
    FrameBuffer.prototype.render = function (camera, shader, model) {
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
    };
    FrameBuffer.prototype.getWorldMatrix = function () {
        //this.rotationZ += 0.3;
        //this.rotationX += 0.2;
        //this.rotationY += 0.1;
        var scaleMatrix = Matrix4.scale(this.scale);
        var rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        var translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    };
    return FrameBuffer;
}());
//# sourceMappingURL=framebuffer.js.map