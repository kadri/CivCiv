var express = require('express');
var app = express();
var path = require('path');
var File = require('./lib/file.js');
var rotate = require('./lib/rotate.js');
var lamba = require('./lib/lamba.js');
var mail = require('./lib/mail.js');
var lambastatus = 0;

File.loadConfig();

setInterval(function(){
	if(File.config.sensor){
		require('./lib/sensor.js')(function(temp, humidity){
			console.log('temp: ' + temp+ '°C, ' + 'humidity: ' + humidity + '%');
			File.config.temp = temp;
			File.config.humidity = humidity;
			File.config.lastthreedays = false;
			if(File.config.started){
				var difff = ((new Date()).getTime() - (new Date(File.config.starttime)).getTime());
				//console.log('DIFF : ' + difff);
				if( difff > (17*24*60*60*1000) ){
					File.config.min = 36;
					File.config.max = 39;
					File.config.lastthreedays = true;
				}

				if(temp > File.config.max){
					lambastatus = 1;
					lamba(File.config.lambaPIN, lambastatus);
				}
				else if(temp < File.config.min){
					lambastatus = 0;
					lamba(File.config.lambaPIN, lambastatus);
				}
			}
			

			File.config.lambastatus = lambastatus;
		});
	}
}, 1000);

setInterval(function(){
	if(File.config.started && File.config.rotating){
		rotate(File.config.rotaterPIN);
	}
	if(File.config.started && File.config.mailnotify){
		mail(File.config, File.config.temp, File.config.humidity);
	}
}, File.config.rotateInterval);

app.use(express.static(path.join(__dirname, '/web/')));

app.get('/getStatus', function(req, res){
    res.send(File.config);
});
app.get('/startNew', function(req, res){
	File.config.started = true;
	File.config.starttime = new Date();
	File.saveConfig();
    res.send(File.config);
});
app.get('/endNow', function(req, res){
	File.config.started = false;
	File.saveConfig();
    res.send(File.config);
});
app.get('/rotate', function(req, res){
	if(File.config.rotating){
		rotate(File.config.rotaterPIN);
	}
    res.send(File.config);
});
app.get('/lambatoggle', function(req, res){
	if(File.config.lamba){
		lambastatus = (lambastatus==0?1:0);
		lamba(File.config.lambaPIN, lambastatus);
	}
    res.send(File.config);
});
app.get('/sendmail', function(req, res){
	if(File.config.mailnotify){
		mail(File.config, File.config.temp, File.config.humidity);
	}
    res.send(File.config);
});
app.listen(3000, function () {
  console.log('CivCiv App Calisiyor!');
  
});