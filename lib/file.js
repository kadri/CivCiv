var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var mkdirp = require('mkdirp');


var File = {};
File.config = {};

File.getUserPath = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
File.combine = function(path1, path2){
	return path.join(path1, path2)
}
File.parse = function(filepath){
	return path.parse(filepath);
}
File.dirname = function(filepath){
	return path.dirname(filepath);
}
File.extname = function(filepath){
	return path.extname(filepath);
}

File.exists = function(filepath){
	if (fs.existsSync(filepath)) {
    	return true;
	}
	else{
		return false;
	}
}

File.copy = function(src, dest){
	fse.copySync(src, dest);
}

File.move = function(src, dest, callback){
	fse.move(src, dest, callback);
}

File.remove = function(filepath){
	fse.removeSync(filepath);
}

File.size = function(filepath){
	return fs.statSync(filepath).size;
}

File.mkdir = function(path){
	mkdirp(path);
}

File.loadConfig = function(){
	if(File.exists(path.join(__dirname,'config.json')))
		File.config = fse.readJsonSync(path.join(__dirname,'config.json'), {throws: false});
	else{
		File.config.started = false;
		File.config.sensor = false;
		File.config.rotating = false;
		File.config.rotaterPIN = 18;
		File.config.lamba = false;
		File.config.lambaPIN = 27;
		File.config.min = 35;
		File.config.max = 38;
		File.config.lastthreedays = false;
		File.config.rotateInterval = 2*60*60*1000;
		File.saveConfig();
	}
}
File.saveConfig = function(){
	fse.writeJson(path.join(__dirname,'config.json'), File.config, function (err) {
  		console.log(err)
	});
}

module.exports = File;

