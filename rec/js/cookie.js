var flagLogin=false;

/*获取用户信息*/
var userInfo=getCookie('name');
function loginInit() {
    flagLogin=true;
    $('.login a').html(userInfo);
    $('.logOut').html('<a href="javascript:0;" onclick="logOutInit()">退出</a>');
    console.log(getCookie('goods')?getCookie('goods'):'');
    var allGoods=JSON.parse(getCookie('goods')?getCookie('goods'):'[]');
    var allNum=0;
    allGoods.forEach(function(value){
        allNum+=value.num;
    });
    $('#car_num').html(allNum);
    $('#car_content').html("您购物车里有"+allNum+"件商品");
}
function logOutInit() {
    flagLogin=false;
    $('.login a').html("登录");
    $('.logOut').html('<i class="hav_gift flt"></i><a href="register.html" class="flt">注册</a>');
    $('#car_num').html(0);
    $('#car_content').html("");

}

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
    // $.post("rec/data/userData.php",{username:username,password:psw,type:"init"});
    $.post("rec/data/userData.php",{username:username,password:psw,type:"login"},function(result){
        console.log(result);
        if(result){
            alert('成功');
            setCookie("name",username);
            $('.login a').html(username);
            var allGoods=JSON.parse(getCookie('goods')?getCookie('goods'):'[]');
            var allNum=0;
            allGoods.forEach(function(value){
                allNum+=value.num;
            });
            loginInit();


            $('.loginBox').css({
                display:'none'
            });
            $('.cover').css({
                display:'none'
            });
            return true;

        }else{
            alert('失败');
            // window.location.assign("index.html");
            return false;
        }
    });
}

function setCookie(name,value,day,path){
    var dNewDate=new Date();
    dNewDate.setDate(dNewDate.getDate()+day);
    document.cookie=name+'='+encodeURIComponent(value)+';expires='+dNewDate+';path'+path;
}
function getCookie(name){
    var sCookie=document.cookie.split('; ');
    for(let i=0;i<sCookie.length;i++){
        var currentName=sCookie[i].split('=');
        if(currentName[0]==name){
            return decodeURIComponent(currentName[1]);
        }
    }
}
function goodsCookie(el,buyNum) {
    var allCookie = getCookie('goods');

    if (allCookie === undefined) {
        var allGoods = [];
    } else {
        var allGoods = JSON.parse(allCookie);
    }
    var flag = true;//假设之前没有添加该商品
    for (var i = 0; i < allGoods.length; i++) {
        if (allGoods[i].id == el.attr('goods-id')) {
            flag = false;
            allGoods[i].num+=buyNum;
        }
    }
    if (flag) {
        var mGoods = {
            /*属性中的this居然和对象所在环境中的this相同*/
            id: el.attr('goods-id'),
            price:el.attr('goods-price'),
            num: 1,
        }
        allGoods.push(mGoods);

    }
    setCookie('goods',JSON.stringify(allGoods),7,'/');
}