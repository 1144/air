	/*--
		遍历数组，按顺序异步处理每一项，并且处理完一项才能处理下一项。
		-as asynEach
		-p array arr 要遍历的数组
		-p fn handler 对每一项进行处理的函数
		-p fn [onEnd] 处理完所有项后的回调
		-eg
			var asynEach = require('air/array/asynEach');
			asynEach(files, function (file, i, next) {
				fs.readFile(file, 'utf8', function (err, data) {
					if (err) {
						console.log('文件读取失败：'+file);
						return;
					}
					next();
				});
			}, function () {
				console.log('done!');
			});
	*/
	module.exports = function (arr, handler, onEnd) {
		var i = 0, len = arr.length;
		var op = function () {
			if (i<len) {
				handler(arr[i], i++, op);
			} else {
				onEnd && onEnd();
			}
		};
		op();
	};
