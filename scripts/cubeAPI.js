
function createCube(styles, animationTime){
	cubo = document.createElement("div")
	cubo.setAttribute("class", styles)
	if(animationTime == 1){
		cubo.style.transition = "opacity .8s, transform .8s, width .8s, height .8s, top .5s, left .5s"
	}else if(animationTime == 2){
		cubo.style.transition = "opacity .4s, transform .5s, width .5s, height .5s"
	}else if(undefined){
		
	}
	canvas.appendChild(cubo)
}

function cubeAnimation(type){
	switch(type){
		case "normal":
			cubo.style.width = "50px"
			cubo.style.height = "50px"
			cubo.style.opacity = 1
		break;

		case "fadeSpin":
			setTimeout(function(){
				cubo.style.width = "50px"
				cubo.style.height = "50px"
				cubo.style.transform = "rotateZ(0deg)"
				cubo.style.opacity = 1
			}, 50)
		break;
	}
}

function cubeLocation(time, enable){
	if(enable == true){
		locationTimer = setInterval(function(){
			y = randomNumber(35, canvasY)
			x = randomNumber(35, canvasX)
			cubo.style.top = `${y}px`
			cubo.style.left = `${x}px`
		}, time)
	}else if(enable == false){
		y = randomNumber(35, canvasY)
		x = randomNumber(35, canvasX)
		cubo.style.top = `${y}px`
		cubo.style.left = `${x}px`
	}
}

// class CubeLocation {
// 	constructor(time){
// 		this.time = time
// 	}

// 	startMove = function(){
// 		var locationTimer = setInterval(function(){
// 			var y = randomNumber(35, canvasY)
// 			var x = randomNumber(35, canvasX)
// 			cubo.style.top = `${y}px`
// 			cubo.style.left = `${x}px`
// 		}, this.time)
// 	}

// 	move = function(){
// 		var y = randomNumber(35, canvasY)
// 		var x = randomNumber(35, canvasX)
// 		cubo.style.top = `${y}px`
// 		cubo.style.left = `${x}px`
// 	}

// }
