$(function(){
    //console.log(window.location.search);
    //var res =getNum(window.location.search);
    var lisNum =0;
    var width=0;
    var step =0;
    var swidth =0;
    var lis=null;
    var res= window.location.search;
    var mwidth = 0;
    var objNew={};
    function num(str){
        str.replace(/\d+/g, function () {
            console.log(arguments[0]);
            return arguments[0];
        });

    }
    var min =num(res)

    //标题
    $.ajax({
       type:"get",
        url:"http://139.199.157.195:9090/api/getcoupon",
        success:function(res){
            var html =template("shadetpl",res);
            $("#min").html(html)
        }
    });
    //商品主体
    var data =[];
    var objNew = {};
    $.ajax({
        type:"get",
        url:"http://139.199.157.195:9090/api/getcouponproduct"+res,
        success:function(result){
            //console.log(result.slice(0, 30));
            console.log(result.result.slice(0, 30))
            data =result.result.slice(0, 30);
            objNew ={result:data}

            console.log(data)
            var html= template("infotpl",objNew);
            $("#ym-kd2").html(html);
            mwidth=$("#ym-shade img").width();
            console.log(mwidth)

            //点击显示图片
            $("body").on("click","#ym-kd2>li",function(){
                if($("#lorBox").hasClass("pop")){
                    $("#lorBox").removeClass("pop bounceInDown")
                    $(".neiBox").removeClass("pop bounceInDown")
                }else{
                    $("#lorBox").addClass("pop bounceInDown")
                    $(".neiBox").addClass("pop bounceInDown")
                }
            })
            $("#lorBox").click(function(){
                $(this).removeClass("pop bounceInDown")

                console.log(1)
            })
        //轮播图Img

            $.ajax({
                type:"get",
                url:"http://139.199.157.195:9090/api/getcouponproduct"+res,
                success:function(res){
                    var html =template("col-Box",res);
                    $("#ym-shade").append(html)
                    console.log($("#ym-shade").find("li")[0].cloneNode(true));
                    $("#ym-shade")[0].appendChild($("#ym-shade").find("li")[0].cloneNode(true));
                    //$("#ym-shade")[0].insertBefore($("#ym-shade").children("li:last-child")[0].cloneNode(true));
                    console.log($("#ym-shade").find("li").last()[0].cloneNode(true));
                    lis =$("#ym-shade li");
                    lisNum =lis.length;
                    console.log(lis.length)
                    width =lis.length*200;
                    $("#ym-shade").width(width);
                    //moveMbile()
                    getSrc()
                },
                complete:function(){
                    //moveMbile()
                }
            });
   //轮播
           //右边小贱贱
        $(".neiBox").on("click","#post-r",function(){
            //console.log(1111)
            if(step>=lisNum-1){
                step=0;
                console.log(step)
                $("#ym-shade")[0].style.left=0;
            }
            step++;
            //moveMbile()
            console.log(step)
            swidth=step*200;
            $("#ym-shade").animate({
                "left":-swidth
            },500)
            return false;
        })
        //    //左边小贱贱
        $(".neiBox").on("click","#post-l",function(){
                //console.log(1111)

                if(step<=0){
                    step=lisNum-1;
                    console.log(step)
                    $("#ym-shade")[0].style.left=-(step)*200+"px";
                }
                console.log(step)
                step--;
                //moveMbile()
                swidth=-(step)*200;
                $("#ym-shade").animate({
                    "left":swidth
                },500)
                return false;
            })
        }

    })

    //滑动效果
    var startX = 0,
        moveX = 0,
        distanceX= 0,
        isMove =false;
    var addTransition = function(){
        $("#ym-shade")[0].style.webkitTransition = "all .2s";/*兼容*/
        $("#ym-shade")[0].style.transition = "all .2s";
    }
    /*删除过度*/
    var removeTransition = function(){
        $("#ym-shade")[0].style.webkitTransition = "none";/*兼容*/
        $("#ym-shade")[0].style.transition = "mone";
    }
    /*设置定位*/
    var setTranslateX = function(x){
        $("#ym-shade")[0].style.webkitTransform = "translateX("+x+"px)";
        $("#ym-shade")[0].style.transform = "translateX("+x+"px)";
    }


    //点击对应图片
    function getSrc(){
        $("#ym-kd2").find("li").on("click",function(){
            var index =$(this).index()
            console.log($(this).index());
            step=index;
            $("#ym-shade")[0].style.left=-index*200+"px";
        })
    }


    function moveMbile(){
        $(".neiBox").on("click","#ym-shade>li>img",function(){
            return false;
        })

        $("#ym-shade")[0].addEventListener('touchstart',function(e){
            startX= e.touches[0].clientX;
            console.log(startX)
        });

        $("#ym-shade")[0].addEventListener('touchmove',function(e){
            isMove=true;
            moveX= e.touches[0].clientX;
            distanceX =moveX-startX;
            //console.log(moveX)
            //console.log(distanceX);


            setTranslateX(-step*200+distanceX);
        });
        $("#ym-shade")[0].addEventListener("webkitTransitionEnd",function(){
                if(step>=lisNum){
                    step=1;
                    setTranslateX(-step*200)
                    console.log(step)
                }else if(step<=0){
                    step=lisNum-1;
                    console.log(lisNum)
                    //addTransition()
                    setTranslateX(-step*200)
                    console.log(step)
                }
        })
        window.addEventListener("touchend",function(e){
                    //console.log(555)
            if(Math.abs(distanceX)>80&&isMove){

                if(distanceX>0){
                   step--;
                }else{
                    step++;
                }
                console.log(step)
                addTransition()
                setTranslateX(-step*200)
            }else{
                addTransition()
                setTranslateX(-step*200)
            }
            //
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;

        })
    };

//    点击滑到顶部
    $(".foot_top>a:eq(2)").on("click",function(){
        console.log(1111)
        //console.log($("body")[0].scrollHeight);
        var target = $("body")[0].scrollHeight;
        var step =0;
        clearInterval(time)
        var time =setInterval(function(){
            step++;
            console.log(step);
            target=target-5*step;
            window.scrollTo(0,target)
            if(target<0){
                clearInterval(time);
            }
        },15)

    });

    //页面返回
    $.touchGoHistory();
})