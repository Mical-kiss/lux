/*全局登录初始化*/

$('.topContent').load('rec/data/header.html',function () {
    console.log(userInfo);
    if(userInfo){
        loginInit();
    }else{
        flagLogin=false;
    }
});
$('.link').load('rec/data/link.html');




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

window.onload=function() {



    $.get('rec/data/pic.json', function (data) {

        /*------------banner-----------*/
        var html = template('banner', data);
        $('.content .slidImg').html(html);
        /*轮播图调用*/
        banner.bannerInit('.content',true,'red','#fff');



        /*----------flagship-----------*/
        html = template('flagship1', data);
        $('.flagship_list').html(html);

        /*-----------hotStore-----------*/
         html = template('hotStore', data);
        $('.hotStore_list').html(html);


        /*-----------storeSame-----------*/
         html = template('storeSameContent', data);
        $('.storeSame_content').html(html);


        /*---------classicBags---------*/
         html = template('classBagsLeftList', data.shopCenter1);
        $('.classBags_list .classBagsLeftList').html(html);
         html = template('slidImg1', data.shopCenter1);
        $('.classBags_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.classBags_list .smallBanner',false,'#c8a985','#ccc',true);
         html = template('shopCenter1ShowBig', data.shopCenter1);
        $('.classBags_list .classBags_right_big').html(html);
         html = template('classBags_right_smallContent', data.shopCenter1);
        $('.classBags_list .classBags_right_smallContent').html(html);


        /*----------timepieces---------*/
         html = template('classTimeLeftList', data.shopCenter2);
        $('.classTime_list .classBagsLeftList').html(html);
         html = template('slidImg2', data.shopCenter2);
        $('.classTime_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.classTime_list .smallBanner',false,'#c8a985','#ccc',true);
         html = template('shopCenter1classTime', data.shopCenter2);
        $('.classTime_list .classBags_right_big').html(html);
         html = template('classTime_right_smallContent', data.shopCenter2);
        $('.classTime_list .classBags_right_smallContent').html(html);


        /*-----------exquisite----------*/
         html = template('exquisiteLeftList', data.shopCenter3);
        $('.exquisite_list .classBagsLeftList').html(html);
         html = template('slidImg3', data.shopCenter3);
        $('.exquisite_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.exquisite_list .smallBanner',false,'#c8a985','#ccc',true);
         html = template('shopCenter1exquisite', data.shopCenter3);
        $('.exquisite_list .classBags_right_big').html(html);
         html = template('exquisite_right_smallContent', data.shopCenter3);
        $('.exquisite_list .classBags_right_smallContent').html(html);

        /*-----------cosmetics-----------*/
         html = template('cosmeticsLeftList', data.shopCenter4);
        $('.cosmetics_list .classBagsLeftList').html(html);
         html = template('slidImg4', data.shopCenter4);
        $('.cosmetics_list .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.cosmetics_list .smallBanner',false,'#c8a985','#ccc',true);
         html = template('shopCenter1cosmetics', data.shopCenter4);
        $('.cosmetics_list .classBags_right_big').html(html);
         html = template('cosmetics_right_smallContent', data.shopCenter4);
        $('.cosmetics_list .classBags_right_smallContent').html(html);


        /*-----------shoesAndApp-------------*/
         html = template('shoesAndAppLeftList', data.shopCenter5);
        $('.shoesAndApp_list .classBagsLeftList').html(html);
         html = template('slidImg5', data.shopCenter5);
        $('.shoesAndApp_list  .slidImg').html(html);
        /*调用一次轮播模块*/
        banner.bannerInit('.shoesAndApp_list .smallBanner',false,'#c8a985','#ccc',true);
         html = template('shopCenter1shoesAndApp', data.shopCenter5);
        $('.shoesAndApp_list .classBags_right_big').html(html);
         html = template('shoesAndApp_right_smallContent', data.shopCenter5);
        $('.shoesAndApp_list .classBags_right_smallContent').html(html);

        /*------------promotion-------------*/
         html = template('promotion', data.promotion);
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
    });




}
