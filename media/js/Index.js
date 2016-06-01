$(function(){
    var kkk = new carWidge({//new一个carWidge实例
        "picArray":["media/images/run1.png","media/images/runRoadSlow.gif?112","media/images/runRoadSlowC.gif?112","media/images/runRoadFast.gif?112"],
        "element":$("#run_img"),
        "time":400,
        "start_nb":0
    });
    /*----------横竖屏切换判断------------*/
    var on_off = false;
    function changeBgsize(){
        if (window.orientation == 0 || window.orientation == 180) {
            $(".car_content").remove();
            on_off = false;
            $(".index_bg").show();
        }else if (window.orientation == 90 || window.orientation == -90) {
            on_off = true;
            $(".index_bg,.fakeloader div").hide();
            $(".fakeloader").show();
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

    $(".fakeloader").fakeLoader({//loading图片样式，js预加载
        timeToHide:2000,
        bgColor:"#1c262f",
        spinner:"spinner3" ,
        callBack: function(){
            kkk.loadingSene(".mod_road_one,.mod_one","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0");//导入第一个场景
            //kkk.loadingPart2();
        }
    });

});