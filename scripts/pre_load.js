

// Pegar o numero de pontos e mostrar no inicio
var getPoints = localStorage.getItem("pontos")
var getRandomBlocksPoints = localStorage.getItem("randomBlocksPoints")

window.addEventListener("load", function(){
	if(getPoints == null){
		recorde.innerHTML = "Seu recorde: 0"
	}else{
		recorde.innerHTML = `Seu recorde: ${getPoints}`
	}
})

