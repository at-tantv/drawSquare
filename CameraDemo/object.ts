
class Object3D {
    model:   Model = null;
    shader:  Shader = null;
    texture: Texture = null;

    position: Vector3 = null;
    scale = 1;
    rotationX = 0;
    rotationY = 0;
    rotationZ = 0;
    gl: any = null;
    canvas: any = null;

    constructor(model, shader, texture, canvas, gl) {
        this.model = model;
        this.shader = shader;
        this.texture = texture;
        this.canvas = canvas;
        this.gl = gl;
    }

    init() {
        this.position = new Vector3(0, 0, 0);
    }


    render(camera) {
        console.log("xyz= " + JSON.stringify(camera.lightPosition));
        this.gl.uniform3f(this.shader.LightPositionAddress, camera.lightPosition.x, camera.lightPosition.y, camera.lightPosition.z);
        //Tinh World Matrix
        this.gl.uniformMatrix4fv(this.shader.MmatrixAddress, false, this.getWorldMatrix().buffer());
        //View Matrix Camera
        var viewMatrix = camera.getWorldMatrix().inverse();
        this.gl.uniformMatrix4fv(this.shader.VmatrixAddress, false, viewMatrix.buffer());
        //Ve Hinh
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture.texture);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.drawElements(this.gl.TRIANGLES, this.model.indices.length, this.gl.UNSIGNED_SHORT, 0);
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
        this.rotationZ += 0.3;
        this.rotationX += 0.2;
        this.rotationY += 0.1;
        let scaleMatrix = Matrix4.scale(this.scale);
        let rotateMatrix = Matrix4.rotateZ(this.rotationZ).concat(Matrix4.rotateX(this.rotationX)).concat(Matrix4.rotateY(this.rotationY));
        let translateMatrix = Matrix4.translate(this.position.x, this.position.y, this.position.z);
        return scaleMatrix.concat(rotateMatrix).concat(translateMatrix);
    }

}
