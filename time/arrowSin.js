function arrowHoursTwiCreate(layer, centerX, centerY) {

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
		//angle = 33;        // static sinusoid-arrow


		cx.beginPath();


		cx.fillStyle = "purple";
		for (var i = 0; i < 60; i++)
			cx.fillRect(i, 15 * Math.cos((angle + i*4) * const0), 1, 1);
		for (var i = 0; i < 60; i++)
			cx.fillRect(i, 15 * Math.cos((180 + angle + i*4) * const0), 1, 1);


		cx.strokeShape(this);
	};


	var arrow = new Konva.Shape({
		sceneFunc: arrowDrawing,
		scale: { x: 2, y: 2 },
		x: centerX,
		y: centerY,
		lineJoin: "round",
		strokeWidth: 2
	});

	layer.add(arrow);



	var subArrowOpacity = 0;
	var subArrowDrawing = function(cx) {

		cx.beginPath();


		cx.moveTo(0, 0);
		for (var i = 0; i < 160; i += 2) {
			subArrowOpacity = (i < 40 ? subArrowOpacity + 0.01 : (i > 119 ? subArrowOpacity - 0.01 : subArrowOpacity));
			cx.fillStyle = "rgba(128, 0, 128, " + subArrowOpacity + ")";
			cx.fillRect(i,-1, 2, 2);
		}


		cx.fillStrokeShape(this);
	};


	var subArrow = new Konva.Shape({
		sceneFunc: subArrowDrawing,
		x: centerX,
		y: centerY,
		lineCap: "round",
		strokeWidth: 2
	});

	layer.add(subArrow);



	/* The circle arount current hours number */
	var circleArrowDrawing = function(cx) {

		cx.beginPath();


		cx.arc(0, 0, 25, 0, 2 * Math.PI);

		cx.strokeStyle = "purple";
		cx.lineWidth = 3;
		cx.stroke();
	}


	var circleArrow = new Konva.Shape({
		sceneFunc: circleArrowDrawing,
		x: centerX,
		y: centerY
	});

	layer.add(circleArrow);



	/* The line between current and next hours numbers */
	var subCircleArrowDrawing = function(cx) {

		cx.beginPath();


		cx.arc(0, 0, centerX - 45, (currTime.getHours() + 0.18) * 30 * const0 + const270, (currTime.getHours() + ((currTime.getTime()/3600000)%1)*0.64 + 0.18) * 30 * const0 + const270);

		cx.strokeStyle = "purple";
		cx.lineWidth = 2;
		cx.stroke();
	}


	var subCircleArrow = new Konva.Shape({
		sceneFunc: subCircleArrowDrawing,
		x: centerX,
		y: centerY
	});

	layer.add(subCircleArrow);



	var animation = function(vars) {
		arrow.setX(centerX + 30 * Math.cos(vars.hours % 12 * 30 * vars.const0 + vars.const1));
		arrow.setY(centerY + 30 * Math.sin(vars.hours % 12 * 30 * vars.const0 + vars.const1));

		arrow.rotation(vars.hours % 12 * 30 + 270);


		subArrow.setX(centerX + 25 * Math.cos((vars.time/3600000)%12*30*vars.const0 + vars.const2));
		subArrow.setY(centerY + 25 * Math.sin((vars.time/3600000)%12*30*vars.const0 + vars.const2));

		subArrow.rotation((vars.time/3600000)%12*30);


		circleArrow.setX(centerX + (centerX - 45) * Math.cos(vars.hours % 12 * 30 * vars.const0 + vars.const1));
		circleArrow.setY(centerY + (centerY - 45) * Math.sin(vars.hours % 12 * 30 * vars.const0 + vars.const1));
	};

	return animation;
}




