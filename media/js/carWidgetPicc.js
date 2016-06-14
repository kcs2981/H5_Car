function getAnimate(parentClass,element,x,delay,index,hideTime,callBack) {
    delay = delay || 0;
    index = index || 0;
    var timeArray = [];
    var timehideArray = [];
    timeArray[index] = window.setTimeout( function(){
        parentClass.find('.'+element).addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass(x + ' animated');
            if(hideTime!= 0 || hideTime!="0"){ //如果设置了消失时间，则hideTime后消失
                timehideArray[index] = window.setTimeout( function() {
                    parentClass.find('.'+element).addClass("dn")
                    window.clearTimeout( timehideArray[index] );
                },hideTime);
            }
            if(typeof(callBack) == "function"){//如果回调函数存在，则执行回调
                callBack();
            }
        }).removeClass("dn");
        window.clearTimeout( timeArray[index] );
    }, delay );

};


function showshine(dElement,repitTime,runTime,showTime,callBack){
    var ripitTimes;
    function shineRipit(){
        $("."+dElement).hide().addClass("introduce").fadeIn(500);
        ripitTimes = setTimeout(function(){
            shineRipit();
        },repitTime);
    }
    var showTimes = setTimeout(function(){
        shineRipit();
        var tunTimesTwo = setTimeout(function(){
            if(typeof(callBack) == "function"){//如果回调函数存在，则执行回调
                callBack();
            }
            window.clearTimeout(ripitTimes);
            window.clearTimeout(showTimes);
            window.clearTimeout(tunTimesTwo);
        },runTime);
    },showTime)

};

function carWidge(option){
    var _self = this;
    _self.setting = {
        "picArray":[],
        "element":null,
        "time":400,
        "start_nb":0
    };
    _self.leftArray = ["http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/leftG.png","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/left_Slow.gif?112","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/left_SlowC.gif?112","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/left_Fast.gif?112"];
    _self.rightArray = ["http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/rightG.png","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/right_Slow.gif?112","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/right_SlowC.gif?112","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/right_Fast.gif?112"];
    _self.setting = $.extend({}, _self.setting, option);
    _self.ErrorData = [];
    _self.resultData = 100;
}

carWidge.prototype.loadingSene = function(seneClass,elements,animates,times,hideTime,callBack){ //导入第一场景
    elements = elements || "";
    animates = animates || "";
    times = times || "";
    var elementArray = elements.split(",");
    var animateArray = animates.split(",");
    var timesArray = times.split(",");
    var hideTimeArray = hideTime.split(",");
    var _self =this;
    $(".mod_part,.mod_roads").addClass("dn");
    $(seneClass).removeClass("dn");
    for(var i=0,index=elementArray.length;i<index;i++){
        getAnimate($(seneClass),elementArray[i],animateArray[i],timesArray[i],i,hideTimeArray[i],callBack);
    }
}

carWidge.prototype.runCar = function(){ //开车
    var _self = this;
    var openVideo=document.getElementById("bgm_open");
    openVideo.play();
    openVideo.onended = function(){
        _self.resetIt();
        $(".run").removeClass("introduce");
        _self.loadingSene(".fm93Show,.mod_fm93","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","200,200,200,1500","0,0,0,0");
        //var picLength = _self.setting.picArray.length;
        //runIt();
        _self.setting.start_nb = 1;
        _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
        $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第一档
        $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第一档
        var loadingToOne = setTimeout(function(){
            _self.loadingPart2();
            $(".mod_fm93").empty().remove();
            window.clearTimeout(loadingToOne);
        },6000);
    };
};
carWidge.prototype.stopCar = function(){//停车
    var _self = this;
    _self.setting.start_nb = 0;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//停车
    $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第二、三档
    $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第二、三档
};
carWidge.prototype.runFast = function(){ //加速
    var _self =this;
    if(_self.setting.start_nb < 3){
        _self.setting.start_nb ++;
        _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第二、三档
        $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第二、三档
        $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第二、三档
    }
}
carWidge.prototype.runSlow = function(){ //减速
    var _self =this;
    if(_self.setting.start_nb > 1){
        _self.setting.start_nb --;
        _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第二、三档
        $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第二、三档
        $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第二、三档
    }
}

