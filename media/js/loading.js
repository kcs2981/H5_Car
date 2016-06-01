(function(b) {
    b.fn.fakeLoader = function(m) {
        var f = b.extend({
            timeToHide: 1000,
            pos: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            zIndex: "999",
            bgColor: "#2ecc71",
            spinner: "spinner7",
            imagePath: "" ,
            callBack:"",
        }, m);
        var l = '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        var k = '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        var j = '<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>';
        var i = '<div class="fl spinner4"></div>';
        var h = '<div class="fl spinner5"><div class="cube1"></div><div class="cube2"></div></div>';
        var g = '<div class="fl spinner6"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
        var e = '<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>';
        var d = b(this);
        var c = {
            position: f.pos,
            width: f.width,
            height: f.height,
            top: f.top,
            left: f.left
        };
        d.css(c);
        d.each(function() {
            var n = f.spinner;
            switch (n) {
                case "spinner1":
                    d.html(l);
                    break;
                case "spinner2":
                    d.html(k);
                    break;
                case "spinner3":
                    d.html(j);
                    break;
                case "spinner4":
                    d.html(i);
                    break;
                case "spinner5":
                    d.html(h);
                    break;
                case "spinner6":
                    d.html(g);
                    break;
                case "spinner7":
                    d.html(e);
                    break;
                default:
                    d.html(l)
            }
            if (f.imagePath != "") {
                d.html('<div class="fl"><img src="' + f.imagePath + '"></div>');
                a()
            }
        });
        setTimeout(function() {
            b(d).hide();
            if(typeof(f.callBack) == "function"){
                f.callBack();
            }
        }, f.timeToHide);
        return this.css({
            backgroundColor: f.bgColor,
            zIndex: f.zIndex
        })
    };
}(jQuery));