function arrowMinutesPinkieCreate(layer, centerX, centerY) {

	var prevTime = new Date();
	var currTime = new Date();
	var dTime = 0, dTimeSum = 0;

	var pinkie = new Image();
	pinkie.src = "time/images/jumping_pinkie_full_flipped.png";
	_globals.pinkieFrame = 0;		// Current animation frame number
	_globals.pinkieFrameTime = 100;		// Animation speed (one frame time)
	_globals.pinkieTotalFramesTime = _globals.pinkieFrameTime * 8;


	var pinkieDrawing = function(cx) {
		prevTime = currTime;
		currTime = new Date();

		cx.beginPath();

		cx.drawImage(pinkie, _globals.pinkieFrame * 89, 0, 89, 90, -37, -90, 89, 90);
	};

	var pinkieArrow = new Konva.Shape({
		sceneFunc: pinkieDrawing,
		x: centerX,
		y: centerY,
		stroke: "purple",
		lineJoin: "round",
		strokeWidth: 2
	});

	layer.add(pinkieArrow);


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
	});

	layer.add(mText1);
	layer.add(mText2);



	var animation = function(vars) {
		/* <This> should be in pinkieDrawing function. But while it here, animation looks better */
		vars.dTimeSum += vars.dTime;
		vars.dTimeSum = (vars.dTimeSum >= _globals.pinkieTotalFramesTime ? vars.dTimeSum % _globals.pinkieTotalFramesTime :
            (vars.dTimeSum <= _globals.pinkieTotalFramesTime ? Math.abs(vars.dTimeSum) % _globals.pinkieTotalFramesTime : vars.dTimeSum));		// To 0 frame

		_globals.pinkieFrame = Math.floor(vars.dTimeSum / _globals.pinkieFrameTime);
		/* ^This^ */

		if (vars.prevMinute != vars.minutes) {		// Minute changing

			vars.currAimMinute = vars.prevMinute = (vars.prevMinute > vars.minutes ? vars.prevMinute - 60 : vars.prevMinute);

			vars.currAimMinute = (vars.currAimMinute + 4 < vars.minutes ? (vars.currAimMinute + 4 >= 60 ? vars.currAimMinute + 4 - 60 : vars.currAimMinute + 4) : vars.minutes);        // If we didn't see clock tab for a long time (do several pinkie jumps, not one)

			if (vars.tPinkieTime == 0) {
				vars.tPinkieTime = (new Date()).getTime();
				vars.tPinkieFrame = _globals.pinkieFrame;
				vars.tPinkieTime += 2 - (vars.tPinkieFrame > 2 ? vars.tPinkieFrame - 8 : vars.tPinkieFrame) * _globals.pinkieFrameTime;
			}

			if (vars.time > vars.tPinkieTime)
				vars.animateMinute = true;

			if (vars.animateMinute) {
				pinkieArrow.setX(vars.centerX + 230*Math.cos((vars.currAimMinute - (vars.currAimMinute - vars.prevMinute) * (7- (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 6) * 6 * vars.const0 + vars.const1));
				pinkieArrow.setY(vars.centerY + 230*Math.sin((vars.currAimMinute - (vars.currAimMinute - vars.prevMinute) * (7 - (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 6) * 6 * vars.const0 + vars.const1));

				pinkieArrow.rotation((vars.currAimMinute - (vars.currAimMinute - vars.prevMinute) * (6 - (_globals.pinkieFrame < 1 ? 1 : _globals.pinkieFrame)) / 5) * 6 + 180);


				if (vars.time - vars.tPinkieTime > 700) {        // Last frame (defense from lagging)

					pinkieArrow.setX(vars.centerX + 230 * Math.cos(vars.currAimMinute * 6 * vars.const0 + vars.const1));
					pinkieArrow.setY(vars.centerY + 230 * Math.sin(vars.currAimMinute * 6 * vars.const0 + vars.const1));

					pinkieArrow.rotation(vars.currAimMinute * 6 + 180);


					mText1.setText((vars.currAimMinute == 0 ? 60 : (vars.currAimMinute < 0 ? vars.currAimMinute + 60 : vars.currAimMinute)) - 1);
					mText2.setText((vars.currAimMinute < 0 ? vars.currAimMinute + 60 : vars.currAimMinute) + 1);

					mText1.setX(vars.centerX + 212*Math.cos((vars.currAimMinute + (vars.currAimMinute > 9 ? 0.34 : 0.17) - 1) * 6 * vars.const0 + vars.const1));
					mText1.setY(vars.centerY + 212*Math.sin((vars.currAimMinute + (vars.currAimMinute > 9 ? 0.34 : 0.17) - 1) * 6 * vars.const0 + vars.const1));
					mText2.setX(vars.centerX + 212*Math.cos((vars.currAimMinute + (vars.currAimMinute > 9 ? 0.34 : 0.17) + 1) * 6 * vars.const0 + vars.const1));
					mText2.setY(vars.centerY + 212*Math.sin((vars.currAimMinute + (vars.currAimMinute > 9 ? 0.34 : 0.17) + 1) * 6 * vars.const0 + vars.const1));

					mText1.rotation((vars.currAimMinute - 1) * 6 + 180);
					mText2.rotation((vars.currAimMinute + 1) * 6 + 180);


					vars.prevMinute = vars.currAimMinute;
					vars.animateMinute = false;
					vars.tPinkieTime = 0;
				}

			} else {		// For starting position (do I need it?)

				pinkieArrow.setX(vars.centerX + 230*Math.cos(vars.prevMinute * 6 * vars.const0 + vars.const1));
				pinkieArrow.setY(vars.centerY + 230*Math.sin(vars.prevMinute * 6 * vars.const0 + vars.const1));

				pinkieArrow.rotation(vars.prevMinute * 6 + 180);
			}

		} else {		// Minute static

			/*pinkieArrow.setX(vars.centerX + 150*Math.cos(vars.minutes*6*vars.const0 + vars.const1));
			pinkieArrow.setY(vars.centerY + 150*Math.sin(vars.minutes*6*vars.const0 + vars.const1));

			pinkieArrow.rotation(vars.minutes*6 + 270);*/
		}
	};


	return animation;
}




function arrowSecondsDashCreate(layer, centerX, centerY) {

	var prevTime = new Date();
	var currTime = new Date();
	var dTime = 0, dTimeSum = 0;

	var dash = new Image();
	dash.src = "time/images/flying_dash_full_flipped.png";
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


	var dashArrow = new Konva.Shape({
		sceneFunc: dashDrawing,
		x: centerX,
		y: centerY,
		stroke:"black",
		lineJoin: "round",
		strokeWidth: 2
	});

	layer.add(dashArrow);



	var animation = function(vars) {
		dashArrow.setX(vars.centerX + 285*Math.cos((vars.time/1000)%60*6*vars.const0 + vars.const1));
		dashArrow.setY(vars.centerY + 285*Math.sin((vars.time/1000)%60*6*vars.const0 + vars.const1));

		dashArrow.rotation((vars.time/1000)%60*6 + 5);
	};

	return animation;
}




function addArrowsLayer(stage, centerX, centerY) {

	var layer = new Konva.Layer();


	var arrowHoursTwiAnimation = arrowHoursTwiCreate(layer, centerX, centerY);

	var arrowMinutesPinkieAnimation = arrowMinutesPinkieCreate(layer, centerX, centerY);

	var arrowSecondsDashAnimation = arrowSecondsDashCreate(layer, centerX, centerY);


	stage.add(layer);



	var vars = {
		centerX: centerX,
		centerY: centerY,

		degreesPerSec: 1,
		const0: Math.PI/180,        // Math.PI/180 * 3/2 ??? ???????? (? /1000 ??? ??????)
		const1: Math.PI * 3 / 2,
		const2: Math.PI * 2,

		constAnim: 200,        // For arrow animation (speed?)

		date: new Date(),
		prevTime: (new Date()).getTime(),
		time: (new Date()).getTime(),
		minutes: 0,
		hours: 0,
		prevMinute: (new Date()).getMinutes() - 1,
	    currAimMinute: (new Date()).getMinutes() - 1,
	    dTime: 0,
	    dTimeSum: 0,

		tPinkieTime: 0,
		tPinkieFrame: 0,
		animateMinute: false
	};



	var animation = new Konva.Animation(function(frame) {

		vars.date = new Date();
		vars.prevTime = vars.time;
		vars.time = vars.date.getTime();
		vars.minutes = vars.date.getMinutes();
		vars.hours = vars.date.getHours();
		vars.dTime = (vars.time - vars.prevTime);


		stats.begin();


		arrowSecondsDashAnimation(vars);

		arrowMinutesPinkieAnimation(vars);

		arrowHoursTwiAnimation(vars);


		stats.end();
	}, layer);


	animation.start();
}
