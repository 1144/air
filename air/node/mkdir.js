	/*--
		创建目录结构
		-as mkdir
		-p string dir 目录名，以“/”结尾，例如 D:/blog/ 或 /usr/local/blog/
		-p string [subdir] 子目录名（以“/”结尾），或包含目录名的文件名，例如 main/base.js
		-note 只传dir参数时，将依次检查每一个目录是否存在，不存在就创建。
			传了subdir参数时，只创建subdir里出现的目录。
		-eg
			var mkdir = air.use('mkdir');
			mkdir('D:/blog/build/');
			mkdir('D:/blog/', 'build/');
			mkdir('D:/blog/', 'build/main/base.js');
	*/
	var fs = require('fs');
	var mkdir = function (dir, subdir) {
		var i;
		if (!subdir) {
			i = dir.lastIndexOf('./');
			if (i>-1) {
				i++;
			} else {
				i = dir.indexOf('/');
			}
			subdir = dir.slice(i + 1);
			if (!subdir) {return}
			dir = dir.slice(0, i + 1);
		}
		i = subdir.indexOf('/') + 1;
		if (i>0) {
			dir += subdir.slice(0, i);
			fs.existsSync(dir) || fs.mkdirSync(dir);
			subdir = subdir.slice(i);
			subdir && mkdir(dir, subdir);
		}
	};

	module.exports = mkdir;
