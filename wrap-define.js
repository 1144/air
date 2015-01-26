	/*--
		将air的所有文件包装上define外壳，
		即文件头加 “define(function (require, exports, module) {” ，文件尾加上 “});” 。
		使用命令：node wrap-define 目标位置
	*/
	var target_path = './air-define'; //要把包装后的air放到哪里
	target_path = process.argv[2] || target_path;


	var fs = require('fs');
	var air_path = './air';
	var air_path_len = air_path.length;

	function mkdir(dir) {
		fs.existsSync(dir) || fs.mkdirSync(dir);
	}

	//遍历所有文件
	function readAllFiles(path) {
		fs.readdirSync(path).forEach(function (filename) {
			var file = path+'/'+filename;
			if (filename.slice(-3)==='.js') {
				var fc = 'define(function (require, exports, module) {\r\n'+
					fs.readFileSync(file, 'utf8')+'\r\n});\r\n';
				var fd = fs.openSync(target_path+file.slice(air_path_len), 'w', '0666');
				fs.writeSync(fd, fc, 0, 'utf8');
				fs.closeSync(fd);
			} else if (filename[0]!=='.' && fs.statSync(file).isDirectory()) {
				//排除.svn，.github之类的文件夹
				mkdir(target_path+file.slice(air_path_len));
				readAllFiles(file);
			}
		});
	}

	function main() {
		target_path[target_path.length - 1]==='/' &&
			(target_path = target_path.slice(0, -1));
		mkdir(target_path);
		readAllFiles(air_path);
		console.log('\033[1m\033[32mSuccess!\033[0m');
	}

	main();
