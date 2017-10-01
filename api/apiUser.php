<?php

$encoding = "UTF-8";
mb_internal_encoding($encoding);
mb_http_output($encoding);

include_once('functions.php');

if(isset($_POST['action'])){

    $action = $_POST['action'];

    if($action == 'login'){
        $user = $_POST['user'];
        $password = md5($_POST['password']);

        $response = login($user, $password);

        print json_encode($response);

    }

    if($action == 'register'){
        $name = $_POST['name'];
        $lastName = $_POST['last_name'];
        $nickname =$_POST['nickname'];
        $mail = $_POST['mail'];
        $password = md5($_POST['password']);

        $response = registerUser($name, $lastName, $nickname, $mail, $password);

        print json_encode($response);
    }

}

?>