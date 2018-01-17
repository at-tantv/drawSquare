var App = /** @class */ (function () {
    function App(canvas) {
        var _this = this;
        this.canvas = null;
        this.glMain = null;
        this.camera = null;
        this.shader = null;
        this.model = null;
        this.viewMatrix = null;
        this.frameBufferObject = null;
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
        this.isTranslate = false;
        this.render = function (time) {
            //this.glMain.bindFramebuffer(this.glMain.FRAMEBUFFER, this.frameBufferObject.frameBuffer);
            _this.glMain.clear(_this.glMain.COLOR_BUFFER_BIT | _this.glMain.DEPTH_BUFFER_BIT);
            var dt = time - _this.time_old;
            for (var i = 0; i < _this.object3Ds.length; i++) {
                if (i == 1) {
                    var pos0W = _this.object3Ds[0].position;
                    var pos1W = _this.object3Ds[1].position;
                    var world0 = _this.object3Ds[0].getWorldMatrix();
                    var post1Local = world0.inverse().transform(pos1W, 1.0);
                    var alpha = Math.atan(post1Local.y / post1Local.x) * 180 / Math.PI;
                    var rotateZ = Matrix4.rotateZ(-alpha);
                    var rotateOX = Matrix4.rotateY(1);
                    var rotateInvertZ = Matrix4.rotateZ(+alpha);
                    post1Local = rotateZ.transform(post1Local, 1.0);
                    post1Local = rotateOX.transform(post1Local, 1.0);
                    post1Local = rotateInvertZ.transform(post1Local, 1.0);
                    //Đưa về world
                    var rPos1W = world0.transform(post1Local, 1.0);
                    //Gán lại
                    _this.object3Ds[1].position = rPos1W;
                }
                _this.object3Ds[i].render(_this.camera);
            }
            //this.glMain.bindFramebuffer(this.glMain.FRAMEBUFFER, null);
            //this.glMain.clear(this.glMain.COLOR_BUFFER_BIT | this.glMain.DEPTH_BUFFER_BIT);
            //let testShader = new Shader(this.model, this.glMain);
            //testShader.initFrameBuffer();
            //this.frameBufferObject.render(this.camera, testShader, this.model);
            _this.time_old = time;
            window.requestAnimationFrame(_this.render);
        };
        this.canvas = canvas;
    }
    App.prototype.init = function () {
        this.prepareDraw();
        this.model = new Model(this.canvas, this.glMain);
        this.model.init();
        var texture = new Texture(this.canvas, this.glMain);
        texture.init();
        this.shader = new Shader(this.model, this.glMain);
        this.shader.init();
        this.camera = new Camera();
        this.camera.init(this.canvas, this.shader);
        this.frameBufferObject = new FrameBuffer(this.glMain, this.canvas);
        this.frameBufferObject.init();
        var status = this.glMain.checkFramebufferStatus(this.glMain.FRAMEBUFFER);
        if (status == this.glMain.FRAMEBUFFER_COMPLETE) {
            var object3D1 = new Object3D(this.model, this.shader, texture, this.canvas, this.glMain);
            object3D1.init();
            object3D1.setTranslate(new Vector3(2, -1, -17));
            object3D1.setScale(1);
            this.object3Ds.push(object3D1);
            var object3D2 = new Object3D(this.model, this.shader, texture, this.canvas, this.glMain);
            object3D2.init();
            object3D2.setTranslate(new Vector3(6, 1, -22));
            object3D2.setScale(1);
            this.object3Ds.push(object3D2);
            this.render(0);
        }
        else {
            console.log("init frame buffer error");
        }
    };
    App.prototype.noscroll = function () {
        window.scrollTo(0, 0);
    };
    App.prototype.prepareDraw = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.glMain = this.canvas.getContext('experimental-webgl');
        window.addEventListener('scroll', this.noscroll);
        this.glMain.clearColor(0.5, 0.5, 0.5, 0.9);
        //this.glMain.clearDepth(0.0);
        this.glMain.enable(this.glMain.DEPTH_TEST);
        this.glMain.enable(this.glMain.CULL_FACE);
        //this.glMain.depthFunc(this.glMain.LESS);
        this.glMain.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    };
    return App;
}());
window.onload = function () {
    var canvas = document.getElementById('my-canvas');
    var app = new App(canvas);
    app.init();
    document.addEventListener('keydown', function (event) {
        var speed = 3.0;
        switch (event.key) {
            case "ArrowDown":
                app.camera.rotationX -= 0.2 * speed;
                break;
            case "ArrowUp":
                app.camera.rotationX += 0.2 * speed;
                break;
            case "ArrowLeft":
                app.camera.rotationY -= 0.2 * speed;
                break;
            case "ArrowRight":
                app.camera.rotationY += 0.2 * speed;
                break;
            default:
                switch (event.which) {
                    case 65:
                        app.camera.translateX(-1);
                        break;
                    case 68:
                        app.camera.translateX(1);
                        break;
                    case 87:
                        app.camera.translateZ(-1);
                        break;
                    case 83:
                        app.camera.translateZ(1);
                        break;
                    case 98:
                        console.log("case2" + event.which);
                        app.camera.lightPosition.z -= 1;
                        break;
                    case 100:
                        console.log("case4" + event.which);
                        app.camera.lightPosition.x -= 1;
                        break;
                    case 102:
                        console.log("case6" + event.which);
                        app.camera.lightPosition.x += 1;
                        break;
                    case 104:
                        console.log("case8" + event.which);
                        app.camera.lightPosition.z += 1;
                        break;
                    default:
                        console.log("case other" + event.which);
                        break;
                }
        }
    });
};
//# sourceMappingURL=app.js.map