var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.count = function (string, char) {
        var re = new RegExp(char, "gi");
        if (string.match(re) == null) {
            return 0;
        }
        else {
            return string.match(re).length;
        }
    };
    return StringHelper;
}());
//# sourceMappingURL=string.js.map