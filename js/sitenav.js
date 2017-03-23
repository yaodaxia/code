$(function(){
    $.ajax({
        type:"get",
        url:"http://139.199.157.195:9090/api/getsitenav",
        success:function(result){
            var html= template("ym-shopbar",result);
            $(".barbox").html(html);

        }
    });
    //滑到顶部
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