var App = /** @class */ (function () {
    function App(canvas) {
        var _this = this;
        this.canvas = null;
        this.gl = null;
        this.camera = null;
        this.viewMatrix = null;
        this.object3Ds = new Array();
        this.AMORTIZATION = 0.9;
        this.PHI = 0;
        this.THETA = 0;
        this.dX = 0;
        this.dY = 0;
        this.tempDx = 0;
        this.tempDy = 0;
        this.drag = false;
        this.time_old = 0;
        this.render = function (time) {
            _this.gl.clear(_this.gl.COLOR_BUFFER_BIT | _this.gl.DEPTH_BUFFER_BIT);
            var dt = time - _this.time_old;
            for (var i = 0; i < _this.object3Ds.length; i++) {
                _this.object3Ds[i].render(_this.camera);
            }
            _this.time_old = time;
            window.requestAnimationFrame(_this.render);
        };
        this.canvas = canvas;
    }
    App.prototype.init = function () {
        var _this = this;
        this.prepareDraw();
        //-------------------------------------------
        var model = new Model(this.canvas);
        model.init();
        var texture = new Texture(this.canvas);
        texture.init();
        var shader = new Shader(model);
        shader.init();
        this.camera = new Camera();
        this.camera.init(this.canvas, shader);
        var object3D1 = new Object3D(model, shader, texture, this.canvas);
        object3D1.init();
        object3D1.setTranslate(new Vector3(0, 0, -16));
        object3D1.setScale(1 / 3);
        var object3D2 = new Object3D(model, shader, texture, this.canvas);
        object3D2.init();
        object3D2.setTranslate(new Vector3(-2, -1, -1));
        object3D2.setScale(1 / 3);
        var object3D3 = new Object3D(model, shader, texture, this.canvas);
        object3D3.init();
        object3D3.setTranslate(new Vector3(2, -1, -1));
        object3D3.setScale(1 / 3);
        var object3D4 = new Object3D(model, shader, texture, this.canvas);
        object3D4.init();
        object3D4.setTranslate(new Vector3(-1, 1, 1));
        object3D4.setScale(1 / 3);
        //-------------------------------------------
        this.object3Ds.push(object3D1);
        this.object3Ds.push(object3D2);
        this.object3Ds.push(object3D3);
        this.object3Ds.push(object3D4);
        var mouseDown = function (e) {
            console.log("drag move");
            _this.drag = true;
            _this.old_x = e.pageX;
            _this.old_y = e.pageY;
            e.preventDefault();
            return false;
        };
        var mouseUp = function (e) {
            console.log("drag move");
            _this.drag = false;
        };
        var mouseMove = function (e) {
            if (!_this.drag)
                return false;
            _this.dX = (e.pageX - _this.old_x) * 2 * Math.PI / _this.canvas.width,
                _this.dY = (e.pageY - _this.old_y) * 2 * Math.PI / _this.canvas.height;
            console.log("dx=" + _this.dX);
            console.log("dY=" + _this.dY);
            _this.THETA += _this.dX;
            _this.PHI += _this.dY;
            _this.old_x = e.pageX;
            _this.old_y = e.pageY;
            if ((_this.tempDx - _this.dX) * (_this.tempDy - _this.dY) > 0) {
                _this.camera.rotationZ -= _this.THETA * _this.PHI * 5;
                _this.camera.rotationX -= _this.THETA * _this.PHI * 3;
                _this.camera.rotationY -= _this.THETA * _this.PHI * 2;
            }
            else {
                _this.camera.rotationZ += _this.THETA * _this.PHI * 5;
                _this.camera.rotationX += _this.THETA * _this.PHI * 3;
                _this.camera.rotationY += _this.THETA * _this.PHI * 2;
            }
            _this.tempDx = _this.dX;
            _this.tempDy = _this.dY;
            e.preventDefault();
        };
        this.canvas.addEventListener("mousedown", mouseDown, false);
        this.canvas.addEventListener("mouseup", mouseUp, false);
        this.canvas.addEventListener("mouseout", mouseUp, false);
        this.canvas.addEventListener("mousemove", mouseMove, false);
    };
    App.prototype.noscroll = function () {
        window.scrollTo(0, 0);
    };
    App.prototype.prepareDraw = function () {
        this.gl = this.canvas.getContext('experimental-webgl');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        window.addEventListener('scroll', this.noscroll);
        this.gl.enable(this.gl.DEPTH_TEST);
        //this.gl.enable(this.gl.CULL_FACE)
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
        this.gl.clearDepth(1.0);
        this.gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    };
    return App;
}());
window.onload = function () {
    var xyz = 0.5;
    var canvas = document.getElementById('my-canvas');
    var app = new App(canvas);
    app.init();
    app.render(0);
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case "ArrowDown":
                app.camera.translateZ(1);
                break;
            case "ArrowUp":
                app.camera.translateZ(-1);
                break;
            case "ArrowLeft":
                app.camera.translateX(-1);
                break;
            case "ArrowRight":
                app.camera.translateX(1);
                break;
        }
    });
};
//# sourceMappingURL=app.js.map