/**
 * Created by Administrator on 2017/2/17.
 */

$(function () {
    var urlGnei = location.href;
    var urlObject = serilizeUrl(urlGnei);
    init();


    function init() {
        getDetailsData();
        city();
        getTalk();
    }


    function getDetailsData() {
        console.log(urlObject);
        $.ajax({
            url: "http://139.199.157.195:9090/api/getdiscountproduct?productid=" + urlObject.productid,
            beforeSend:function() {
                $(".animations span").show().addClass("animate");
                $(".animations").show();
            },
            success: function (res) {
                var html = template("conTpl", res);
                $("#content>.container").html(html);
            },
            complete:function() {
                //    clickBtn();
                $(".animations span").hide().removeClass("animate");
                $(".animations").hide();

            }
        });
    }


//向网页插入城市的供货状态信息
    function city() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getmoneyctrl",
            beforeSend:function(){
                $(".animations").show();
            },
            success: function (res) {
                console.log(res);
                var html = template("cityTpl", res);
                $("#content>.container .content-city").html(html);
            },
            complete:function() {
                $(".animations").hide();
            }
        })
    }

    //获取客户评论信息并渲染到页面
    function getTalk(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getmoneyctrl",
            success:function(res){
                var html = template("talkTpl",res);
                $("#content>.container").append(html);
            }

        });
    }



    //把客户留言信息插入到网页上
    //function clickBtn() {
    //    console.log($("#ctl00_ContentBody_txt_nr"));
    //    $("#ctl00_ContentBody_Button1").on("click", function () {
    //
    //        console.log($("#ctl00_ContentBody_txt_nr").text());
    //    });
    //}

//把地址上的传过来的数据转为需要用的数据的方法;
    function serilizeUrl(url) {
        var urlObject = {};
        if (/\?/.test(url)) {
            var urlString = url.substring(url.indexOf("?") + 1);
            var urlArray = urlString.split("&");
            for (var i = 0, len = urlArray.length; i < len; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                urlObject[item[0]] = item[1];
            }
            return urlObject;
        }
        return null;
    }


});
