<?php

include_once('functions.php');

if(isset($_POST['action'])){

    $action = $_POST['action'];

    if($action == 'login'){
        $user = $_POST['user'];
        $password = $_POST['password'];

        $response = login($user, $password);

        print json_encode(['response' => $response]);

    }

}