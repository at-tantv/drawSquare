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
        var fileHelper = FileHelper.init("/data/vn_bank/NganHangNhaNuocVietNam.txt", function () {
            var model = new Model(_this.canvas, _this.gl);
            model.init();
            var texture = new Texture(_this.canvas, _this.gl);
            texture.init();
            var shader = new Shader(model, _this.gl);
            shader.init();
            _this.camera = new Camera();
            _this.camera.init(_this.canvas, shader);
            var object3D1 = new Object3D(model, shader, texture, _this.canvas, _this.gl);
            object3D1.init();
            object3D1.setTranslate(new Vector3(0, 0, -106));
            object3D1.setScale(1 / 3);
            _this.object3Ds.push(object3D1);
            _this.render(0);
        });
    };
    App.prototype.noscroll = function () {
        window.scrollTo(0, 0);
    };
    App.prototype.prepareDraw = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('experimental-webgl');
        window.addEventListener('scroll', this.noscroll);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
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