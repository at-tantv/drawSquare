class FileHelper {
    static textCoordArrays = null;
    static positionArrays = null;
    static faceArrays = null;

    static init(url, callback) {
        this.positionArrays = new Array();
        this.textCoordArrays = new Array();
        this.faceArrays = new Array();
        this.readFileToArray(url, (data) => {
            for (let i = 0; i < data.length; i++) {
                if (StringHelper.count(data[i], "  ") > 0) {
                    data[i] = data[i].replace("  ", " ");
                }
                let lines = data[i].split(" ");
                if (lines.length > 3) {
                    var vec3: Vector3 = new Vector3(lines[1], lines[2], lines[3]);
                    switch (lines[0]) {
                        case "v":
                            this.positionArrays.push(vec3);
                            break;
                        case "vt":
                            this.textCoordArrays.push(vec3);
                            break;
                        case "f":
                            this.faceArrays.push(vec3);
                            break
                    }
                }
            }
            onload = callback(callback);
        })
        
    }

    static readFileToArray(url: string, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    let textResult = request.responseText;
                    let lines = textResult.split("\r\n");
                    let arrayResults = new Array();
                    for (let i = 0; i < lines.length; i++) {
                        arrayResults.push(lines[i]);
                    }
                    request.onload = callback(arrayResults);
                }
            }
        }
    }

}
