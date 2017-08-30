
$(function(){
    $('.topContent').load('rec/data/header.html',function () {
        if(userInfo){
            loginInit();
        }else{
             flagLogin=false;
        }
    });
    $('.link').load('rec/data/link.html');

    function glassBig(el){
        var mEl=$(el);
        mEl.find('#smallBox li').mouseenter(function () {
            mEl.find('#middleBox img').attr("src",$(this).find("img").attr('src'));
            mEl.find('#largeBox img').attr("src",$(this).find("img").attr('src'));

        })
        mEl.find('#middleBox').on("mousemove",function(e){

            var $cover=mEl.find('#cover'),
                $coberContent=mEl.find('.coverContent'),
                $largeImg=mEl.find('#largeBox img');
            mEl.find('#largeBox').css({"display":"block"});
            $cover=mEl.find('#cover').css({'display':'block'});
            var x=e.pageX-$coberContent.offset().left-$cover.width()/2;
            var y=e.pageY-$coberContent.offset().top-$cover.height()/2;
            if(x<0){
                x=0;
            }
            else if(x>$coberContent.width()-$cover.width()){
                x=$coberContent.width()-$cover.width();
            }
            if(y<0){
                y=0;
            }
            else if(y>$coberContent.height()-$cover.height()){
                y=$coberContent.height()-$cover.height();
            }
            $cover.css({"left":x,
                "top":y});
            $largeImg.css({
                "top":-2*y,
                "left":-2*x
            });



        }).on('mouseleave',function () {
            var $cover=mEl.find('#cover');
            $cover.css({'display':'none'});
            mEl.find('#largeBox').css({"display":"none"})

        })
        mEl.find('#smallBox .btn:first-child').on('click',function () {
            mEl.find('#smallBox ul').stop().animate({"marginLeft":(--ulPosition)*10})
        });
        mEl.find('#smallBox .btn:last-child').on('click',function () {
            mEl.find('#smallBox ul').stop().animate({"marginLeft":(++ulPosition)*10})
        });
    }


    var str=location.href;
    var buyNum=1;
    var ulPosition=0;
    /*加载对应商品的信息*/
    $.get('rec/data/list.json',function (data) {

        data.listGoods.forEach(function (value) {

           if(value.id==str.split('?')[1]){

               var html=template('goodsDetail',value);
               $('.goodsDetail .setting1').html(html);


               var $increase=$('#increase'),
                   $decrease=$('#decrease'),
                   $buyNum=$('#buyNum'),
                   $addCar=$('#addCar')
               /*绑定事件*/
               $increase.click(function () {
                   buyNum++;
                   $buyNum.val(buyNum);
                   return false;
               });
               $decrease.click(function () {
                   if(buyNum>0){
                       buyNum--;
                       $buyNum.val(buyNum);
                   }
                   return false;
               });
               $buyNum.blur(function () {
                   buyNum=Number($buyNum.val());
               });
               $addCar.click(function () {
                   if(flagLogin){
                       goodsCookie($(this),buyNum);
                       var allNum=0;
                       var allGoods=JSON.parse(getCookie('goods'));
                       allGoods.forEach(function(value){
                           allNum+=value.num;
                       });
                       $('#car_num').html(allNum);
                       console.log(allGoods);
                   }else{
                       login();
                   }

               })




               /*放大镜效果*/

               glassBig('#glassContent');

               return false;
           }
        })
    })
})


