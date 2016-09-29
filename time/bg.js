function addBGLayer(stage, centerX, centerY) {
	
	var layerBG = new Konva.Layer();
	var numbers = [];
	for (var i = 0; i < 12; i++) {
		numbers[i] = new Konva.Text({
			x: centerX - (i > 8 ? 18 : 8) + (centerX - 45) * Math.cos(30 * (i + 1) * Math.PI/180 + Math.PI*3/2),
			y: centerY - 15 + (centerY - 45) * Math.sin(30 * (i + 1) * Math.PI/180 + Math.PI*3/2),
			text: i+1,
			fontSize: 30
		});
		
		layerBG.add(numbers[i]);
	}
	
	var minutes = [];
	for (var i = 0; i < 60; i++) {
		minutes[i] = new Konva.Line({
			points: [
			    centerX + (centerX - 90) * Math.cos(6 * (i + 1) * Math.PI/180 + Math.PI*3/2),
			    centerY + (centerY - 90) * Math.sin(6 * (i + 1) * Math.PI/180 + Math.PI*3/2),
			    centerX + (centerX - 80) * Math.cos(6 * (i + 1) * Math.PI/180 + Math.PI*3/2),
			    centerY + (centerY - 80) * Math.sin(6 * (i + 1) * Math.PI/180 + Math.PI*3/2)
			],
			stroke: "purple",
		    lineJoin: "round",
		    strokeWidth: 2
		});
		
		layerBG.add(minutes[i]);
	}
	
	var centerCircle = new Konva.Circle({
		x: centerX,
		y: centerY,
		radius: 5,
		stroke: "black",
		strokeWidth: 1
	});
	
	layerBG.add(centerCircle);
	
	stage.add(layerBG);
}