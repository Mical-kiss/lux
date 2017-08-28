/*全局登录状态标志*/
var flagLogin=false;
/*轮播图模块*/
var banner=(function(){
    /*定义一个初始化函数*/
    function bannerInit(id,autoPlay,hColor,navColor,small){
        var	$content = $(id),
            $slidImg = $content.find('.slidImg'),
            $Li		 = $slidImg.find('li'),
            $slidNav = $content.find('.slidNav'),
            $Nav 	 = $slidNav.find('li'),
            $Pre	 = $content.find('.sliderBtn span.first'),
            $Nex	 = $content.find('.sliderBtn span.last');
        var i=0;
        /*复制第一张图片到最后*/

        if(small){
            $slidImg.append($Li.first().clone()).width($Li.width()*($Li.length+1));
        }else{
            $Li.width(1/($Li.length+1)*100+"%");
            $slidImg.append($Li.first().clone()).width($(document).width()*($Li.length+1));
        }
        if(autoPlay){
            var timer1=setInterval(function(){
                move();
            },3000);
            $content.on('mouseenter',function(){
                clearInterval(timer1);
            })
            $content.on('mouseleave',function(){
                timer1=setInterval(function(){
                    move();
                },3000);
            })
        }
        $Pre.on('click',function(){
            i=i-2;
            move();
        });
        $Nex.on('click',function(){
            move();
        });

        $Nav.on('mouseenter',function(){
            i=$(this).index()-1;
            move();
        });

        function move(){
            i++;
            if(i==$Li.length+1){
                $slidImg.css({'left':0});
                i=1;
            }
            if(i==-1){
                $slidImg.css({'left':-$Li.width()*($Li.length)});
                i=$Li.length-1;
            }
            /*显示下标为i的图片*/
            $slidImg.stop().animate({'left':-i*$Li.width()},1000);
            /*显示位置*/
            if(i>=$Li.length){
                $Nav.eq(0).css({'background':hColor}).siblings().css({'background':navColor})
            }else{
                $Nav.eq(i).css({'background':hColor}).siblings().css({'background':navColor})
            }

        }
    }
    return {
        bannerInit:bannerInit
    }
})()
/*侧边栏模块*/
var sidBar=(function(){
    var flagSidBar=false;
    function sidBarInit(id){
        var $sidBar=$(id);
        /*绑定关闭按钮事件*/
        $('.sid_bar>div i').click(function () {
            $sidBar.stop().animate({
                'right':-291
            });
            flagSidBar=false;
        })
        $('.sid_bar>.sid_nav1>li').click(function () {
            var $sidBarDiv=$sidBar.children('div');
            if(flagSidBar==true){//侧边栏是开启状态
                if(flagLogin||$(this).index()==0){
                    if($sidBarDiv.eq($(this).index()).css('display')=='block'){
                        $sidBar.stop().animate({
                            'right':-291
                        });
                        flagSidBar=false;
                    }else{
                        $sidBarDiv.eq($(this).index()).css({
                            'display':'block'
                        }).siblings('div').css({
                            'display':'none'
                        })
                        flagSidBar=true;
                    }
                }else{
                    login();
                }

            }else{//侧边栏是关闭状态
                if(flagLogin||$(this).index()==0){
                    $sidBar.stop().animate({
                        'right':0
                    });
                    $sidBarDiv.eq($(this).index()).css({
                        'display':'block'
                    }).siblings('div').css({
                        'display':'none'
                    })
                    flagSidBar=true;
                }
                else{
                    login();
                }
            }
        })
    }
    return{
        sidBarInit:sidBarInit
    }
})()

