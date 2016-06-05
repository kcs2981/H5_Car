$(function(){
    var w_width = $(window).width();
    var w_height =$(window).height();
    var kkk = new carWidge({//new一个carWidge实例
        "picArray":["media/images/run1.png","media/images/runRoadSlow.gif?112","media/images/runRoadSlowC.gif?112","media/images/runRoadFast.gif?112"],
        "element":$("#run_img"),
        "time":400,
        "start_nb":0
    });
    /*----------横竖屏切换判断------------*/
    var on_off = false;
    var imgHight = -$(".fakeloader").find("img").innerHeight()/2 +"px";
    function changeBgsize(){
        $("body").css({"width":w_width,"height":w_height});
        //if(w_width/w_height > 134/75){
        //    $(".car_content,.index_bg").css({"width":w_width,"height":w_width*75/134,"margin-top":(w_height -w_width*75/134)/2});
        //}else{
        //    $(".car_content,.index_bg").css({"width":w_height*134/75,"height":w_height,"margin-left":(w_width -w_height*134/75)/2});
        //}

        if (window.orientation == 0 || window.orientation == 180) {
            $(".car_content").remove();
            on_off = false;
            $(".index_bg").removeAttr("style").removeClass("dn").find("div").removeClass("dn");
            $(".fakeloader").find("img").addClass("v_h");
        }else if (window.orientation == 90 || window.orientation == -90) {
            on_off = true;

            $(".index_bg").css({"background":"#334455"}).find("div").addClass("dn");
            $(".fakeloader").find("img").css({"margin-top":imgHight}).removeClass("v_h");
        }
    };
    changeBgsize();
    $(window).bind( 'orientationchange', function(e){//当屏幕方向发生变化时候，重新加载
        changeBgsize();
        if(on_off){//横屏重新加载
            window.location.reload();
        }else{
            $(".car_content").remove();
        }
    });
    var loadingTime = setTimeout(function(){
        $(".fakeloader").hide();
        window.clearTimeout(loadingTime);
    },1500);

    $(".start_button").on("click",function(){
        $(".game_start").fadeOut(500);
        kkk.introduce();
        //kkk.loadingSene(".mod_road_one,.mod_one","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0");//导入第一个场景
        //kkk.loadingPart6();
    });
});