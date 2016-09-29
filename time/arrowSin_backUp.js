function arrowHWrap() {

	var prevTime = new Date();
	var currTime = new Date();

	var const0 = Math.PI/180
	var const270 = 3*Math.PI/2;
	var dTime = 0, angle = 0;

	var arrowDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();
		dTime = (currTime.getTime() - prevTime.getTime()) / 1000;
		angle += dTime * 90;
		angle = 33;        // static sinusoid-arrow


		cx.beginPath();
		
		
		cx.fillStyle = "purple";
		for (var i = 0; i < 60; i++)
			cx.fillRect(i, 20 * Math.cos((angle + i*4) * const0), 1, 1);
		for (var i = 0; i < 60; i++)
			cx.fillRect(i, 20 * Math.cos((180 + angle + i*4) * const0), 1, 1);
		
		
		cx.strokeShape(this);
	};

	return arrowDrawing;
}


function dashWrap() {

	var prevTime = new Date();
	var currTime = new Date();
	var dTime = 0, dTimeSum = 0;
	
	var dash = new Image();
	dash.src = "images/flying_dash_full_flipped.png";
	var currFrame = 0;
	

	var dashDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();
		dTime = (currTime.getTime() - prevTime.getTime());
		
		
		cx.beginPath();
		
		
		cx.drawImage(dash, currFrame * 54, 0, 54, 36, -28, -36, 54, 36);
		
		dTimeSum += dTime;
		if (dTimeSum > 100) {
			dTimeSum = 0;
			currFrame = currFrame >=15 ? 0 : currFrame + 1;
		}
	};

	return dashDrawing;
}

function pinkieWrap() {

	var prevTime = new Date();
	var currTime = new Date();
	var dTime = 0, dTimeSum = 0;
	
	var pinkie = new Image();
	pinkie.src = "images/jumping_pinkie_full_flipped.png";
	_globals.pinkieFrame = 0;		// Current animation frame number
	_globals.pinkieFrameTime = 100;		// Animation speed (one frame time)
	_globals.pinkieTotalFramesTime = _globals.pinkieFrameTime * 8;
	

	var pinkieDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();
		//dTime = (currTime.getTime() - prevTime.getTime());
		

		/*dTimeSum += dTime;
		if (dTimeSum >= totalFramesTime) {		// To 0 frame
			dTimeSum = dTimeSum % totalFramesTime;
		}

		_globals.pinkieFrame = Math.floor(dTimeSum / _globals.pinkieFrameTime);*/

		
		cx.beginPath();
		
		cx.drawImage(pinkie, _globals.pinkieFrame * 89, 0, 89, 90, -37, -90, 89, 90);
	};

	return pinkieDrawing;
}



