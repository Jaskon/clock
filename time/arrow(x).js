function addArrowsLayer(stage, centerX, centerY) {
	
	var layer = new Konva.Layer();
	
	
	var arrowPoints = [0,0, 0,20, 20,20, 20,-20, 0,-20, 0,0, 20,0, 20,10, 60,10, 60,-10, 20,-10, 40,-10, 40,10, 60,10, 60,0, 50,0];
	var sceneFunc = function(cx) {
		cx.beginPath();
		
		cx.moveTo(20, -10);
		cx.arc(10,-10, 10, Math.PI, 2*Math.PI);
		cx.moveTo(0, -10);
		cx.lineTo(0, 10);
		cx.arc(10,10, 10, 0, Math.PI);
		
		cx.lineTo(50, 10);
		cx.moveTo(50, -10);
		cx.arc(50,0, 10, 3*Math.PI/2, Math.PI/2);
		cx.moveTo(50, -10);
		cx.lineTo(20, -10);
		
		cx.moveTo(47, -10);
		cx.bezierCurveTo(42,-8, 42,8, 47,10);
		
		cx.moveTo(60, 0);
		cx.lineTo(54, 0);
		
		cx.strokeShape(this);
	};
	
	var arrowH = new Konva.Shape({
		sceneFunc: sceneFunc,
		scale: { x: 1.6, y: 1.6 },
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 3
	});
	//arrowH.cache();
	
	var arrowM = new Konva.Shape({
		sceneFunc: sceneFunc,
		scale: { x: 1.3, y: 1.3 },
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 3
	});
	//arrowM.cache();
	
	var arrowS = new Konva.Shape({
		sceneFunc: sceneFunc,
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 3
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
	var time;
	var animation = new Konva.Animation(function(frame) {
		stats.begin();
		
		
		time = (new Date()).getTime();
		
		arrowH.setX(centerX + 60*Math.cos((time/3600000)%12*30*const0 + const2));
		arrowH.setY(centerY + 60*Math.sin((time/3600000)%12*30*const0 + const2));
		
		arrowM.setX(centerX + 110*Math.cos((time/60000)%60*6*const0 + const1));
		arrowM.setY(centerY + 110*Math.sin((time/60000)%60*6*const0 + const1));
		
		arrowS.setX(centerX + 190*Math.cos((time/1000)%60*6*const0 + const1));
		arrowS.setY(centerY + 190*Math.sin((time/1000)%60*6*const0 + const1));
		
		// Rotation
		arrowS.rotation((time/1000)%60*6 + 270);
		arrowM.rotation((time/60000)%60*6 + 270);
		arrowH.rotation((time/3600000)%12*30);
		
		stats.end();
	}, layer);
	
	animation.start();
}