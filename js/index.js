//Variables Globales
var url = "http://localhost:8000/api/";
//Carga de la pagina
$(document).ready(function(){
	$('html').niceScroll();
	$(document).foundation();
	if("Id" in localStorage){
		$(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName")) ;
		$(".username").text(localStorage.getItem("Nickname")); 

		//Seccion que carga infomracion en la tarjeta de usuario
		$("#txtNameInfo").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
		$("#txtUserInfo").text(localStorage.getItem("Nickname")); 
		$("#txtMailInfo").text(localStorage.getItem("Mail"));

		//Seccion que rellena tabla de clientes
		var urlGetClient = url + "users/get_users_by_type/";
		$.post(urlGetClient, {user_type: 0} , function(response) {
			for(var i=0; i<(response.users).length;i++){
				$(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
			}
		});
		//Seccion que rellena tabla de productos
		var urlGetProduct = url + "products/get_products/";
		$.get(urlGetProduct, function(response) {
			for(var i=0; i<(response.data).length;i++){
				$(".tbodyProducts").append("<tr><td><img class='img_product' src='"+(response.data[i]).image+"'/></td><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).price+"</td><td>"+(response.data[i]).stock+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showProductUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
			}
		});
		//Seccion que rellena tabla de categorias
		var urlGetProductTypes = url + "products/get_products_types/";
		$.get(urlGetProductTypes, function(response) {
			for(var i=0; i<(response.data).length;i++){
				$(".tbodyCategories").append("<tr><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).description+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showCategoryUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteCategory(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
			}
		});
				
	}else{
		window.location.href = "login.html";
	}
		
});
//Seccion de funcionalidad de menu lateral
var flagmenusuer = 0;
$(".menuuserarrow").click(function(event) {
	if(flagmenusuer == 0){
		$(".contmenuusuer").slideDown('400');
		flagmenusuer++;
	}else{
		$(".contmenuusuer").slideUp('400');
		flagmenusuer--;
	}
	
});
var flagVerPerfil = 0;
$("#verPerfil").click(function(event) {
	if (flagVerPerfil == 0) {
		$(".clientes").hide();
		$(".productos").hide('400');
		$(".productTypes").hide('400');
		$("#updatePerfForm").hide();
		$(".userPerf").slideDown('400');
		flagVerPerfil++;
	}else{
		$(".userPerf").slideUp('400');
		flagVerPerfil--;
	}
	
});
$("#updatePerfil").click(function(event) {
	if (flagVerPerfil == 0) {
		$(".clientes").hide();
		$(".userPerf").hide();
		$(".productos").hide('400');
		$(".productTypes").hide('400');
		$("#upUserName").attr("placeholder", localStorage.getItem("Name"));
		$("#upUserLastName").attr("placeholder", localStorage.getItem("LastName"));
		$("#updatePerfForm").slideDown('400');
		flagVerPerfil++;
	}else{
		$("#updatePerfForm").slideUp('400');
		flagVerPerfil--;
	}	
});
$("#menuEstadisticas").click(function(event) {
	$(".userPerf").hide();
	$("#updatePerfForm").hide();
	$(".productos").hide('400');
	$(".productTypes").hide('400');
	$(".estadisticas").slideDown('400');
	$(".clientes").hide('400');
});
$("#menuClients").click(function(event) {
	$(".userPerf").hide();
	$("#updatePerfForm").hide();
	$(".productos").hide('400');
	$(".productTypes").hide('400');
	$(".estadisticas").hide('400');
	$(".clientes").slideDown('400');
});
$("#menuProducts").click(function(event) {
	$(".userPerf").hide();
	$("#updatePerfForm").hide();
	$(".clientes").hide('400');
	$(".productTypes").hide('400');
	$(".estadisticas").hide('400');
	$(".productos").slideDown('400');
});
$("#menuProductTypes").click(function(event) {
	$(".userPerf").hide();
	$("#updatePerfForm").hide();
	$(".clientes").hide('400');
	$(".estadisticas").hide('400');
	$(".productos").hide('400');
	$(".productTypes").slideDown('400');
});
//Seccion logout
var flaglogout = 0;
$(".username").click(function(event) {
	if(flaglogout == 0){
		$(".logout").slideDown('400');
		flaglogout++;
	}else{
		$(".logout").slideUp('400');
		flaglogout--;
	}
});
$(".logout").click(function(event) {
	localStorage.clear();
	window.location.href = "login.html"
});
//Seccion Clientes
		//Seccion menu superior
		$("#addClient").click(function(event) {
			$("#TableClients").hide('400');
			$("#updateClientForm").hide('400');
			$("#addClientForm").fadeIn('400');
		});
		$("#showClients").click(function(event) {
			$("#addClientForm").hide('400');
			$("#updateClientForm").hide('400');
			$("#TableClients").fadeIn('400');
		});
		//Agregar Clientes
		$("#clientSend").click(function(event) {
			completeURL = url + "users/register/";
			var clientname = $("#clientName").val();
			var lastname = $("#clientLastName").val();
			var clientuser = $("#clientUser").val();
			var clientmail = $("#clientMail").val();
			var clientpassword = $("#clientPassword").val();
			if(clientname != "" && lastname != "" && clientuser != "" && clientmail != "" && clientpassword != ""){
				$.post(completeURL, {name: clientname, last_name: lastname, nickname: clientuser, mail: clientmail, password: clientpassword} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Usuario agregado correctamente',
						  'success'
						)
						 $("#clientName").val("");
						 $("#clientLastName").val("");
						 $("#clientUser").val("");
						 $("#clientMail").val("");
						 $("#clientPassword").val("");
						 $(".tbodyClients").html("");
						 var urlGetClient = url + "users/get_users_by_type/";
						 $.post(urlGetClient, {user_type: 0} , function(response) {
							for(var i=0; i<(response.users).length;i++){
								console.log(response.users[i]);
								$(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
					}else{
						swal(
						  'Error',
						  'Error Ingresando el Usuario',
						  'error'
						)
					}
			    	
				}, 'json');
			}else{
				swal(
						  'Error',
						  'Ingresa todos los campos',
						  'error'
						)
			}
		});
		//Actualizar Clientes
		function showClientUpdate(event){
			var idClient = event.target.id;
			completeURL = url + "users/view_profile/"
			$.post(completeURL, {user_id: idClient} , function(response) {
				if(response.response == 1){
					$("#TableClients").hide();
					$("#upClientName").attr("placeholder", response.user.name);
					$("#upClientLastName").attr("placeholder", response.user.last_name);
					$("#upClientUser").attr("placeholder", response.user.nickname);
					$("#upClientMail").attr("placeholder", response.user.email);
					$("#clientSendUpdate").attr("id", idClient);
					$("#updateClientForm").slideDown('400');

				}else{
					swal(
					    'Error!',
					    'Algo ocurrio mal.',
					    'error'
					  )
				}
			});  
		}
		function updateClient(event){
			var urlGetClient = url + "users/get_users_by_type/";
			var idClient = event.target.id;
			completeURL = url + "users/update_user/";
			var clientname = $("#upClientName").val();
			var lastname = $("#upClientLastName").val();
			var clientuser = $("#upClientUser").val();
			var clientmail = $("#upClientMail").val();
			
				$.post(completeURL, {name: clientname,id: idClient, last_name: lastname, nickname: clientuser, mail: clientmail, password: ""} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Usuario actualizado correctamente',
						  'success'
						)
						 $("#clientName").val("");
						 $("#clientLastName").val("");
						 $("#clientUser").val("");
						 $("#clientMail").val("");
						 $("#clientPassword").val("");
						 $("#updateClientForm").hide();
						 $(".tbodyClients").html("");
						 $.post(urlGetClient, {user_type: 0} , function(response) {
							for(var i=0; i<(response.users).length;i++){
								console.log(response.users[i]);
								$(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
						 $("#TableClients").slideDown('400');
					}else{
						swal(
						  'Error',
						  'Error Actualizando el Usuario',
						  'error'
						)
					}
			    	
				}, 'json');
			
		};
		//Eliminar clientes
		function deleteClient(event){
				var idClient = event.target.id;
				completeURL = url + "users/delete_user/";
				var urlGetClient = url + "users/get_users_by_type/";
				console.log(idClient);
				swal({
					  title: 'Estas seguro?',
					  text: "No podras revertir esta operacion!",
					  type: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Si, eliminarlo!'
					}, function (isConfirm) {
						if(isConfirm){
							$.post(completeURL, {id: idClient} , function(response) {
								if(response.response == 1){
									swal(
									    'Exito!',
									    'El cliente ah sido eliminado.',
									    'success'
									  )
									$(".tbodyClients").html("");
									 $.post(urlGetClient, {user_type: 0} , function(response) {
										for(var i=0; i<(response.users).length;i++){
											console.log(response.users[i]);
											$(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
										}
									});
								}else{
									swal(
									    'Error!',
									    'Algo ocurrio mal.',
									    'error'
									  )
								}
							});  
						}else{

						}
						
					})
		}
		//Actualizar Perfil
		function updateUser(event){
			var urlGetClient = url + "users/view_profile/";
			var idClient = localStorage.getItem("Id");		
			completeURL = url + "users/update_user/";
			var clientname = $("#upUserName").val();
			var lastname = $("#upUserLastName").val();
			var clientpass = $("#upUserPassword").val();
			
				$.post(completeURL, {name: clientname,id: idClient,password:clientpass, last_name: lastname, password: ""} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Usuario actualizado correctamente',
						  'success'
						)
						 $("#upUserName").val("");
						 $("#upUserLastName").val("");
						 $("#upUserUser").val("");
						 $("#upUserMail").val("");
						 $("#upUserPassword").val("");
						 $("#updatePerfForm").hide();
						 $.post(urlGetClient, {user_id: idClient} , function(response) {
	
							localStorage.setItem("Name",response.user.name);
					    	localStorage.setItem("LastName",response.user.last_name);
					    	localStorage.setItem("Nickname",response.user.nickname);
					    	$(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName")) ;
							$(".username").text(localStorage.getItem("Nickname")); 

							//Seccion que carga infomracion en la tarjeta de usuario
							$("#txtNameInfo").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName"));
							$("#txtUserInfo").text(localStorage.getItem("Nickname")); 
							$(".clientes").hide();
							$("#updatePerfForm").hide();
							$(".userPerf").slideDown('400');
						});
					}else{
						swal(
						  'Error',
						  'Error Actualizando el Usuario',
						  'error'
						)
					}
			    	
				}, 'json');
			
		};
//Seccion Productos
		//Seccion menu superior
		$("#addProduct").click(function(event) {
			$("#TableProducts").hide('400');
			$("#updateProductForm").hide('400');
			$("#addProductForm").fadeIn('400');
		});
		$("#showProducts").click(function(event) {
			$("#addProductForm").hide('400');
			$("#updateProductForm").hide('400');
			$("#TableProducts").fadeIn('400');
		});
		//Agregar Productos
		$("#productSend").click(function(event) {
			completeURL = url + "products/register_product/";
			var productName = $("#productName").val();
			var productDescription = $("#productDescripcion").val();
			var productPrice = $("#productPrecio").val();
			var productStock = $("#productStock").val();
			var productType = $("#productType").val();
			var productImg = $("#productImg").val();
			if(productName != "" && productDescription != "" && productImg != ""){
				$.post(completeURL, {name: productName, description: productDescription, price: productPrice, stock: productStock, product_type: productType, image: productImg} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Producto agregado correctamente',
						  'success'
						)
						 $("#productName").val("");
						 $("#productDescripcion").val("");
						 $("#productPrecio").val("");
						 $("#productStock").val("");
						 $("#productType").val("");
						 $("#productImg").val("");
						 $(".tbodyProducts").html("");
						 var urlGetProduct = url + "products/get_products/";
						 $.get(urlGetProduct, function(response) {
							for(var i=0; i<(response.data).length;i++){
								console.log(response.data[i]);
								$(".tbodyProducts").append("<tr><td><img class='img_product' src='"+(response.data[i]).image+"'/></td><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).price+"</td><td>"+(response.data[i]).stock+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showProductUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
					}else{
						swal(
						  'Error',
						  'Error Ingresando el Producto',
						  'error'
						)
					}
			    	
				}, 'json');
			}else{
				swal(
						  'Error',
						  'Ingresa todos los campos',
						  'error'
						)
			}
		});
		//Actualizar Productos
		function showProductUpdate(event){
			var idProduct = event.target.id;
			completeURL = url + "products/get_products_by_id/"+idProduct+"/"
			$.get(completeURL, function(response) {
				if(response.response == 1){
					$("#TableProducts").hide();
					$("#upProductName").attr("placeholder", response.product.name);
					$("#upProductDescripcion").attr("placeholder", response.product.description);
					$("#upProductPrecio").attr("placeholder", response.product.price);
					$("#upProductStock").attr("placeholder", response.product.stock);
					//$("#upProductType").attr("placeholder", response.product.email);
					$("#upProductImg").attr("placeholder", response.product.image);
					$("#productSendUpdate").attr("id", idProduct);
					$("#updateProductForm").slideDown('400');
				}else{
					swal(
					    'Error!',
					    'Algo ocurrio mal.',
					    'error'
					  )
				}
			});  
		}
		function updateProduct(event){
			var urlGetProduct = url + "products/get_products/";
			var idProduct = event.target.id;
			completeURL = url + "products/update_product/";
			var productname = $("#upProductName").val();
			var productdescription = $("#upProductDescripcion").val();
			var productprice = $("#upProductPrecio").val();
			var productstock = $("#upProductStock").val();
			var productimg = $("#upProductImg").val();
			
				$.post(completeURL, {name: productname,id: idProduct, description: productdescription, price: productprice, stock: productstock, product_type: "", image: productimg} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Producto actualizado correctamente',
						  'success'
						)
						 $("#upProductName").val("");
						 $("#upProductDescripcion").val("");
						 $("#upProductPrecio").val("");
						 $("#upProductStock").val("");
						 $("#upProductImg").val("");
						 $("#updateProductForm").hide();
						 $(".tbodyProducts").html("");
						 $.get(urlGetProduct, function(response) {
							for(var i=0; i<(response.data).length;i++){
								console.log(response.data[i]);
								$(".tbodyProducts").append("<tr><td><img class='img_product' src='"+(response.data[i]).image+"'/></td><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).price+"</td><td>"+(response.data[i]).stock+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showProductUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
						 $("#TableProducts").slideDown('400');
					}else{
						swal(
						  'Error',
						  'Error Actualizando el Producto',
						  'error'
						)
					}
			    	
				}, 'json');
			
		};
		//Eliminar productos
		function deleteProduct(event){
				var idProduct = event.target.id;
				completeURL = url + "products/delete_product/";
				var urlGetProduct = url + "products/get_products/";
				swal({
					  title: 'Estas seguro?',
					  text: "No podras revertir esta operacion!",
					  type: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Si, eliminarlo!'
					}, function (isConfirm) {
						if(isConfirm){
							$.post(completeURL, {id: idProduct} , function(response) {
								if(response.response == 1){
									swal(
									    'Exito!',
									    'El producto ah sido eliminado.',
									    'success'
									  )
									$(".tbodyProducts").html("");
									 $.get(urlGetProduct, function(response) {
										for(var i=0; i<(response.data).length;i++){
											console.log(response.data[i]);
											$(".tbodyProducts").append("<tr><td><img class='img_product' src='"+(response.data[i]).image+"'/></td><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).price+"</td><td>"+(response.data[i]).stock+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showProductUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
										}
									});
								}else{
									swal(
									    'Error!',
									    'Algo ocurrio mal.',
									    'error'
									  )
								}
							});  
						}else{

						}
						
					})
		}
//Seccion Categorias
		//Seccion menu superior
		$("#addCategory").click(function(event) {
			$("#TableCategories").hide('400');
			$("#updateCategoryForm").hide('400');
			$("#addCategoryForm").fadeIn('400');
		});
		$("#showCategory").click(function(event) {
			$("#addCategoryForm").hide('400');
			$("#updateCategoryForm").hide('400');
			$("#TableCategories").fadeIn('400');
		});
		//Agregar Categoria
		$("#categorySend").click(function(event) {
			completeURL = url + "products/register_product_type/";
			var categoryname = $("#categoryName").val();
			var categorydescription = $("#categoryDescription").val();
			if(categoryname != "" && categorydescription != ""){
				$.post(completeURL, {name: categoryname, description: categorydescription} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Categoria agregada correctamente',
						  'success'
						)
						 $("#clientName").val("");
						 $("#categoryDescription").val("");
						 $(".tbodyCategories").html("");
						 var urlGetCategory = url + "products/get_products_types/";
						$.get(urlGetCategory, function(response) {
							for(var i=0; i<(response.data).length;i++){
								console.log(response.data[i]);
								$(".tbodyCategories").append("<tr><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).description+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showCategoryUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
					}else{
						swal(
						  'Error',
						  'Error Ingresando la categoria',
						  'error'
						)
					}
			    	
				}, 'json');
			}else{
				swal(
						  'Error',
						  'Ingresa todos los campos',
						  'error'
						)
			}
		});
		//Actualizar Categorias
		function showCategoryUpdate(event){
			var idCategory = event.target.id;
			completeURL = url + "products/get_products_types_by_id/"+idCategory+"/";
			$.get(completeURL, function(response) {
				if(response.response == 1){
					$("#TableCategories").hide();
					$("#upCategoryName").attr("placeholder", response.product_type.name);
					$("#upCategoryDescription").attr("placeholder", response.product_type.description);
					$("#categorySendUpdate").attr("id", idCategory);
					$("#updateCategoryForm").slideDown('400');

				}else{
					swal(
					    'Error!',
					    'Algo ocurrio mal.',
					    'error'
					  )
				}
			});  
		}
		function updateCategory(event){
			var urlGetCategory = url + "products/get_products_types/";
			var idCategory = event.target.id;
			completeURL = url + "products/update_product_type/";
			var categoryname = $("#upCategoryName").val();
			var categorydescription = $("#upCategoryDescription").val();
			
				$.post(completeURL, {name: categoryname,id: idCategory, description: categorydescription} , function(response) {
					if(response.response == 1){
						swal(
						  'Success',
						  'Categoria actualizada correctamente',
						  'success'
						)
						 $("#clientName").val("");
						 $("#clientLastName").val("");
						 $("#updateCategoryForm").hide();
						 $(".tbodyCategories").html("");
						$.get(urlGetCategory, function(response) {
							for(var i=0; i<(response.data).length;i++){
								console.log(response.data[i]);
								$(".tbodyCategories").append("<tr><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).description+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showCategoryUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
							}
						});
						 $("#TableCategories").slideDown('400');
					}else{
						swal(
						  'Error',
						  'Error Actualizando el Usuario',
						  'error'
						)
					}
			    	
				}, 'json');
			
		};
		//Eliminar categorias
		function deleteCategory(event){
				completeURL = url + "products/delete_product_type/";
				var urlGetCategory = url + "products/get_products_types/";
				var idCategory = event.target.id;
				swal({
					  title: 'Estas seguro?',
					  text: "No podras revertir esta operacion!",
					  type: 'warning',
					  showCancelButton: true,
					  confirmButtonColor: '#3085d6',
					  cancelButtonColor: '#d33',
					  confirmButtonText: 'Si, eliminarlo!'
					}, function (isConfirm) {
						if(isConfirm){
							$.post(completeURL, {id: idCategory} , function(response) {
								if(response.response == 1){
									swal(
									    'Exito!',
									    'La categoria ah sido eliminada.',
									    'success'
									  )
									$(".tbodyCategories").html("");
									$.get(urlGetCategory, function(response) {
										for(var i=0; i<(response.data).length;i++){
											console.log(response.data[i]);
											$(".tbodyCategories").append("<tr><td>"+(response.data[i]).name+"</td><td>"+(response.data[i]).description+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showCategoryUpdate(event)' id='"+(response.data[i]).id+"'><img src='img/delete-button.png' onclick='deleteProduct(event)' id='"+(response.data[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
										}
									});
								}else{
									swal(
									    'Error!',
									    'Algo ocurrio mal.',
									    'error'
									  )
								}
							});  
						}else{

						}
						
					})
		}

//Seccion de estadisticas

//var ctx = document.getElementById("myChartFeeling").getContext('2d');
var myChart = new Chart($("#myChartFeeling"), {
    type: 'bar',
    data: {
        labels: ["1 Estrellas", "2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});