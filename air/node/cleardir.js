	/*--
		删除dir里的所有文件和目录
		-as cleardir
		-p string dir 要清空的目录
		-eg
			var cleardir = air.use('cleardir');
			cleardir('D:blog/build/');
	*/
	var fs = require('fs');
	var cleardir = function (dir) {
		fs.existsSync(dir) && fs.readdirSync(dir).forEach(function (file) {
			file = dir+'/'+file;
			if (fs.statSync(file).isFile()) {
				fs.unlinkSync(file);
			} else {
				cleardir(file);
				fs.rmdirSync(file);
			}
		});
	};

	module.exports = cleardir;
