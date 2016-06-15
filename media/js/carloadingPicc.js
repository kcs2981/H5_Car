$(function(){
    $("body,html,.fakeloader,.index_bg,.game_start,.agreement,.mod_result,.shareBox,.submitBox,.car_content,.mod_car,.mod_road_bg,.road_two_bg,.mod_roads,.road_left_part,.road_right_part,.road_left_part img,.road_right_part img,.road_run,.road_run img").css({"height":$(window).height()});
    $(".game_introduce ul li").css({"width":$(window).width()});

    /*----------横竖屏切换判断------------*/
    var on_off = false;
    var imgHight = -$(".fakeloader").find("img").innerHeight()/2 +"px";
    function changeBgsize(){
        if (window.orientation == 0 || window.orientation == 180) {
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
            window.location.href=window.location.href +"?" + new Date().getTime();
        }
    });
    var loadingTime = setTimeout(function(){
        $(".fakeloader").hide();
        $(".game_start").removeClass("dn")
        window.clearTimeout(loadingTime);
    },1500);

    var indexs = 0;
    var w_width = $(window).width();
    $(".game_introduce").on("swiperight",function(){//右滑
        indexs++;
        if(indexs>0){
            indexs=0;
            return;
        }
        $(".images").css({"margin-left":w_width*indexs});
    });
    $(".game_introduce").on("swipeleft",function(){//左滑
        indexs--;
        if(indexs <=-3){
            indexs = -3;
            window.location.href="/indexFm93.html?" + new Date().getTime();
            return;
        }
        $(".images").css({"margin-left":w_width*indexs})
    });

    $(".joinUs_button").on("click",function(){
        $(".submitBox").removeClass("dn");
    });

    $(".start_button").on("click",function(){
        $(".game_start").addClass("dn");
        $(".game_introduce").removeClass("dn");
    });

    $(".submitIt").on("click",function(){
        if($("input[name='userName']").val() =="" || $("input[name='carNb']").val() =="" || $("input[name='Tel']").val() =="" || $("input[name='carLastNb']").val() =="" || !$("input[name='userName']").val() || !$("input[name='carNb']").val() || !$("input[name='Tel']").val() || !$("input[name='carLastNb']").val()){
            alert("请填写相关资料，确保信息完整。");
        }else{
            var userNmae = $("input[name='userName']").val();
            var license_plate = $("input[name='carNb']").val();
            var carLastNb = $("input[name='carLastNb']").val();
            var mobile = $("input[name='Tel']").val();
            $.ajax({
                type: 'POST',
                url: 'http://res.jiconglin.com/jt93ask/Scoreinfocomplete?username='+userNmae+'&mobile='+mobile+'&license_plate='+license_plate+'&source=2&vinno='+carLastNb,
                dataType: 'jsonp',
                success: function () {
                    alert("提交成功，信息已收到!");
                    $(".submitBox").addClass("dn");
                },
                error: function () {
                }
            });
        }
    });
});