carWidge.prototype.turnLeft = function(){ //左转
    var _self = this;
    window.clearTimeout(_self.shutTimeR);
    $(".car_right").removeClass("icon_active");
    $(".car_steering").removeClass("turnRight");
    function iconShut(){
        if($(".car_left").hasClass("icon_active")){
            $(".car_left").removeClass("icon_active");
        }else{
            $(".car_left").addClass("icon_active");
        }
        _self.shutTime = setTimeout(function(){
            iconShut();
        },500)
    }
    iconShut();
    $(".car_steering").addClass("turnLeft");
    _self.stopIt = setTimeout(function(){
        $(".car_left").removeClass("icon_active");
        $(".car_steering").removeClass("turnLeft");
        window.clearTimeout(_self.shutTime);
        window.clearTimeout(_self.stopIt);
    },5000)

}

carWidge.prototype.turnRight= function(){ //右转
    var _self =this;
    window.clearTimeout(_self.shutTime);
    $(".car_left").removeClass("icon_active");
    $(".car_steering").removeClass("turnLeft");
    function iconShutR(){
        if($(".car_right").hasClass("icon_active")){
            $(".car_right").removeClass("icon_active");
        }else{
            $(".car_right").addClass("icon_active");
        }
        _self.shutTimeR = setTimeout(function(){
            iconShutR();
        },500)
    }
    iconShutR();
    $(".car_steering").addClass("turnRight");
    _self.stopItR = setTimeout(function(){
        $(".car_right").removeClass("icon_active");
        $(".car_steering").removeClass("turnRight");
        window.clearTimeout(_self.shutTimeR);
        window.clearTimeout(_self.stopItR);
    },5000)

};


carWidge.prototype.introduce = function(){//操作介绍
    var _self = this;
    $(".fm93Show,.mod_fm93").fadeIn().find("div").show();
    showshine("run",500,1500,500);
    showshine("car_steering",500,1500,2500);
    showshine("slow",500,1500,4500);
    showshine("fast",500,1500,6500);
    showshine("smoking",500,1500,8500);
    showshine("drink",500,1500,10500,function(){
        var toLoadingPart = setTimeout(function(){
            $(".run,.drink,.smoking,.slow,.fast,.car_steering").removeClass("introduce");
            window.clearTimeout(toLoadingPart);
            _self.loadingSene(".mod_road_one,.mod_one","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0",function(){
                showshine("run",500,2500,500);
            });//导入第一个场景
            _self.bindEvent();
        },2000);
    });


    $.ajax({
        type: 'POST',
        url: 'http://res.jiconglin.com/jt93ask/totalscore',
        dataType: 'jsonp',
        success: function (data) {
            _self.totalPeople = data.data.total;
        },
        error: function () {
        }
    });
};

carWidge.prototype.loadingPart2 = function() { //斑马线场景
    var _self =this;
    _self.resetIt();
    _self.stopCar();
    showshine("slow",500,1500,1000);
    showshine("fast",500,1500,2500);
    $(".drink").addClass("drink_1");
    $(".road_two_bg").removeClass("dn");
    _self.loadingSene(".mod_road_Two,.mod_two","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0");
    $(".slow").one("click",function(){
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt05.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        var peoplePartTime = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            $(".people").css({"background":"url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/people.gif') no-repeat","background-size":"100% 100%"}).addClass("fadeOutRightSlow");
            window.clearTimeout(peoplePartTime);
        },4000);

        var loadingToThree = setTimeout(function(){
            _self.loadingPart3();
            $(".mod_road_Two,.mod_two").empty().remove();
            window.clearTimeout(loadingToThree);
        },13000);
        _self.offEvent();
        _self.bindEvent();
    });
    $(".fast").one("click",function(){
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt01.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        _self.resultData = _self.resultData-10;
        var peoplePartTime22 = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            window.clearTimeout(peoplePartTime22);

            _self.loadingPart3();
            $(".mod_road_Two,.mod_two").empty().remove();
        },4000);
        _self.offEvent();
        _self.bindEvent();
    });
};

