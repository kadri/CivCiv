var Gpio = null;// require('pigpio').Gpio;
var motor = null;// new Gpio(10, {mode: Gpio.OUTPUT});

var wayway = false;
var degree = 0;
function rotate(pin){
	if (Gpio == null) {
		Gpio = require('pigpio').Gpio;
		motor = new Gpio(pin, {mode: Gpio.OUTPUT});
	}
	
	wayway = !wayway;
	if(wayway)
		degree = 1;
	else
		degree = 60;

	//motor.servoWrite((degree/0.12)+500);
	actionStart();
	
}

function actionStart(){
	if(wayway && degree < 60){
		degree += 2;
		var vl = (degree/0.12)+500;
		console.log('' + degree + ' - ' + vl);
		motor.servoWrite(Math.round(vl));
		setTimeout(actionStart, 1000);
	}
	else if(wayway == false && degree > 1){
		degree -= 2;
		console.log('' + degree );
		motor.servoWrite(Math.round((degree/0.12)+500));
		setTimeout(actionStart, 1000);
	}
}

module.exports = rotate;
