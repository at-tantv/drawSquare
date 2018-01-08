class App {
    
    canvas: any = null;
    gl: any = null;
    camera: Camera = null;
    viewMatrix: Matrix4 = null;
  
    object3Ds: Object3D[] = new Array();


    AMORTIZATION = 0.9;
    PHI = 0;
    THETA = 0;
    dX = 0;
    dY = 0;
    tempDx = 0;
    tempDy = 0;
    drag = false;
    old_x;
    old_y;
    time_old = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }
    init() {
        this.prepareDraw();
        var fileHelper = FileHelper.init("/data/vn_bank/NganHangNhaNuocVietNam.txt", () => {
            var model = new Model(this.canvas, this.gl);
            model.init();

            var texture = new Texture(this.canvas, this.gl);
            texture.init();
            var shader = new Shader(model, this.gl);
            shader.init();

            this.camera = new Camera();
            this.camera.init(this.canvas, shader);

            var object3D1 = new Object3D(model, shader, texture, this.canvas, this.gl);
            object3D1.init();
            object3D1.setTranslate(new Vector3(0, 0, -106));
            object3D1.setScale(1 / 3);
            this.object3Ds.push(object3D1);
            this.render(0);
        });
    }
  
    render = (time) => {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        var dt = time - this.time_old;
        for (let i = 0; i < this.object3Ds.length; i++) {
            this.object3Ds[i].render(this.camera);
        }
        this.time_old = time; 
        window.requestAnimationFrame(this.render);
    }

    noscroll() {
        window.scrollTo(0, 0);
    }

    prepareDraw() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl = this.canvas.getContext('experimental-webgl');
        window.addEventListener('scroll', this.noscroll);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE)
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
        this.gl.clearDepth(1.0);
        this.gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    }

}



window.onload = () => {
    var xyz = 0.5;
    var canvas = document.getElementById('my-canvas');    
    var app = new App(canvas);
    app.init();
    document.addEventListener('keydown', (event) => {
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
}