carWidge.prototype.loadingPart3 = function() { //超车场景
    var _self =this;
    _self.resetIt();

    showshine("slow",500,1500,1000);
    showshine("car_steering",500,1500,2500);

    _self.setting.start_nb = 1;
    _self.setting.element.attr("src","http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/run_sx.png");//路面实线
    $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第一档
    $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第一档

    $(".drink").removeClass("drink_1").addClass("drink_2");
    _self.loadingSene(".mod_three,.fm93Show","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0");

    $(".slow").one("click",function(){
        $(".fm93_banner").addClass("dn");
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt13.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        $(".otherCar").addClass("fadeOutDownBig animated");
        var otherCarPartTime = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            window.clearTimeout(otherCarPartTime);
            $(".fm93_banner").removeClass("dn");
            _self.loadingPart4();
        },4000);
        _self.offEvent();
        _self.bindEvent();
    });


    $("body").one("swipeleft",function(){ //右滑操作
        $(".fm93_banner").addClass("dn");
        _self.resultData = _self.resultData-10;
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt08.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        $(".otherCar").addClass("fadeOutDownBig animated");
        var otherCarPartTime2 = setTimeout(function(){
            window.clearTimeout(otherCarPartTime2);

            $(".otherCar").addClass("fadeOutDownBig animated");
            $(".fm93_banner").removeClass("dn");
            _self.loadingPart4();
        },4000);
        _self.offEvent();
        _self.bindEvent();
    });
    $("body").one("swiperight",function(){//左滑操作
        _self.resultData = _self.resultData-10;
        $(".fm93_banner").addClass("dn");
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt08.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        $(".otherCar").addClass("fadeOutDownBig animated");
        var otherCarPartTime3 = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            window.clearTimeout(otherCarPartTime3);
            $(".fm93_banner").removeClass("dn");
            _self.loadingPart4();
        },4000);
        _self.offEvent();
        _self.bindEvent();
    });
}

carWidge.prototype.loadingPart4 = function() { //可乐喝完场景
    var _self =this;
    _self.resetIt();
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
    $(".drink").removeClass("drink_2").addClass("drink_3");

    var setTimes = setTimeout(function(){
        $(".drink").addClass("zoomInBig noDrink").css({"z-index":"10"});
        $(".drink_not").removeClass("dn");
        window.clearTimeout( setTimes );
        $(".drink").one("click",function(){
            $(".mod_three").empty().remove();


            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt10.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var drinkPartTime = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(drinkPartTime);
                _self.loadingPart5();
            },4000);
            _self.offEvent();
            _self.bindEvent();

        });

        $("body").one("swipeleft",function(){ //右滑操作
            _self.resultData = _self.resultData-10;
            $(".mod_three").empty().remove();
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt12.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var drinkPartTime2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(drinkPartTime2);
                _self.loadingPart5();
            },4000);
            _self.offEvent();
            _self.bindEvent();
        });
        $("body").one("swiperight",function(){//左滑操作
            $(".mod_three").empty().remove();
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt10.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var drinkPartTime3 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(drinkPartTime3);
                _self.loadingPart5();
            },4000);
            _self.offEvent();
            _self.bindEvent();
        });

    },5000);
}

