
class Object3D {
    model:   Model = null;
    shader:  Shader = null;
    texture: Texture = null;

    position: Vector3 = null;
    scale = 1;
    rotationX = 40;
    rotationY = 40;
    rotationZ = 40;

    canvas: any = null;

    constructor(model, shader, texture, canvas) {
        this.model = model;
        this.shader = shader;
        this.texture = texture;
        this.canvas = canvas;
    }

    init() {
        this.position = new Vector3(0, 0, 0);
    }


    render(camera) {
        var gl = this.canvas.getContext('experimental-webgl');
        //Tinh World Matrix
        gl.uniformMatrix4fv(this.shader.MmatrixAddress, false, this.getWorldMatrix().buffer());
        //View Matrix Camera
        var viewMatrix = camera.getWorldMatrix().inverse();
        gl.uniformMatrix4fv(this.shader.VmatrixAddress, false, viewMatrix.buffer());
        //Ve Hinh
        gl.bindTexture(gl.TEXTURE_2D, this.texture.texture);
        gl.activeTexture(gl.TEXTURE0);
        gl.drawElements(gl.TRIANGLES, this.model.indices.length, gl.UNSIGNED_SHORT, 0);
    }


    setScale(scale) {
        this.scale = scale;
    }

    setRotateX(xAngle) {
        this.rotationX = xAngle;
    }

    setRotateY(yAngle) {
        this.rotationY = yAngle;
    }

    setRotateZ(zAngle) {
        this.rotationZ = zAngle;        
    }

    setTranslate(vec3: Vector3) {
        this.position.x = vec3.x;
        this.position.y = vec3.y;
        this.position.z = vec3.z;
    }

    getWorldMatrix() {
        let scaleMatrix = Matrix4.scale(this.scale);
        let rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        let translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    }

}
