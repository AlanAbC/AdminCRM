<?php

$encoding = "UTF-8";
mb_internal_encoding($encoding);
mb_http_output($encoding);

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

function getProductsType(){

    $data = [
        'table' => 'products_types',
    ];

    $bd = new BD();
    $responseBD = $bd -> select($data);

    if(!empty($responseBD)){

        return ['res' => 1, 'products_types' => $responseBD];

    }else{

        return ["res" => 0];
    }

}

function getProducts(){

    $data = [
        'table' => 'products p, products_types t',
        'fields' => [
            'p.id',
            'p.name',
            'p.description',
            'p.price',
            'p.stock',
            'p.image',
            't.name as type'
        ],
        'where' => 'p.type_id = t.id',
    ];

    $bd = new BD();
    $responseBD = $bd -> select($data);

    if(!empty($responseBD)){

        return ['res' => 1, 'products' => $responseBD];

    }else{

        return ["res" => 0];
    }

}

function getProductsByType($type){

    $data = [
        'table' => 'products p, products_types t',
        'fields' => [
            'p.id',
            'p.name',
            'p.description',
            'p.price',
            'p.stock',
            'p.image',
            't.name as type'
        ],
        'where' => 'p.type_id = t.id AND type_id = '.$type,
    ];

    $bd = new BD();
    $responseBD = $bd -> select($data);

    if(!empty($responseBD)){

        return ['res' => 1, 'products' => $responseBD];

    }else{

        return ["res" => 0];
    }
}








