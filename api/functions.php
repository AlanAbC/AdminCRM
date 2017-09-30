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

        $data = $responseBD[0];

        $json = [
            "res" => 1,
            "data" => [
                "id" => $data['id'],
                "name" => $data['name'],
                "last_name" => $data['last_name'],
                "nickname" => $data['nickname'],
                "mail" => $data['mail'],
                "user_type" => $data['user_type'],
                "token" => md5($data['password'])
            ]
        ];

        return $json;

    }else{

        return ["res" => 0];
    }

}

function registerUser($name, $lastName, $nickname, $mail, $password){

    $data = [
        'table' => 'users',
        'fields' => [
            "name" => $name,
            "last_name" => $lastName,
            "nickname" => $nickname,
            "mail" => $mail,
            "password" => $password,
            "register_date" => date("Y-m-d H:m:s"),
            "user_type" => 0
        ]
    ];

    $bd = new BD();
    $responseBD = $bd -> insert($data);

    if($responseBD == 1){

        return ["res" => 1];
    }else{

        return ["res" => 0, "errors" => $responseBD];
    }

}