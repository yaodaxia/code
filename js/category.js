/**
 * Created by aweb on 2017/2/14 0014.
 */
$(function () {

    /*========方法的调用============*/
    int();
    function int() {
        getTitle();
    }

    /*获取总目录*/
    function getTitle() {
        $(".animate").removeClass("hide");

        $.ajax({
            url: "http://139.199.157.195:9090/api/getcategorytitle",
            success: function (res) {
                var html = template("menuTpl", res);
                $(".animate").addClass("hide");
                $(".briefin").removeClass("bornone");
                $(".briefin").html(html);
            },
            complete: function () {
                getList();
            }
        })
    }

    /*获取详细分类*/
    function getList() {
        $(".wzg-every").each(function (i) {
            var titleid = $(this).attr("title");

            $.ajax({
                url: "http://139.199.157.195:9090/api/getcategory?titleid=" + titleid,
                success: function (res) {
                    var html = template("list", res);
                    $(".row")[titleid].innerHTML = html;
                },
            })
        })
        toggle();
    }

    /*点击查看详细分类*/
    function toggle() {
        $(".wzg-every > a").on("click", function () {
            if ($(this).next().css('display') == 'block') {
                $(this).next().slideUp();
            } else {
                $(".wzg-every .row").slideUp();
                $(this).next().slideDown();

            }
        })
    }
})