carWidge.prototype.loadingPart5 = function() { //限速
    var _self =this;
    _self.resetIt();
    //showshine("fast",500,1500,1000);
    //showshine("slow",500,1500,2500);
    _self.loadingSene(".mod_five,.mod_road_Two","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,0","0,0,0,0",function(){
        var loadingToFive= setTimeout(function(){
            _self.loadingPartsix();
            window.clearTimeout(loadingToFive);
        },8000);
    });
    //_self.setting.start_nb = 2;//限速进来默认第二档。提示超速。根据用户操作扣分；
    //_self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第2档
    //$(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第2档
    //$(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第2档
    //
    //$(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt11.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
    //var slowCarPartTime3 = setTimeout(function(){
    //    $(".infoTxt").removeClass("bounceInUp").addClass("dn");
    //    window.clearTimeout(slowCarPartTime3);
    //},4000);
    //
    //$(".fast").one("click",function(){
    //    $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt11.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
    //    var slowCarPartTime = setTimeout(function(){
    //        $(".infoTxt").removeClass("bounceInUp").addClass("dn");
    //        window.clearTimeout(slowCarPartTime);
    //        _self.loadingPartsix();
    //    },4000);
    //    _self.offEvent();
    //    _self.bindEvent();
    //});
    //
    //
    //$(".slow").one("click",function(){
    //    $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt07.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
    //    var slowCarPartTime2 = setTimeout(function(){
    //        $(".infoTxt").removeClass("bounceInUp").addClass("dn");
    //        window.clearTimeout(slowCarPartTime2);
    //        _self.loadingPartsix();
    //    },4000);
    //    _self.offEvent();
    //    _self.bindEvent();
    //});


}

carWidge.prototype.loadingPartsix = function() { //老婆电话
    var phoneVideo=document.getElementById("bgm_phone");
    phoneVideo.play();
    var _self =this;
    _self.resetIt();

    _self.setting.start_nb = 1;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
    $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第一档
    $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第一档

    _self.loadingSene(".mod_6,.mod_road_Two","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0",function(){
        $(".iphoneNot").on("click",function(){
            phoneVideo.pause();
            $(".iphone").addClass("dn");

            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt14.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var sixPartTime = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(sixPartTime);

                _self.loadingPartadd();
            },4000);


        });

        $(".iphoneOk").on("click",function(){
            _self.resultData = _self.resultData-10;
            $(".iphone").addClass("dn");
            phoneVideo.pause();

            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt03.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var sixPartTim2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(sixPartTim2);

                _self.loadingPartadd();
            },4000);

        });
    });
}

carWidge.prototype.loadingPartadd = function() { //过度场景
    var _self =this;
    _self.resetIt();
    _self.setting.start_nb = 1;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
    $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第一档
    $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第一档

    var loadingToPartAdd= setTimeout(function(){
        _self.loadingPart7();
        window.clearTimeout(loadingToPartAdd);
    },8000);
}

carWidge.prototype.loadingPart7 = function() { //禁止左转
    var dhVideo=document.getElementById("bgm_dh");
    dhVideo.play();
    showshine("fast",500,1500,1000);
    showshine("car_steering",500,1500,2500);
    var _self =this;
    _self.resetIt();
    _self.stopCar();
    $(".mod_road_bg").addClass("road_noLeft_bg");
    _self.loadingSene(".mod_7","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,0","0,0,0,0");

    $(".fast").one("click",function(){

        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt02.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        var noLeftPartTim = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            window.clearTimeout(noLeftPartTim);
        },4000);
        $(".mod_7,.no_left").addClass("dn").remove();
        _self.loadingPartaddTwo();
        _self.offEvent();
        _self.bindEvent();
    });

    $("body").one("swipeleft",function(){ //左滑操作
        _self.resultData = _self.resultData-10;
        $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt04.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
        var noLeftPartTim2 = setTimeout(function(){
            $(".infoTxt").removeClass("bounceInUp").addClass("dn");
            window.clearTimeout(noLeftPartTim2);
        },4000);
        $(".mod_7,.no_left").addClass("dn").remove();
        _self.loadingPartaddTwo();
        _self.offEvent();
        _self.bindEvent();
    });

    $("body").one("swiperight",function(){//右滑操作
        $(".mod_7,.no_left").addClass("dn").remove();
        _self.loadingPartaddTwo();
        _self.offEvent();
        _self.bindEvent();
    });

    //_self.loadingPart8();
}

