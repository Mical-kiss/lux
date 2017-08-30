/*全局登录初始化*/


$('.topContent').load('rec/data/header.html',function () {
    if(userInfo){
        loginInit();
    }else{
        flagLogin=false;
    }
});
$('.link').load('rec/data/link.html');

$(function(){

    $.get('rec/data/list.json',function (data) {
        console.log(data);
        var html=template('listNav',data);
        $('.listNav .setting').html(html);

        html=template('listFilter',data);
        $('.listFilter .setting').html(html);

        html=template('listGoods',data);
        $('.goodsList .setting').html(html);
    })
})