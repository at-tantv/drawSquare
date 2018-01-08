class Vector3 {
    constructor(public x: number = 0.0,
                public y: number = 0.0,
                public z: number = 0.0) {
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    getLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    set(a: Vector3) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
    }

    invert() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    rotate90() {
        return new Vector3(this.y, -this.x, this.z);
    }

    add(a: Vector3) {
        return new Vector3(this.x + a.x, this.y + a.y, this.z + a.z);
    }

    subtract(a: Vector3) {
        if (!a) {
            return this.clone();
        }
        return new Vector3(this.x - a.x, this.y - a.y, this.z - a.z);
    }
    multiply(a: number) {
        return new Vector3(a * this.x, a * this.y, a * this.z);
    }

    rotateBy(a: number) {
        var cos = Math.cos(a * Math.PI / 180);
        var sin = Math.sin(a * Math.PI / 180);
        return new Vector3(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }

    cross(a: Vector3) {
        return new Vector3(
            this.y * a.z - this.z * a.y,
            this.z * a.x - this.x * a.z,
            this.x * a.y - this.y * a.x
        );
    }
    dot(a: Vector3) {
        return a.x * this.x + a.y * this.y + a.z * this.z;
    }

    getX() {
        return this.x;
    }

}