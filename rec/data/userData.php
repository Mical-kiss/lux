<?php
    $str=json_encode($_REQUEST,JSON_UNESCAPED_UNICODE);
    $name=$_REQUEST['username'];
    $psw=$_REQUEST['password'];
    $type=$_REQUEST['type'];
    $arr=array(array('username'=>'郑武军','password'=>'1122334'),array('username'=>'郑军','password'=>'1122335'));
    if($type=='register'){
        $newUser=array('username'=>$name,'password'=>$psw);
        array_push($arr,$newUser);
        echo json_encode($arr) ;

    }else{

            foreach($arr as $item){
                if($item['username']==$name&&$item['password']){
                    echo true;
                    break;
                }else{
                    echo false;
                }
            }
    }

?>