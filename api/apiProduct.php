<?php 

$encoding = "UTF-8";
mb_internal_encoding($encoding);
mb_http_output($encoding);

include_once('functions.php');

if(isset($_GET['action'])){

	$action = $_GET['action'];

	if($action == 'getProductsType'){

		$response = getProductsType();

		print json_encode($response);
	}

	if($action == 'getProducts'){

		if(isset($_GET['type'])){

		    $type = $_GET['type'];

            $response = getProductsByType($type);

            print json_encode($response);

		}else{

            $response = getProducts();

            print json_encode($response);
		}

	}
	
}

if(isset($_POST['action'])){



}

?>