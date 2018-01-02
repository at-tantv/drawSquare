
var square = null;

window.onload = () => {
    let canvas = document.getElementById('my-canvas');
    square = new Squad(canvas);
    square.init();
    square.render();
}
