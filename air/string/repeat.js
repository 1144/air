	/*--
		重复字符串多少次
		-as repeat
		-p string str 用于重复的字符串
		-p number times 重复次数
		-eg
			var repeat = require('air/string/repeat');
			trace(repeat('~', 3)); // => ~~~
	*/
	module.exports = function (str, times) {
		if (times<1) {return ''}
		var s = '';

		while (times--) {
			s += str;
		}

		return s;
	};

	// 增加es6的原生特性判断
	if (String.prototype.repeat) {
		module.exports = function (str, times) {
			return str.repeat(times);
		};
	}
