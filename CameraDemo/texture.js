var Texture = /** @class */ (function () {
    function Texture(canvas) {
        this.canvas = null;
        this.texture = null;
        this.url = "https://c1.staticflickr.com/5/4641/25459647538_b2521aa242.jpg";
        this.canvas = canvas;
    }
    Texture.prototype.init = function () {
        var gl = this.canvas.getContext('experimental-webgl');
        this.texture = this.loadTexture(gl, this.url);
    };
    Texture.prototype.loadTexture = function (gl, url) {
        var _this = this;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        var level = 0;
        var internalFormat = gl.RGBA;
        var width = 1;
        var height = 1;
        var border = 0;
        var srcFormat = gl.RGBA;
        var srcType = gl.UNSIGNED_BYTE;
        var pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
        var image = new Image();
        image.crossOrigin = "";
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image);
            if (_this.isPowerOf2(image.width) && _this.isPowerOf2(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            }
            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
        return texture;
    };
    Texture.prototype.isPowerOf2 = function (value) {
        return (value & (value - 1)) == 0;
    };
    return Texture;
}());
//# sourceMappingURL=texture.js.map