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


	if($action == 'getProductsByType'){
		
		if(isset($_GET['type'])){
		    $type = $_GET['type'];
            $response = getProductsByType($type);
            print json_encode($response);
		}else{
            $response = getProducts();
            print json_encode($response);
		}

	}

	if($action == 'getProducts'){
		$response = getProducts();
        print json_encode($response);
	}
	
}


if(isset($_POST['action'])){
	$action = $_POST['action'];

	if($action == 'registerProduct'){
		
		$name = $_POST['name'];
        $description = $_POST['description'];
        $price =$_POST['price'];
        $stock = $_POST['stock'];
        $type_id = $_POST['type_id'];
        $image = $_POST['name'];

        $response = registerProduct($name, $description, $price, $stock, $type_id, $image);
        print json_encode($response);

	}

	if($action == 'registerProductType'){
		$name = $_POST['name'];
        $description = $_POST['description'];
       
        $response = registerProductType($name, $description);
        print json_encode($response);
	}
}

?>