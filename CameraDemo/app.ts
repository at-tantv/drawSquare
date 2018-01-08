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
        object3D1.setTranslate(new Vector3(0,0,-16));
        object3D1.setScale(1/3);

        var object3D2 = new Object3D(model, shader, texture, this.canvas);
        object3D2.init();
        object3D2.setTranslate(new Vector3(-2, -1, -1));
        object3D2.setScale(1/3);

        var object3D3 = new Object3D(model, shader, texture, this.canvas);
        object3D3.init();
        object3D3.setTranslate(new Vector3(2, -1, -1));
        object3D3.setScale(1/3);

        var object3D4 = new Object3D(model, shader, texture, this.canvas);
        object3D4.init();
        object3D4.setTranslate(new Vector3(-1, 1, 1));
        object3D4.setScale(1 / 3);

        //-------------------------------------------
        this.object3Ds.push(object3D1);
        this.object3Ds.push(object3D2);
        this.object3Ds.push(object3D3);
        this.object3Ds.push(object3D4);        

        var mouseDown = (e) => {
            console.log("drag move");
            this.drag = true;
            this.old_x = e.pageX;
            this.old_y = e.pageY;
            e.preventDefault();
            return false;
        };

        var mouseUp = (e) => {
            console.log("drag move");
            this.drag = false;
        };

        
        var mouseMove = (e) => {
            
            if (!this.drag) return false;
            this.dX = (e.pageX - this.old_x) * 2 * Math.PI / this.canvas.width,
                this.dY = (e.pageY - this.old_y) * 2 * Math.PI / this.canvas.height;
            console.log("dx=" + this.dX);
            console.log("dY=" + this.dY);
            this.THETA += this.dX;
            this.PHI += this.dY;
            this.old_x = e.pageX
            this.old_y = e.pageY;
            if ((this.tempDx - this.dX) * (this.tempDy - this.dY) > 0) {
                this.camera.rotationZ -= this.THETA * this.PHI * 5;
                this.camera.rotationX -= this.THETA * this.PHI * 3;
                this.camera.rotationY -= this.THETA * this.PHI * 2;
            } else {
                this.camera.rotationZ += this.THETA * this.PHI * 5;
                this.camera.rotationX += this.THETA * this.PHI * 3;
                this.camera.rotationY += this.THETA * this.PHI * 2;
            }
            this.tempDx = this.dX;
            this.tempDy = this.dY;

            e.preventDefault();
        };
        this.canvas.addEventListener("mousedown", mouseDown, false);
        this.canvas.addEventListener("mouseup", mouseUp, false);
        this.canvas.addEventListener("mouseout", mouseUp, false);
        this.canvas.addEventListener("mousemove", mouseMove, false);

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
    }

}



window.onload = () => {
    var xyz = 0.5;
    var canvas = document.getElementById('my-canvas');
    var app = new App(canvas);
    app.init();
    app.render(0);
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
