var Gpio = null;
var led = null;// new Gpio(27, 'out');

function lamba(pin, onoff){
	if (led == null) {
		Gpio = require('onoff').Gpio;
		led = new Gpio(pin, 'out');
	}
	led.writeSync(onoff);
	//console.log('Lamba : ' + onoff)
}
module.exports = lamba;