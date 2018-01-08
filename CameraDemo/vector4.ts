class Vector4 {
    constructor(public x: number = 0.0,
        public y: number = 0.0,
        public z: number = 0.0,
        public t: number = 0.0) {
    }

    getById(id) {
        switch (id) {
            case 0:
                return this.x;
            case 1:
                return this.y;
            case 2:
                return this.z;
            case 3:
                return this.t;
            default:
                return null
        }
    }

    setValueById(id, value) {
        switch (id) {
            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            case 2:
                this.z = value;
                break
            case 3:
                this.t = value;
                break

        }
    }
}