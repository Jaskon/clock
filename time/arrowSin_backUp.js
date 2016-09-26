function arrowWrap() {

	var prevTime = new Date();
	var currTime = new Date();

	var const0 = Math.PI/180
	var const270 = 3*Math.PI/2;
	var dTime = 0, l = 0, angle = 0;

	var arrowDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();
		dTime = (currTime.getTime() - prevTime.getTime()) / 1000;
		//l += dTime * 4;
		angle += dTime * 90;
		//angle = 33;        // static sinusoid-arrow


		cx.beginPath();


		for (var i = 0; i < 60; i++)
			cx.fillRect(l + i, 20 * Math.cos((angle + i*4) * const0), 1, 1);
		for (var i = 0; i < 60; i++)
			cx.fillRect(l + i, 20 * Math.cos((180 + angle + i*4) * const0), 1, 1);


		cx.strokeShape(this);
	};

	return arrowDrawing;
}


function celestWrap() {

	var prevTime = new Date();
	var currTime = new Date();
	var dTime = 0, dTimeSum = 0;
	
	var celest = new Image();
	celest.src = "images/flying_dash_full_flipped.png";
	var currFrame = 0;
	

	var celestDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();
		dTime = (currTime.getTime() - prevTime.getTime());
		
		
		cx.beginPath();
		
		
		cx.drawImage(celest, currFrame * 54, 0, 54, 36, -28, -36, 54, 36);
		
		dTimeSum += dTime;
		if (dTimeSum > 100) {
			dTimeSum = 0;
			currFrame = currFrame >=15 ? 0 : currFrame + 1;
		}
	};

	return celestDrawing;
}



function addArrowsLayer(stage, centerX, centerY) {
	
	var layer = new Konva.Layer();
	
	
	var sceneFunc = function(cx) {
		
		cx.beginPath();
		
		cx.moveTo(0, 0);
		cx.bezierCurveTo(0,0, 10,20, 20,0);
		cx.bezierCurveTo(20,0, 30,-20, 40,0);
		cx.bezierCurveTo(40,0, 30,20, 20,0);
		cx.bezierCurveTo(20,0, 10,-20, 0,0);
		
		cx.strokeShape(this);
	};
	
	
	var arrowDrawing = arrowWrap();
	var arrowH = new Konva.Shape({
		sceneFunc: arrowDrawing,
		scale: { x: 1.6, y: 1.6 },
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 2
	});
	//arrowH.cache();
	
	var arrowM = new Konva.Shape({
		sceneFunc: sceneFunc,
		scale: { x: 1.3, y: 1.3 },
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 2
	});
	//arrowM.cache();
	
	var celestDrawing = celestWrap();
	var arrowS = new Konva.Shape({
		sceneFunc: celestDrawing,
		x: centerX,
		y: centerY,
		stroke:"black",
		lineJoin: "round",
		strokeWidth: 2
	});
	//arrowS.cache();
	
	
	layer.add(arrowH);
	layer.add(arrowM);
	layer.add(arrowS);
	
	stage.add(layer);
	
	
	var degreesPerSec = 1;
	var const0 = Math.PI/180;        // Math.PI/180 * 3/2 ??? ???????? (? /1000 ??? ??????)
	var const1 = Math.PI * 3 / 2;
	var const2 = Math.PI * 2;
	
	var constAnim = 200;        // For arrow animation (speed?)
	var date, time, minutes;
	var animation = new Konva.Animation(function(frame) {
		stats.begin();
		
		
		date = new Date();
		time = date.getTime();
		minutes = date.getMinutes();
		
		arrowH.setX(centerX + 20*Math.cos((time/3600000)%12*30*const0 + const2));
		arrowH.setY(centerY + 20*Math.sin((time/3600000)%12*30*const0 + const2));
		
		arrowM.setX(centerX + 150*Math.cos(minutes*6*const0 + const1));
		arrowM.setY(centerY + 150*Math.sin(minutes*6*const0 + const1));
		
		arrowS.setX(centerX + 285*Math.cos((time/1000)%60*6*const0 + const1));
		arrowS.setY(centerY + 285*Math.sin((time/1000)%60*6*const0 + const1));
		
		// Rotation
		arrowS.rotation((time/1000)%60*6 + 5);
		arrowM.rotation(minutes*6 + 270);
		arrowH.rotation((time/3600000)%12*30);
		

		stats.end();
	}, layer);
	
	animation.start();
}