carWidge.prototype.loadingPartaddTwo = function() { //过度场景
    var _self =this;
    _self.resetIt();
    _self.setting.start_nb = 1;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
    $(".road_left_part img").attr("src",_self.leftArray[_self.setting.start_nb]);//路面第一档
    $(".road_right_part img").attr("src",_self.rightArray[_self.setting.start_nb]);//路面第一档

    var loadingToPartAddTwo= setTimeout(function(){
        _self.loadingPart8();
        window.clearTimeout(loadingToPartAddTwo);
    },6000);
}



carWidge.prototype.loadingPart8 = function() { //接老婆
    var _self =this;
    _self.resetIt();
    _self.stopCar();
    $(".slow").off("click");
    $("body").off("swiperight");
    $("body").off("swipeleft");
    showshine("slow",500,1500,1000);
    showshine("jt",500,1500,2500);
    showshine("car_steering",500,1500,4000);
    _self.loadingSene(".mod_8,.mod_road_8","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0",function(){
        $(".slow").one("click",function(){
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt06.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var noLeftPartTim2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(noLeftPartTim2);
                $(".jt").addClass("dn");
                _self.stopCar();
                _self.resultData = _self.resultData-10;
                _self.loadingPart9();
                $(".drink").removeClass("turenLeftIt");

            },4000);


        });


        $("body").one("swiperight",".car_steering",function(){//右滑操作
            _self.turnRight();
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt06.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var noLeftPartTim2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(noLeftPartTim2);
                $(".jt").addClass("dn");
                _self.stopCar();
                _self.resultData = _self.resultData-10;
                _self.loadingPart9();
                $(".drink").removeClass("turenLeftIt");

            },4000);


        });

        $("body").one("swipeleft",".car_steering",function(){//右滑操作
            _self.turnLeft();
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt06.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var noLeftPartTim2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(noLeftPartTim2);
                $(".jt").addClass("dn");
                _self.stopCar();
                _self.resultData = _self.resultData-10;
                _self.loadingPart9();
                $(".drink").removeClass("turenLeftIt");

            },4000);


        });

        $("body").one("swiperight",".jt",function(){//右滑操作
            _self.turnRight();
            $(".infoTxt").css({"background": "url('http://img01.cztv.com/channel/topics/jt93static4/gooddriver/media/images/txt09.png') no-repeat","background-size":"100% 100%"}).removeClass("bounceOutUp").removeClass("dn").addClass("bounceInUp");
            var noLeftPartTim2 = setTimeout(function(){
                $(".infoTxt").removeClass("bounceInUp").addClass("dn");
                window.clearTimeout(noLeftPartTim2);
                $(".jt").addClass("dn");
                _self.stopCar();
                _self.loadingPart9();
                $(".drink").removeClass("turenLeftIt");

            },4000);


        });
    });
}

