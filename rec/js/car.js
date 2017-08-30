
$(function () {
        $('.topContent').load('rec/data/header.html',function () {
        if(userInfo){
            loginInit();
            if(flagLogin){
                var allGoods=JSON.parse(getCookie('goods'));
                var sumPrice=0;
                var sumGoods=0;
                $.get('rec/data/list.json',function (data) {

                    allGoods.forEach(function (value,index) {

                        data.listGoods.forEach(function(data1){
                            if(value.id==data1.id){
                                var mTr=document.createElement('tr');
                                mTr.innerHTML=`
                <td style="text-align: left;padding-left: 10px;"><input type="checkbox" checked class="selectSingle"></td>
                <td><img src="${data1.src}" alt=""></td>
                <td>${data1.p2}</td>
                <td>${data1.p3}</td>
                <td>${data1.price}</td>
                <td>
                    <a href="javascript:0;" class="decrease" goods-price="${value.price}" goods-id="${value.id}">-</a><span class="singleNum">${value.num}</span><a goods-id="${value.id}" goods-price="${value.price}" class="increase" href="javascript:0;">+</a>
                </td>
                <td></td>
                <td style="font-weight: 900;" class="singlePrice">${data1.price*value.num}</td>
                <td>
                    <a class="carDelete" goods-id="${value.id}" href="javascript:0;">删除</a><br>
                    <a href="javascript:0;">移入收藏夹</a><br>
                    <a href="javascript:0;">定制包装</a>
                </td>`
                                $('table').append(mTr);
                                sumPrice+=data1.price*value.num;
                                sumGoods+=value.num;
                            }
                        })

                    })

                    /*总金额显示刷新*/
                    $('#carPrice').html(sumPrice);
                    $('#carNum').html(sumGoods);



                    /*绑定删除购物车事件*/
                    $('.carDelete').on('click',function () {

                        $(this).parent().parent().remove();
                        var this_attr=$(this).attr('goods-id');

                        allGoods.forEach(function (value ,index) {

                            if(value.id==this_attr){
                                allGoods.splice(index,1);
                                setCookie('goods',JSON.stringify(allGoods),7,'/');
                                /*购物车数量显示刷新*/
                                loginInit();
                            }
                        });

                        /*刷新总金额*/
                        freshSum();

                    })

                    /*绑定加一件减一件事件*/
                    $('.decrease').on('click',function () {
                        goodsCookie($(this),-1);
                        var allNum=0;
                        var singleNum=0;
                        var allGoods=JSON.parse(getCookie('goods'));
                        var $tr=$(this).parent().parent();
                        allGoods.forEach(function(value ,index){
                            allNum+=value.num;
                            if(index==$tr.index()-1){
                                $tr.find('.singleNum').html(value.num);
                                $tr.find('.singlePrice').html(value.num*value.price);
                            }
                        });
                        $('#car_num').html(allNum);
                        freshSum();
                    });
                    $('.increase').on('click',function () {
                        goodsCookie($(this),1);
                        var allNum=0;
                        var singleNum=0;
                        var allGoods=JSON.parse(getCookie('goods'));
                        var $tr=$(this).parent().parent();
                        allGoods.forEach(function(value ,index){
                            allNum+=value.num;
                            if(index==$tr.index()-1){
                                $tr.find('.singleNum').html(value.num);
                                $tr.find('.singlePrice').html(value.num*value.price);
                            }
                        });
                        $('#car_num').html(allNum);
                        freshSum();
                    });

                    /*选择商品事件绑定*/
                    $('.selectSingle').on('click',function () {
                        freshSum();
                    })

                    /*刷新总金额函数*/
                    function freshSum(){
                        sumPrice=0;
                        sumGoods=0;
                        allGoods=JSON.parse(getCookie('goods'));
                        console.log(allGoods);
                        allGoods.forEach((function (value,index) {
                            // console.log($('.selectSingle').eq(index).prop('checked'));
                            if($('.selectSingle').eq(index).prop('checked')){
                                sumPrice+=value.price*value.num;
                                sumGoods+=value.num;
                            }
                            console.log(value.price,value.num)
                        }));

                        $('#carPrice').html(sumPrice);
                        $('#carNum').html(sumGoods);
                    }

                    /*全选事件绑定*/
                    $('.selectAll').click(function () {
                        var allInput=$(".main table input[type='checkbox']");

                        if($(this).is(':checked')){
                            allInput.prop("checked", true);;
                        }else{
                            allInput.prop("checked", false);;
                        }
                        freshSum();
                    })




                });
            }
        }else{
            flagLogin=false;
        }
    });
    $('.link').load('rec/data/link.html');




})