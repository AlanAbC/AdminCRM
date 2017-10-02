//Carga de la pagina
$(document).ready(function(){
	$('html').niceScroll();
	$(document).foundation();

	$(".menuusertxt").text(localStorage.getItem("Name") + " " + localStorage.getItem("LastName")) ;
	$(".username").text(localStorage.getItem("Nickname"));	
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