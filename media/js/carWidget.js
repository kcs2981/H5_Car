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

function showshine(dElement,repeatTimes,displayTime){
    $("."+dElement).hide().addClass("introduce").fadeIn(1000);
};

function carWidge(option){
    var _self = this;
    _self.setting = {
        "picArray":[],
        "element":null,
        "time":400,
        "start_nb":0
    };
    _self.setting = $.extend({}, _self.setting, option);
    _self.bindEvent();
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
    _self.resetIt();
    _self.loadingSene(".fm93Show,.mod_fm93","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","200,200,200,1500","0,0,0,0");
    //var picLength = _self.setting.picArray.length;
    //runIt();
    _self.setting.start_nb = 1;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第一档
    var loadingToOne = setTimeout(function(){
        _self.loadingPart2();
        $(".mod_fm93").empty().remove();
        window.clearTimeout(loadingToOne);
    },6000);
    //function runIt(){
    //    if (_self.setting.start_nb<(picLength-1)){
    //        _self.setting.start_nb++;
    //    }else{
    //        _self.setting.start_nb=0;
    //    }
    //    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);
    //    _self.runtime = setTimeout(function(){
    //        runIt(_self.setting.picArray,_self.setting.element,_self.setting.time,_self.setting.start_nb);
    //    },_self.setting.time);
    //}

};
carWidge.prototype.stopCar = function(){//停车
    var _self = this;
    _self.setting.start_nb = 0;
    _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//停车
};
carWidge.prototype.runFast = function(){ //加速
    var _self =this;
    if(_self.setting.start_nb < 3){
        _self.setting.start_nb ++;
        _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第二、三档
    }
}
carWidge.prototype.runSlow = function(){ //减速
    var _self =this;
    if(_self.setting.start_nb > 1){
        _self.setting.start_nb --;
        _self.setting.element.attr("src",_self.setting.picArray[_self.setting.start_nb]);//路面第二、三档
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
    $(".fm93Show,.mod_fm93").fadeIn().find("div").show();
    //事件注销
    $(".run,.drink,.smoking,.slow,.fast,.car_steering").off("click");
    //$(".run").hide().addClass("introduce").fadeIn(1000);
    $("body").off("swipeleft");
    $("body").off("swiperight");
};

carWidge.prototype.loadingPart2 = function() { //斑马线场景
    var _self =this;
    _self.resetIt();
    $(".drink").addClass("drink_1");
    $(".road_two_bg").removeClass("dn");
    _self.loadingSene(".mod_road_Two,.mod_two","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0",function(){
        var setTimes = setTimeout(function(){
            $(".people").addClass("fadeOutRightSlow");
            var loadingToThree = setTimeout(function(){
                _self.loadingPart3();
                $(".mod_road_Two,.mod_two").empty().remove();
                window.clearTimeout(loadingToThree);
            },11000);
            window.clearTimeout( setTimes );
        },3000)
    });
}

carWidge.prototype.loadingPart3 = function() { //超车场景
    var _self =this;
    _self.resetIt();
    $(".drink").removeClass("drink_1").addClass("drink_2");
    _self.loadingSene(".mod_three,.fm93Show","a_bounceInLeft,a_bounceInRight,a_bounceInDown,a_flipInX","bounceInLeft,bounceInRight,bounceInDown,flipInX","0,0,0,1500","0,0,0,0",function(){
        var setTimes = setTimeout(function(){
            $(".otherCar").addClass("fadeOutDownBig animated");
            var loadingToFour = setTimeout(function(){
                _self.loadingPart4();
                window.clearTimeout(loadingToFour);
            },5000);
            window.clearTimeout( setTimes );
        },5000)
    });
}

carWidge.prototype.loadingPart4 = function() { //可乐喝完场景
    var _self =this;
    _self.resetIt();
    $(".drink").removeClass("drink_2").addClass("drink_3");

    var setTimes = setTimeout(function(){
        $(".drink").addClass("zoomInBig noDrink").css({"z-index":"10"});
        $(".drink_not").removeClass("dn");
        window.clearTimeout( setTimes );
        var loadingToFive = setTimeout(function(){
            $(".drink_not").addClass("dn");
            $(".drink").removeClass("zoomInBig").removeAttr("style");
            $(".mod_three").empty().remove();
            _self.loadingPart5();
            window.clearTimeout(loadingToFive);
        },5000);
    },5000);
}

carWidge.prototype.loadingPart5 = function() { //禁止左转
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


    $(".drink,.smoking").on("click",function(){
        if($(this).hasClass("zoomInBig")){
            $(".drink_not").addClass("dn");
            $(this).removeClass("zoomInBig").removeAttr("style");
        }else{
            $(this).addClass("zoomInBig").css({"z-index":"10"})
        }
    });
    $("body").on("swipeleft",function(){ //右滑操作
        if($(".drink").hasClass("noDrink") && !$(".drink").hasClass("drinkIsOut")){//饮料外仍
            if($(".drink").hasClass("drinkIsOut")){
                _self.turnLeft();
            }
            $(".drink_not").addClass("dn");
            $(".drink").removeClass("zoomInBig").addClass("drinkOutLeft").addClass("drinkIsOut");
        }else{
            _self.turnLeft();
        }
    });
    $("body").on("swiperight",function(){//左滑操作
        if($(".drink").hasClass("noDrink") && !$(".drink").hasClass("drinkIsOut")){//饮料外仍
            if($(".drink").hasClass("drinkIsOut")){
                _self.turnRight();
            }
            $(".drink_not").addClass("dn");
            $(".drink").removeClass("zoomInBig").addClass("drinkOutRight").addClass("drinkIsOut");
        }else{
            _self.turnRight();
        }
    });
}

carWidge.prototype.resetIt = function(){//重置场景
    $(".drink,.smoking").removeClass("zoomInBig").removeAttr("style");
    $(".road_two_bg").addClass("dn");
}





