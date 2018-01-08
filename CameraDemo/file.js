var FileHelper = /** @class */ (function () {
    function FileHelper() {
    }
    FileHelper.init = function (url, callback) {
        var _this = this;
        this.positionArrays = new Array();
        this.textCoordArrays = new Array();
        this.faceArrays = new Array();
        this.readFileToArray(url, function (data) {
            for (var i = 0; i < data.length; i++) {
                if (StringHelper.count(data[i], "  ") > 0) {
                    data[i] = data[i].replace("  ", " ");
                }
                var lines = data[i].split(" ");
                if (lines.length > 3) {
                    var vec3 = new Vector3(lines[1], lines[2], lines[3]);
                    switch (lines[0]) {
                        case "v":
                            _this.positionArrays.push(vec3);
                            break;
                        case "vt":
                            _this.textCoordArrays.push(vec3);
                            break;
                        case "f":
                            _this.faceArrays.push(vec3);
                            break;
                    }
                }
            }
            onload = callback(callback);
        });
    };
    FileHelper.readFileToArray = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    var textResult = request.responseText;
                    var lines = textResult.split("\r\n");
                    var arrayResults = new Array();
                    for (var i = 0; i < lines.length; i++) {
                        arrayResults.push(lines[i]);
                    }
                    request.onload = callback(arrayResults);
                }
            }
        };
    };
    FileHelper.textCoordArrays = null;
    FileHelper.positionArrays = null;
    FileHelper.faceArrays = null;
    return FileHelper;
}());
//# sourceMappingURL=file.js.map