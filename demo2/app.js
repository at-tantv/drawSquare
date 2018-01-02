var square = null;
window.onload = function () {
    var canvas = document.getElementById('my-canvas');
    square = new Squad(canvas);
    square.init();
    square.render();
};