function addArrowsLayer(stage, centerX, centerY) {
	
	var layer = new Konva.Layer();
	
	
	var arrowDrawing = arrowHWrap();
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
	
	var pinkieDrawing = pinkieWrap();
	var arrowM = new Konva.Shape({
		sceneFunc: pinkieDrawing,
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 2
	});
	//arrowM.cache();
	
	var dashDrawing = dashWrap();
	var arrowS = new Konva.Shape({
		sceneFunc: dashDrawing,
		x: centerX,
		y: centerY,
		stroke:"black",
		lineJoin: "round",
		strokeWidth: 2
	});
	//arrowS.cache();
	
	var mText1 = new Konva.Text({
		x: 0,
		y: 0,
		text: 0,
		fontSize: 14,
		fill: "indigo"
	});
	
	var mText2 = new Konva.Text({
		x: 0,
		y: 0,
		text: 0,
		fontSize: 14,
		fill: "indigo"
	})
	
	
	layer.add(arrowH);
	layer.add(arrowM);
	layer.add(arrowS);
	
	layer.add(mText1);
	layer.add(mText2);
	
	stage.add(layer);
	
	
	var degreesPerSec = 1;
	var const0 = Math.PI/180;        // Math.PI/180 * 3/2 ??? ???????? (? /1000 ??? ??????)
	var const1 = Math.PI * 3 / 2;
	var const2 = Math.PI * 2;
	
	var constAnim = 200;        // For arrow animation (speed?)
	var date = new Date(), prevTime = (new Date()).getTime(), time = (new Date()).getTime(), minutes, hours, prevMinute = (new Date()).getMinutes() - 1, dTime = 0, dTimeSum = 0;
	var transition = 0.5, transitionTimeLeft = transition;
	var tPinkieTime = 0, tPinkieFrame, animateMinute = false;
	
	
	
	var animation = new Konva.Animation(function(frame) {
		date = new Date();
		prevTime = time;
		time = date.getTime();
		minutes = date.getMinutes();
		hours = date.getHours();
		dTime = (time - prevTime);


		stats.begin();
		
		
		/* Seconds arrow */
		arrowS.setX(centerX + 285*Math.cos((time/1000)%60*6*const0 + const1));
		arrowS.setY(centerY + 285*Math.sin((time/1000)%60*6*const0 + const1));
		
		arrowS.rotation((time/1000)%60*6 + 5);
		/* ^Seconds arrow^ */
		
		
		/* Minute arrow */
		/* <This> should be in pinkieDrawing function. But while it here, animation looks better */
		dTimeSum += dTime;
		if (dTimeSum >= _globals.pinkieTotalFramesTime) {		// To 0 frame
			dTimeSum = dTimeSum % _globals.pinkieTotalFramesTime;
		}

		_globals.pinkieFrame = Math.floor(dTimeSum / _globals.pinkieFrameTime);
		/* ^This^ */

		if (prevMinute != minutes) {		// Minute changing

			prevMinute = (prevMinute > minutes ? prevMinute - 60 : prevMinute);

			if (tPinkieTime == 0) {
				tPinkieTime = (new Date()).getTime();
				tPinkieFrame = _globals.pinkieFrame;
				tPinkieTime += 2 - (tPinkieFrame > 2 ? tPinkieFrame - 8 : tPinkieFrame) * _globals.pinkieFrameTime;
			}

			if (time > tPinkieTime)
				animateMinute = true;

			if (animateMinute) {
				arrowM.setX(centerX + 230*Math.cos((minutes - (minutes - prevMinute) * (7- (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 6) * 6 * const0 + const1));
				arrowM.setY(centerY + 230*Math.sin((minutes - (minutes - prevMinute) * (7 - (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 6) * 6 * const0 + const1));
				
				arrowM.rotation((minutes - (minutes - prevMinute) * (6 - (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 5) * 6 + 180);
				
				
				

				if (time - tPinkieTime > 700) {        // Last frame (save from lagging)

					arrowM.setX(centerX + 230*Math.cos(minutes * 6 * const0 + const1));
					arrowM.setY(centerY + 230*Math.sin(minutes * 6 * const0 + const1));
					
					arrowM.rotation(minutes * 6 + 180);
					
					
					mText1.setText((minutes == 0 ? 60 : minutes) - 1);
					mText2.setText(minutes + 1);
					
					mText1.setX(centerX + 212*Math.cos((minutes + (minutes > 9 ? 0.34 : 0.17) - 1) * 6 * const0 + const1));
					mText1.setY(centerY + 212*Math.sin((minutes + (minutes > 9 ? 0.34 : 0.17) - 1) * 6 * const0 + const1));
					mText2.setX(centerX + 212*Math.cos((minutes + (minutes > 9 ? 0.34 : 0.17) + 1) * 6 * const0 + const1));
					mText2.setY(centerY + 212*Math.sin((minutes + (minutes > 9 ? 0.34 : 0.17) + 1) * 6 * const0 + const1));
					
					mText1.rotation((minutes - 1) * 6 + 180);
					mText2.rotation((minutes + 1) * 6 + 180);


					prevMinute = minutes;
					animateMinute = false;
					tPinkieTime = 0;
				}
			} else {		// For starting position (do I need it?)

				arrowM.setX(centerX + 230*Math.cos(prevMinute * 6 * const0 + const1));
				arrowM.setY(centerY + 230*Math.sin(prevMinute * 6 * const0 + const1));

				arrowM.rotation(prevMinute * 6 + 180);
			}

			
			/*transitionTimeLeft -= (frame.timeDiff) / 1000;
			
			arrowM.setX(centerX + 230*Math.cos((minutes - (minutes - prevMinute) * transitionTimeLeft / transition)*6*const0 + const1));
			arrowM.setY(centerY + 230*Math.sin((minutes - (minutes - prevMinute) * transitionTimeLeft / transition)*6*const0 + const1));
			
			arrowM.rotation((minutes - (minutes - prevMinute) * transitionTimeLeft / transition)*6 + 180);
			
			if (transitionTimeLeft <= 0) {
				arrowM.setX(centerX + 230*Math.cos(minutes*6*const0 + const1));
				arrowM.setY(centerY + 230*Math.sin(minutes*6*const0 + const1));
				
				arrowM.rotation(minutes*6 + 180);
				
				prevMinute = minutes;
				transitionTimeLeft = transition;
			}*/
		} else {		// Minute static
			
			/*arrowM.setX(centerX + 150*Math.cos(minutes*6*const0 + const1));
			arrowM.setY(centerY + 150*Math.sin(minutes*6*const0 + const1));
			
			arrowM.rotation(minutes*6 + 270);*/
		}
		/* ^Minute arrow^ */
		
		
		/* Hours arrow */
		arrowH.setX(centerX + 20 * Math.cos(hours % 12 * 30 * const0 + const1));
		arrowH.setY(centerY + 20 * Math.sin(hours % 12 * 30 * const0 + const1));
		
		arrowH.rotation(hours % 12 * 30 + 270);
		
		
		/*arrowSubH.setX(centerX + 20*Math.cos((time/3600000)%12*30*const0 + const2));
		arrowSubH.setY(centerY + 20*Math.sin((time/3600000)%12*30*const0 + const2));
		
		arrowSubH.rotation((time/3600000)%12*30);*/
		/* ^Hours arrow^ */
		

		stats.end();
	}, layer);
	
	
	animation.start();
}