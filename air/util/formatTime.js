	/*--
		把时间点格式化成类似<cs>YYYY-mm-DD HH:MM:SS</cs>的字符串
		-as formatTime
		-p number|Date|string time 时间点，可以是<rb>单位为秒</rb>的数字，可以是一个时间对象，
			甚至可以是标准格式（2015-07-15 16:49:25）的时间字符串
		-p string timeFormat 时间格式，例如<cs>HH:MM:SS</cs>，<cs>YYYY年m月D日</cs>
		-r string 格式化后的时间字符串
		-rel [0, formatDuration] 把时间长度转换成指定格式的时间
		-eg
			var formatTime = require('air/util/formatTime');
			formatTime(new Date(), 'YYYY-mm-DD HH:MM:SS'); // "2015-07-15 16:49:25"
			//甚至可以将“2015-07-15 16:49:25”这种格式的事件再格式化
			formatTime('2015-07-15 16:49:25', 'YYYY年m月D日'); // "2015年7月15日"
	*/
	module.exports = function (time, timeFormat) {
		if (typeof time==='number') {
			time = new Date(time * 1000);
		} else if (typeof time==='string') {
			time = new Date(Date.parse(time.replace(/-/g, '/')));
		}

		var t = {};
		t.YYYY = time.getFullYear();
		t.m = time.getMonth() + 1;
		t.D = time.getDate();
		t.H = time.getHours();
		t.M = time.getMinutes();
		t.S = time.getSeconds();
		t.mm = t.m>9 ? t.m : '0'+t.m;
		t.DD = t.D>9 ? t.D : '0'+t.D;
		t.HH = t.H>9 ? t.H : '0'+t.H;
		t.MM = t.M>9 ? t.M : '0'+t.M;
		t.SS = t.S>9 ? t.S : '0'+t.S;

		return timeFormat.replace(/\b[YmDHMS]+\b/g, function ($0) {
			return t[$0] || '';
		});
	};
