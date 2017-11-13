var url = "http://localhost:8000/api/";

$(".send").click(function(event) {
	var usuario = $("#mail").val();
	var contraseña = $("#pass").val();

	login(usuario, contraseña);


});

function login(usuario, contraseña){
	completeURL = url + "users/login/";
	$.post(completeURL, {username: usuario, password: contraseña} , function(response) {
		console.log(response);
		if(response.response == 1){
			if(response.data.user_type == 1){
				localStorage.setItem("Id",response.data.id);
		    	localStorage.setItem("Name",response.data.name);
		    	localStorage.setItem("LastName",response.data.last_name);
		    	localStorage.setItem("Nickname",response.data.nickname);
		    	localStorage.setItem("Mail",response.data.mail);
		    	localStorage.setItem("Type",response.data.user_type);
		    	localStorage.setItem("Token",response.data.token);
		    	window.location.href = "index.html"
			}else{
				swal(
				  'Error',
				  'Tipo de usuario Incorrecto',
				  'error'
				)
				var usuario = $("#mail").val("");
				var contraseña = $("#pass").val("");
			}
			
		}else{
			swal(
			  'Error',
			  'Usuario o Contraseña Incorrectos',
			  'error'
			)
			var usuario = $("#mail").val("");
			var contraseña = $("#pass").val("");
		}
    	
	}, 'json');
}