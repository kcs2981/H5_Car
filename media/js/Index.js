$(function(){
	var myVideo=document.getElementById("bgm_music");
	myVideo.play();
    fenxiang("迎接G20做文明出行好司机","我的“行商”是xx分，已经超过x%的车主，快来测下你的“行商”分","一个月内无违章，三吨汽油送给你");
    $("body,html,.fakeloader,.index_bg,.game_start,.agreement,.mod_result,.shareBox,.submitBox,.car_content,.mod_car,.mod_road_bg,.road_two_bg,.mod_roads,.road_left_part,.road_right_part,.road_left_part img,.road_right_part img,.road_run,.road_run img").css({"height":$(window).height()});
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
        //kkk.bindEvent();
        kkk.introduce();
        //kkk.loadingSene(".mod_road_one,.mod_one","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0");//导入第一个场景
        //kkk.loadingPart9();
    });
});