	/*--
		把指定格式的时间转换成时间点，单位秒。
		-p string formattedTime 格式化成YYYY-mm-DD HH:MM:SS的时间字符串
		-r number 时间点
		-rel [0, formatTime] 把时间点格式化成YYYY-mm-DD HH:MM:SS格式的字符串
		-eg
			var parseFormattedTime = require('air/util/parseFormattedTime');
			parseFormattedTime('2015-02-18 20:18'); //返回：1424261880
			parseFormattedTime('2015-02-18 20:18:10'); //返回：1424261890
	*/
	function parseFormattedTime(formattedTime) {
		var t = Date.parse(formattedTime.replace(/-/g, '/'));
		if (t) {
			return Math.floor(t / 1000);
		} else {
			throw '[parseFormattedTime] 错误的时间格式：'+formattedTime;
		}
	}

	module.exports = parseFormattedTime;
