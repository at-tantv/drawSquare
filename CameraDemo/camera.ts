class Camera {
    position: Vector3 = new Vector3(0, 0, 0);
    scale: number = 1;
    rotationX: number = 0;
    rotationY: number = 0;
    rotationZ: number = 0;
    lightPosition: Vector3 = new Vector3(0, 0, 0);
    projectMatrix: Matrix4 = null;

    constructor(public data: number[][] = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]) {
    }

    init(canvas, shader) {
        var gl = canvas.getContext('experimental-webgl');
        this.projectMatrix = Matrix4.perspective(45, canvas.width / canvas.height, 0.1, 1000);        
    }

    setScale(scale) {
        this.scale = scale;
    }

    setPosition(vec3: Vector3) {
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

    translateZ(z) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(0, 0, z);
        var vector3InWorldMatrix: Vector3 = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    }

    translateX(x) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(x, 0, 0);
        var vector3InWorldMatrix: Vector3 = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    }
    translateY(y) {
        var worldMatrix = this.getWorldMatrix();
        var vector3Unit = new Vector3(0, y, 0);
        var vector3InWorldMatrix: Vector3 = worldMatrix.transform(vector3Unit);
        this.position.x += vector3InWorldMatrix.x;
        this.position.y += vector3InWorldMatrix.y;
        this.position.z += vector3InWorldMatrix.z;
    }

}   
