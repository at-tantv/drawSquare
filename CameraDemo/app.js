var App = /** @class */ (function () {
    function App(canvas) {
        var _this = this;
        this.canvas = null;
        this.glMain = null;
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
            _this.glMain.clear(_this.glMain.COLOR_BUFFER_BIT | _this.glMain.DEPTH_BUFFER_BIT);
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
        this.prepareDraw();
        var model = new Model(this.canvas, this.glMain);
        model.init();
        var texture = new Texture(this.canvas, this.glMain);
        texture.init();
        var shader = new Shader(model, this.glMain);
        shader.init();
        this.camera = new Camera();
        this.camera.init(this.canvas, shader);
        var object3D1 = new Object3D(model, shader, texture, this.canvas, this.glMain);
        object3D1.init();
        object3D1.setTranslate(new Vector3(0, 0, -12));
        object3D1.setScale(1);
        this.object3Ds.push(object3D1);
        this.render(0);
    };
    App.prototype.noscroll = function () {
        window.scrollTo(0, 0);
    };
    App.prototype.prepareDraw = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.glMain = this.canvas.getContext('experimental-webgl');
        window.addEventListener('scroll', this.noscroll);
        this.glMain.enable(this.glMain.DEPTH_TEST);
        //this.glMain.enable(this.glMain.CULL_FACE)
        this.glMain.depthFunc(this.glMain.LEQUAL);
        this.glMain.clearColor(0.5, 0.5, 0.5, 0.9);
        this.glMain.clearDepth(1.0);
        this.glMain.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
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