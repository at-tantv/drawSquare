class StringHelper {

    static count(string, char): number {
        var re = new RegExp(char, "gi");
        if (string.match(re) == null) {
            return 0;
        } else {
            return string.match(re).length;
        }
    }
}
