$(document).ready(function(){
	if("Id" in localStorage){
		window.location.href = "admin.html";
	}else{
			window.location.href = "login.html";
		}
});