function addCirclesLayer(stage, centerX, centerY) {
	
	var layer = new Konva.Layer();

	var circleH = new Konva.Circle({
		x: centerX,
		y: centerY,
		radius: 50,
		fill: "red",
		stroke: "purple",
		strokeWidth: 3
	});
	//circleH.cache();
	
	var circleM = new Konva.Circle({
		x: centerX,
		y: centerY,
		radius: 40,
		fill: "red",
		stroke: "purple",
		strokeWidth: 3
	});
	//circleM.cache();
	
	var circleS = new Konva.Circle({
		x: centerX,
		y: centerY,
		radius: 30,
		fill: "red",
		stroke: "purple",
		strokeWidth: 3
	});
	//circleS.cache();
	
	
	layer.add(circleH);
	layer.add(circleM);
	layer.add(circleS);
	
	stage.add(layer);
	
	
	var degreesPerSec = 1;
	var const0 = Math.PI/180;        // Math.PI/180 * 3/2 ??? ???????? (? /1000 ??? ??????)
	var const1 = Math.PI * 3 / 2;
	var const2 = Math.PI * 2;
	var time;
	var animation = new Konva.Animation(function(frame) {
		stats.begin();
		
		
		time = (new Date()).getTime();
		
		circleH.setX(centerX + 60*Math.cos((time/3600000)%12*30*const0 + const2));
		circleH.setY(centerY + 60*Math.sin((time/3600000)%12*30*const0 + const2));
		
		circleM.setX(centerX + 150*Math.cos((time/60000)%60*6*const0 + const1));
		circleM.setY(centerY + 150*Math.sin((time/60000)%60*6*const0 + const1));
		
		circleS.setX(centerX + 220*Math.cos((time/1000)%60*6*const0 + const1));
		circleS.setY(centerY + 220*Math.sin((time/1000)%60*6*const0 + const1));
		
		
		stats.end();
	}, layer);
	
	animation.start();
}