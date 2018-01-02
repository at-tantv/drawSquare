
var square = null;

window.onload = () => {
    var canvas = document.getElementById('my-canvas');
    square = new Squad(canvas);
    square.init();
    square.render();
}
