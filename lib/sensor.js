
function GetSensordata(cb){
	
	var sensor = require('node-dht-sensor');

	sensor.read(11, 4, function(err, temperature, humidity) {
	    if (!err) {
	        
	        cb(temperature, humidity);
	    }
	});
	
	
}
module.exports = GetSensordata;