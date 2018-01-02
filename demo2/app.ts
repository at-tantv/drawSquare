
var square = null;

window.onload = () => {
    var canvas = document.getElementById('my-canvas');
    square = new Squad(canvas);
    square.init();
    square.render();
}

class Matrix {
    mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    proj_matrix: any = null;

    getProMatrix(canvas) {
        this.proj_matrix = this.getProjection(40, canvas.width / canvas.height, 1, 100);
    }

    getProjection(angle, a, zMin, zMax) {
           var ang = Math.tan((angle * .5) * Math.PI / 180);
           return [
               0.5 / ang, 0, 0, 0,
               0, 0.5 * a / ang, 0, 0,
               0, 0, -(zMax + zMin) / (zMax - zMin), -1,
               0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
           ];
    }

    rotateZ(m, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv0 = m[0], mv4 = m[4], mv8 = m[8];

        m[0] = c * m[0] - s * m[1];
        m[4] = c * m[4] - s * m[5];
        m[8] = c * m[8] - s * m[9];

        m[1] = c * m[1] + s * mv0;
        m[5] = c * m[5] + s * mv4;
        m[9] = c * m[9] + s * mv8;
    }

    rotateX(m, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv1 = m[1], mv5 = m[5], mv9 = m[9];

        m[1] = m[1] * c - m[2] * s;
        m[5] = m[5] * c - m[6] * s;
        m[9] = m[9] * c - m[10] * s;

        m[2] = m[2] * c + mv1 * s;
        m[6] = m[6] * c + mv5 * s;
        m[10] = m[10] * c + mv9 * s;
    }

    rotateY(m, angle) {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var mv0 = m[0], mv4 = m[4], mv8 = m[8];

        m[0] = c * m[0] + s * m[2];
        m[4] = c * m[4] + s * m[6];
        m[8] = c * m[8] + s * m[10];

        m[2] = c * m[2] - s * mv0;
        m[6] = c * m[6] - s * mv4;
        m[10] = c * m[10] - s * mv8;
    }
}