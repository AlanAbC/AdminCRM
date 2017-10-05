<?php 

$encoding = "UTF-8";
mb_internal_encoding($encoding);
mb_http_output($encoding);
include_once('functions.php');



if(isset($_POST['action'])){
	$action = $_POST['action'];

	if($action == 'registerRate'){
		
		//session_start();
		//$user_id = $_SESSION["user_id"];
		//solo de ejemplo para comprobar que funciona
		$user_id = $_POST['user_id'];
        $product_id = $_POST['product_id'];
        $score =$_POST['score'];
        $comment = $_POST['comment'];
        
        $response = registerRate($user_id, $product_id, $score, $comment);
        print json_encode($response);
	}

	if($action == 'getRatesByProduct'){
		$product_id = $_POST['product_id'];        
        $response = getRatesByProduct($product_id);
        print json_encode($response);		

	}

}

?>