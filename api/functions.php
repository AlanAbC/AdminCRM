<?php

require_once("objects/BD.php");
require_once("objects/User.php");

function login($user, $password){

    $data = [
        'table' => 'users',
        'where' => '(nickname = "'.$user.'" OR mail = "'.$user.'") AND password = "'.$password.'"',
    ];

    $bd = new BD();
    $responseBD = $bd -> select($data);

    if(!empty($responseBD)){

        $json = json_decode($responseBD);
        //$user = new User();

        return $json;

    }else{

        return 0;
    }

}