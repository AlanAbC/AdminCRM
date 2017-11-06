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
				console.log(response.users[i]);
				$(".tbodyClients").append("<tr><td>"+(response.users[i]).name+"</td><td>"+(response.users[i]).nickname+"</td><td>"+(response.users[i]).email+"</td><td><img src='img/edit.png' class='iconoptedit' onclick='showClientUpdate(event)' id='"+(response.users[i]).id+"'><img src='img/delete-button.png' onclick='deleteClient(event)' id='"+(response.users[i]).id+"' class='iconoptdelete deleteClient'></td></tr>");
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
		$(".userPerf").slideDown('400');
		flagVerPerfil++;
	}else{
		$(".userPerf").slideUp('400');
		flagVerPerfil--;
	}
	
});
$("#menuClients").click(function(event) {
	$(".userPerf").hide();
	$(".clientes").slideDown('400');
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
			$("#addClientForm").fadeIn('400');
		});
		$("#showClients").click(function(event) {
			$("#addClientForm").hide('400');
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
					console.log(response);
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

					console.log(response);
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
					console.log(response);
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
		
		