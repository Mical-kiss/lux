var verifyNum=null;

$(function () {
    $('.link').load('rec/data/link.html');
    $('#getNum').on('click',function(){
        $('.cover').show();
        $('.getNumBox').show().find('.closeI').on('click',function () {
            $('.getNumBox').hide();
            $('.cover').hide();
        });
        $('#reRandomNum').on('click',function () {
            $('#randomNum').html(getRandomNum());
        })
        $('#randomNum').html(getRandomNum());
    });
    $('#submitForNum').on('click',function(){
        if( $('#randomNum').html()==$('#inputNum').val()){
            verifyNum=getRandomNum()
            $('.getNumBox').hide();
            $('.cover').hide();
            alert("你的验证码为"+verifyNum);
        }else{
            alert('验证码不正确');
        }
    });
    $('#submit').on('click',function () {
        var cellNumber=$('#cellNum').val();
        var password=$('#password').val();
        var pswForsure=$('#pswForsure').val();
        var vefifyNumPut=$('#verifyNum').val();
        var access=$("input[type='checkbox']").is(':checked');
        var data=null;
        if(!isTelCode(cellNumber)){
            alert('号码格式错误')
            return false;
        }else if(password!=pswForsure){
            alert('请输入一致密码');
            return false;
        }else if(vefifyNumPut!=verifyNum){
            alert("验证码错误");
            return false;
        }else if(!access){
            alert('请同意用户手册');
        }
        data={
            "type":"register",
            "username":cellNumber,
            "password":pswForsure
        }
        $.post('rec/data/userData.php',data,function (data) {
            alert("注册成功");

        })

    })

})
function getRandomNum() {
    var str=String(Math.floor(Math.random()*10000));
    while (str.length<4){
        str="0"+str;
    }
    return str;
}
function isTelCode(str) {
    var reg= /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}