carWidge.prototype.loadingPart9 = function() { //结果页
    var _self =this;
    _self.resetIt();
    $.ajax({
        type: 'POST',
        url: 'http://res.jiconglin.com/jt93ask/scorerecv?score='+_self.resultData,
        dataType: 'jsonp',
        success: function (data) {
            $(".result").html(_self.resultData);
            $(".persent").html(data.data.percent);
            $(".r_text").html(data.data.tip);
            $(".shareNb").html(_self.totalPeople);
            fenxiang("我的“行商”是"+_self.resultData+"分，已经超过"+data.data.percent+"%的车主，快来测下你的“行商”分","一个月内无违章，三吨汽油送给你","我的“行商”是"+_self.resultData+"分，已经超过"+data.data.percent+"%的车主，快来测下你的“行商”分"); //百分比根据接口返回的值设置
            $(".mod_result").removeClass("dn");
        },
        error: function () {
        }
    });
    $(".shareButton,.testOne,.joinUs,.icon_agree,.submitIt").off("click");
    $(".shareButton").on("click",function(){
        _self.loadingPart10();
    })
    $(".testOne").on("click",function(){
        window.location.reload();
    })
    $(".joinUs").on("click",function(){
        $(".agreement").removeClass("dn");
    });
    $(".icon_agree").on("click",function(){
        $(".agreement").addClass("dn");
        $(".submitBox").removeClass("dn");
    });
    $(".submitIt").on("click",function(){
        if($("input[name='userName']").val() =="" || $("input[name='carNb']").val() =="" || $("input[name='Tel']").val() =="" || $("input[name='carLastNb']").val() =="" || !$("input[name='userName']").val() || !$("input[name='carNb']").val() || !$("input[name='Tel']").val() || !$("input[name='carLastNb']").val()){
            alert("请填写相关资料，确保信息完整。");
        }else{
            var userNmae = $("input[name='userName']").val();
            var license_plate = $("input[name='carNb']").val();
            var lastsource = _self.resultData;
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

}

carWidge.prototype.loadingPart10 = function() { //分享页
    var _self =this;
    _self.resetIt();
    $(".mod_result").addClass("dn");
    $(".shareBox").removeClass("dn");
}


carWidge.prototype.bindEvent = function(){
    var _self =this;
    $(".run").on("click",function(){
        _self.runCar();
        $(".run").off("click");
    });
    $(".slow").on("taphold",function(){
        _self.stopCar();
    });
    $(".fast").on("click",function(){
        _self.runFast();
    });
    $(".slow").on("click",function(){
        _self.runSlow();
    });


    $(".drink").on("click",function(){
        if($(this).hasClass("zoomInBig")){
            $(".drink_not").addClass("dn");
            $(this).removeClass("zoomInBig").removeAttr("style");
        }else{
            $(this).addClass("zoomInBig").css({"z-index":"10"})
        }
    });

    $(".smoking").on("click",function(){
        if($(this).hasClass("zoomInBig")){
            $(this).removeClass("zoomInBig").removeAttr("style");
        }else{
            $(this).addClass("zoomInBig").css({"z-index":"10"})
        }
        _self.ErrorData.push("开车吸烟");
    });

    $("body").on("swipeleft",function(){ //右滑操作
        if($(".drink").hasClass("noDrink") && !$(".drink").hasClass("drinkIsOut")){//饮料外仍
            if($(".drink").hasClass("drinkIsOut")){
                _self.turnLeft();
                _self.ErrorData.push("禁止左拐的地方左拐了");
            }else{
                $(".drink_not").addClass("dn");
                $(".drink").removeClass("zoomInBig").addClass("drinkOutLeft").addClass("drinkIsOut");
                _self.ErrorData.push("乱扔饮料");
            }
        }else{
            _self.turnLeft();
        }
    });
    $("body").on("swiperight",function(){//左滑操作
        if($(".drink").hasClass("noDrink") && !$(".drink").hasClass("drinkIsOut")){//饮料外仍
            if($(".drink").hasClass("drinkIsOut")){
                _self.turnRight();
            }else{
                $(".drink_not").addClass("dn");
                $(".drink").removeClass("zoomInBig").removeAttr("style");
            }
        }else{
            _self.turnRight();
        }
    });
}

carWidge.prototype.offEvent = function(){
    $(".smoking,.drink,.slow,.fast,.run").off("click");
    $(".slow").off("taphold");
    $("body").off("swipeleft");
    $("body").off("swiperight");
}

carWidge.prototype.resetIt = function(){//重置场景
    $(".slow,.fast,.car_steering").removeClass("introduce");
    $(".drink,.smoking").removeClass("zoomInBig").removeAttr("style");
    $(".road_two_bg").addClass("dn");
    $(".mod_road_bg").removeClass("road_noLeft_bg");
}




