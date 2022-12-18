
var cubecount = document.getElementById("cubeCount")
var cubes     = 10

function pointAndClick(){
	point = 0
	score.innerHTML = `score: ${point}`

	//Movimento automático do cubo
	if(isChecked == false){
		cubeLocation(1500, true)
	}else if(isChecked == true){}

	// Criar cubo
	createCube("cube", 1)
	cubeAnimation("fadeSpin")

	score.style.display = "initial"
	timer.style.display = "none"
	cubecount.style.display = "none"

	cubo.addEventListener("click", function(){

		point++
		score.innerHTML = `score: ${point}`

		// Muda o local do cubo ao clicar nele
		cubeLocation(0, false)
		salvarPontos()

		switch(point){
			case 10:
				score.classList.add("animate__tada")
				cubo.style.width = "30px"
				cubo.style.height = "30px"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 20:
				score.classList.add("animate__tada")
				cubo.style.width = "50px"
				cubo.style.height = "50px"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
				break;

			case 30:
				score.classList.add("animate__tada")
				cubo.style.height = "20px"
				cubo.style.border = "1.5px inset darkred"
				cubo.style.background = "linear-gradient(360deg, rgba(87,19,0,1) 9%, rgba(195,25,17,1) 87%)"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 40:
				score.classList.add("animate__tada")
				cubo.style.height = "50px"
				cubo.style.border = "none"
				cubo.style.background = "white"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 50:
				score.classList.add("animate__tada")
				cubo.style.background = "linear-gradient(360deg, rgba(48,9,3,1) 59%, rgba(30,87,0,1) 87%)"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 60:
				score.classList.add("animate__tada")
				cubo.style.background = "white"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 70:
				score.classList.add("animate__tada")
				cubo.style.border = "2px solid darkred"
				cubo.style.transform = "rotateZ(120deg)"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 80:
				score.classList.add("animate__tada")
				cubo.style.background = "white"
				cubo.style.border = "none"
				cubo.style.transform = "rotateZ(0deg)"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 90:
				score.classList.add("animate__tada")
				cubo.style.background = "#e7c309"
				cubo.innerHTML = "?"
				cubo.style.border = "2px inset #d9ad00"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
			break;

			case 100:
				score.classList.add("animate__tada")
				clearInterval(locationTimer)
				container.style.border = "1px outset #d9ad00"
				setTimeout(function(){score.classList.remove("animate__tada")}, 1500)
				alert("Agora tecnicamente você acabou de zerar o jogo :)")
			break;
		}
	})
}

function randomCube(){
	var segundos = 10
	cubeId = 0
	score.style.display = "none"
	timer.style.display = "initial"
	cubecount.style.display = "initial"
	timer.innerHTML = "10s"

	//numero de cubos
	cubecount.innerHTML = cubes

	gerarCubos = setInterval(function(){

		// Criar cubo
		createCube("cube", 2)
		cubeAnimation("fadeSpin")
		cubeLocation(0, false)

		// Configuração para permitir o clique no cubo
		setTimeout(function(){
			cubeId++
			cubo.setAttribute("id", `${cubeId}`)
			cubo.setAttribute("onClick", `clickCube(${cubeId})`)
		}, 50)

		// Configurações da partida
		if(document.getElementsByClassName("cube").length == cubes){
		 	clearInterval(gerarCubos)

		 	partidaInterval = setInterval(function(){
		 		segundos--
				timer.innerHTML = `${segundos}s`
				if(segundos == 3){
					timer.style.color = `red`
					container.style.border = `1px outset red`
				}else if(segundos == 0){
					clearInterval(partidaInterval)
		 			timer.classList.add("animate__headShake")
		 			animation(losecontainer, "animation__fadeIn", false)
		 			animation(containerheader, "animation__fadeOut", true)
		 			timer.style.color = `white`
					container.style.border = `1px outset white`
					cubes = 10
				}
		 	}, 1000)
		}
	}, 100)
}

function clickCube(c){
	canvas.removeChild(document.getElementById(c))

	if(document.getElementsByClassName("cube").length == 0){
		clearInterval(partidaInterval)
		animation(containerheader, "animation__fadeOut", true)
		animation(wincontainer, "animation__fadeIn", false)
		container.style.border = `1px outset white`
		timer.style.color = `white`
	}
}


// function runCubeRun(){
// 	score.style.display = "initial"
// 	timer.style.display = "none"
// 	cubecount.style.display = "none"

// 	createCube("cube")
// 	cubeAnimation("normal")

// 	var ground = document.createElement("div")
// 	ground.setAttribute("id", "ground")
// 	canvas.appendChild(ground)

// 	var gridCollision = document.createElement("div")
// 	gridCollision.setAttribute("id", "gridCollision")
// 	canvas.appendChild(gridCollision)

// 	window.addEventListener("keydown", function(el){
// 		if(el.keyCode == 39){
// 			cubo.style.transform += "translateX(3.4px)"
// 		}
// 		if(el.keyCode == 37){
// 			cubo.style.transform += "translateX(-3.4px)"
// 		}
// 		if(el.keyCode == 38){
// 			cubo.style.transform += "translateY(-3.4px)"
// 		}
// 		if(el.keyCode == 40){
// 			cubo.style.transform += "translateY(3.4px)"
// 		}

// 		console.log(el.keyCode)
// 	})
// }
