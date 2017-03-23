$(function () {
    /*==================方法的调用=================*/
    init();
    /*==================方法的定义=================*/
    function init() {
        getSaveMoney();
        //getNum();

    }

    //变量提到全局,以便多个函数内调用
    //声明变量以动态生成页面总数
    var pagem = 0;
    //声明i以便在点击上下一页时动态的改变第几页的内容
    //var i = 0;
    //声明str以动态获取页面的数量,
    var str = '';

    //请求商品详情数据
        function
    getSaveMoney()
    {
        //给template注册定义方法
        template.helper('getNum', getNum);
        function getNum(str) {
            return str.replace(/[^\d]/g, '');
        }

        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl',
            //过渡动画
            beforeSend: function () {
                $('.mask').removeClass('hide');
            },
            complete: function () {
                $('.mask').addClass('hide');
            },
            success: function (res) {
                var html = template('moneyTpl', res);
                $('.container').html(html);
                //根据数据总数计算页面数量
                pagem = Math.ceil(res.totalCount / res.pagesize);
                //var str = '';
                //根据页面数量循环产生option并渲染到页面中
                for (var i = 1; i <= pagem; i++) {
                    //str += '<option value="' + (i + 1) + '">' + (i + 1) + '/' + pagem + '</option>';
                    str += '<option value="' + i + '">' + i + '/' + pagem + '</option>';
                }
                $('#selectPages').html(str);
            }
        })
    }

    //添加三个点击事件
    //声明两个变量以追踪页面位置
    var index = 1;
    var targetIndex = index;
    //上一页对立统一
    $('.pages').on('click', '.button', function () {
        //console.log(this);
        //jquery中on方法里的this指向调用它的dom元素,
        // 打印出来 的是:﻿ //<div class="pre fl button">上一页</div>
        //console.log($('.button').hasClass('pre'));..
        //console.log($(this).hasClass('pre'));
        if ($(this).hasClass('pre')) {
            //后台数据提供的pageid从0开始,要调整参数以和它对标,数据库第二天又改为pageid=1,这个坑被后台自己填了
            targetIndex = index <= 1 ? 1 : index - 1;
            //i = targetIndex;
            //console.log(str);
        } else {
            targetIndex = index >= pagem ? pagem : index + 1;

            //i = targetIndex;
            //console.log(str);
        }
        //console.log(index);
        //console.log('targetIndex=' + targetIndex);
        //根据上,下一页的目标值(targetIndex),设置$('#selectPages')的第targetIndex项为选中状态;

        //$('#selectPages').html(str);

        if (targetIndex !== index) {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getmoneyctrl?pageid=' + targetIndex,
                beforeSend: function () {
                    //设置属性时具有true和false两个属性的属性,如checked,selected,disabled,使用prop,其他使用attr;
                    $('#selectPages').find('option').prop('selected', false).eq(targetIndex - 1).prop('selected', true);
                    //点击按钮发送请求后,禁用该按钮,避免快速重复点击导致发送多条请求
                    $(this).prop('disabled', true);
                    //console.log($('.mask'));
                    $('.mask').removeClass('hide');
                },
                //页面等待效果
                complete: function () {
                    $('.mask').addClass('hide');

                },

                success: function (res) {
                    var html = template('moneyTpl', res);
                    $.scrollTo(0, 300);
                    //利用插件提供的方法实现渲染的新页面从顶端显示$.scrollTo(目标id,speed);
                    $('.container').html(html);
                    //渲染完页面后,释放该按钮,可以再次点击发送ajax请求
                    $(this).prop('disabled', false);
                    //console.log($(this))


                    ////设置提示信息
                    //if(targetIndex==0){
                    //    alert('您已翻至第一页,请浏览后续内容')
                    //}
                    //if(targetIndex== pagem-1){
                    //    alert('您已翻至最后一页,请浏览其他内容')
                    //}

                    index = targetIndex;
                }
            })
        }
    });

    //动态改变selected的option
    //选中页面渲染相对应的数据
    $('.pages').on('change', 'select', function () {
        //此处获得被点击的option在select中的index,从1开始,与数据库返回的pageid统一,不用进一步修正;
        targetIndex = $('select option:selected').index() + 1;
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl?pageid=' + targetIndex,
            beforeSend: function () {
                $('.mask').removeClass('hide');
            },
            complete: function () {
                $('.mask').addClass('hide');
            },
            success: function (res) {
                var html = template('moneyTpl', res);
                $.scrollTo(0, 300);
                $('.container').html(html);
                index = targetIndex;
            }
        })

    })


});