/*登录模块显示隐藏*/
function login() {
    var $loginBox=$('.loginBox');
    var $cover=$('.cover');
    $cover.css({
        display:'block'
    });
    $loginBox.css({
        display:'block'
    });
    /*绑定关闭事件*/
    $loginBox.find('h3 i').click(function(){
        $cover.css({
            display:'none'
        });
        $loginBox.css({
            display:'none'
        });
    })
}
function verify() {
    var username=$('.loginBox').find('input:eq(0)').val(),
        psw=$('.loginBox').find('input:eq(1)').val();
    $.post("rec/data/userData.php",{username:username,password:psw},function(result){
        console.log(result);
        if(result){
            alert('成功');
            window.location.assign("index.html");
            return true;
        }else{
            alert('失败');
            window.location.assign("index.html");
            return false;
        }
    });
}
window.onload=function() {

    /*跨域获取数据*/
    /*$.getJSON("http://www.5lux.com/search/getkey?q=%E7%88%B1",function(data){
        console.log(data);
    })*/
    /*加载link的内容*/
    $('.topContent').load('rec/data/header.html');
    $('.link').load('rec/data/link.html');

    /*动态获取导航数据*/
    $.get('rec/data/subNav.json', function (data) {
        var html = template('navTop', data);
        $('.ul_sub').html(html);

        /*三级菜单切换事件绑定*/
        $('.ul_top li:first').on('mouseover',function () {
            $('.ul_sub').show();
        }).on('mouseout',function () {
            $('.ul_sub').hide();
        })
        $('.ul_sub li').on('mouseenter', function () {
            var num = $(this).index();
            $('.ul_detail').show().css({"top":36*(num+1)});
            $('.ul_detail').find('div').eq(num).show().siblings().hide();

        }).on('mouseout', function (e) {
            if (e.pageX < $('.ul_sub').offset().left) {
                $('.ul_detail').hide();
                $('.ul_detail').hide();
            }
        })
        $('.ul_detail').on('mouseenter',function () {
            $('.ul_sub').show();
        }).on('mouseleave', function () {
            $('.ul_detail').hide();
            $('.ul_sub').hide();
        })
    });

    $.get('rec/data/detailNav.json', function (data) {
        var html = template('detailNav', data);
        $('.ul_detail').html(html);
    });

    $.get('rec/data/pic.json', function (data) {

        /*----------flagship-----------*/
        var html = template('flagship1', data);
        $('.flagship_list').html(html);
        $(".flagship_list img").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });

        /*-----------hotStore-----------*/
        var html = template('hotStore', data);
        $('.hotStore_list').html(html);
        $(".hotStore_list img").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });

        /*-----------storeSame-----------*/
        var html = template('storeSameContent', data);
        $('.storeSame_content').html(html);
        $(".storeSame_content img").each(function () {
            $(this).attr("src", $(this).attr("data-src"));
        });

        /*---------classicBags---------*/
        var html = template('classBagsLeftList', data.shopCenter1);
        $('.classBags_list .classBagsLeftList').html(html);
        var html = template('slidImg1', data.shopCenter1);
        $('.classBags_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.classBags_list .smallBanner',false,'#c8a985','#ccc',true);
        var html = template('shopCenter1ShowBig', data.shopCenter1);
        $('.classBags_list .classBags_right_big').html(html);
        var html = template('classBags_right_smallContent', data.shopCenter1);
        $('.classBags_list .classBags_right_smallContent').html(html);


        /*----------timepieces---------*/
        var html = template('classTimeLeftList', data.shopCenter2);
        $('.classTime_list .classBagsLeftList').html(html);
        var html = template('slidImg2', data.shopCenter2);
        $('.classTime_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.classTime_list .smallBanner',false,'#c8a985','#ccc',true);
        var html = template('shopCenter1classTime', data.shopCenter2);
        $('.classTime_list .classBags_right_big').html(html);
        var html = template('classTime_right_smallContent', data.shopCenter2);
        $('.classTime_list .classBags_right_smallContent').html(html);


        /*-----------exquisite----------*/
        var html = template('exquisiteLeftList', data.shopCenter3);
        $('.exquisite_list .classBagsLeftList').html(html);
        var html = template('slidImg3', data.shopCenter3);
        $('.exquisite_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.exquisite_list .smallBanner',false,'#c8a985','#ccc',true);
        var html = template('shopCenter1exquisite', data.shopCenter3);
        $('.exquisite_list .classBags_right_big').html(html);
        var html = template('exquisite_right_smallContent', data.shopCenter3);
        $('.exquisite_list .classBags_right_smallContent').html(html);

        /*-----------cosmetics-----------*/
        var html = template('cosmeticsLeftList', data.shopCenter4);
        $('.cosmetics_list .classBagsLeftList').html(html);
        var html = template('slidImg4', data.shopCenter4);
        $('.cosmetics_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.cosmetics_list .smallBanner',false,'#c8a985','#ccc',true);
        var html = template('shopCenter1cosmetics', data.shopCenter4);
        $('.cosmetics_list .classBags_right_big').html(html);
        var html = template('cosmetics_right_smallContent', data.shopCenter4);
        $('.cosmetics_list .classBags_right_smallContent').html(html);


        /*-----------shoesAndApp-------------*/
        var html = template('shoesAndAppLeftList', data.shopCenter5);
        $('.shoesAndApp_list .classBagsLeftList').html(html);
        var html = template('slidImg5', data.shopCenter5);
        $('.shoesAndApp_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.shoesAndApp_list .smallBanner',false,'#c8a985','#ccc',true);
        var html = template('shopCenter1shoesAndApp', data.shopCenter5);
        $('.shoesAndApp_list .classBags_right_big').html(html);
        var html = template('shoesAndApp_right_smallContent', data.shopCenter5);
        $('.shoesAndApp_list .classBags_right_smallContent').html(html);

        /*------------promotion-------------*/
        var html = template('promotion', data.promotion);
        $('.promotion_list').html(html);
        /*推荐TAB切换*/
        $('.pro_s img').on('mouseover',function () {
            $('.pro_show img').attr({"src":$(this).attr('src')});
        });
    });

    /*商城同款Tab切换*/
    $('.storeSame_list').find('span').on("mouseenter",function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.storeSame_content').stop().animate({"marginLeft":$(this).index()*(-1210)});
    })
    /*购物车显示隐藏*/
    $('#car').on('mouseenter', function () {
        $(this).find('#car_content').stop().show(500);
    }).on('mouseleave', function () {
        $(this).find('#car_content').stop().hide(500);
    })

    /*侧边栏调用*/
    sidBar.sidBarInit('.sid_bar');
    /*轮播图调用*/
    banner.bannerInit('.content',true,'red','#fff');

}