(function (event) {
    var i = 0;
    var text = document.querySelector("h1").style;
    function some() {

        if (i <= 6) {
            i++;
            if (i % 2 == 1) {
                text.textTransform = "upperCase";
            }
            else {
                text.textTransform = "lowercase";
            }
            window.setTimeout(some, 250);
        }
    }
some();
})();