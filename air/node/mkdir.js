	/*--
		在parentDir里按照dir的目录层级一级级创建目录
		-as mkdir
		-p string parentDir 目标路径，以“/”结尾，例如 D:/blog/ 或 /usr/local/blog/
		-p string dir 目录名（以“/”结尾），或包含目录名的文件名，例如 main/base.js
		-eg
			var mkdir = air.use('mkdir');
			mkdir('D:/blog/', 'build/');
			mkdir('D:/blog/', 'build/main/base.js');
	*/
	var fs = require('fs');
	var mkdir = function (parentDir, dir) {
		var i = dir.indexOf('/') + 1;
		if (i>0) {
			parentDir += dir.slice(0, i);
			fs.existsSync(parentDir) || fs.mkdirSync(parentDir);
			mkdir(parentDir, dir.slice(i));
		}
	};

	module.exports = mkdir;
