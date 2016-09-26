function addArrowsLayer(stage, centerX, centerY) {
	
	var layer = new Konva.Layer();
	
	
	var l = 0, prevTimeArrow = new Date(), currTimeArrow= new Date(), dTime = 0;
	var sceneFunc = function(cx) {
		prevTimeArrow = currTimeArrow;
		currTimeArrow = new Date();
		dTime = (currTimeArrow.getTime() - prevTimeArrow.getTime()) / 1000;
		
		
		cx.beginPath();
		
		cx.moveTo(0, 0);
		cx.bezierCurveTo(0,0, 10,20, 20,0);
		cx.bezierCurveTo(20,0, 30,-20, 40,0);
		cx.bezierCurveTo(40,0, 30,20, 20,0);
		cx.bezierCurveTo(20,0, 10,-20, 0,0);
		
		
		cx.strokeShape(this);
	};
	
	var arrowH = new Konva.Shape({
		sceneFunc: sceneFunc,
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
	
	var arrowS = new Konva.Shape({
		sceneFunc: sceneFunc,
		x: centerX,
		y: centerY,
		stroke: "purple",
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
		
		// Arrow animation
		arrowS.dash([Math.max((time/constAnim)%16 - 8, 0), Math.min((time/constAnim)%16, 8), 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
		arrowM.dash([Math.max((time/constAnim)%16 - 8, 0), Math.min((time/constAnim)%16, 8), 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
		arrowH.dash([Math.max((time/constAnim)%16 - 8, 0), Math.min((time/constAnim)%16, 8), 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
		stats.end();
	}, layer);
	
	animation.start();
}