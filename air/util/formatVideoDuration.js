	/*--
		把时间长度转换成视频的时长格式的字符串
		-p number duration 时间长度，单位秒
		-r string 视频的时长
		-eg
			var formatVideoDuration = require('air/util/formatVideoDuration');
			formatVideoDuration(18); //返回：00:18
			formatVideoDuration(618); //返回：10:18
			formatVideoDuration(1290); //返回：21:30
			formatVideoDuration(3615); //返回：1:00:15
	*/
	function formatVideoDuration(duration) {
		duration = parseInt(duration, 10) || 0;
		var h = Math.floor(duration / 3600),
			m = Math.floor((duration % 3600) / 60),
			s = duration % 60;
		return (h ? h+':' : '')+(m>9 ? m : '0'+m)+':'+(s>9 ? s : '0'+s);
	}

	module.exports = formatVideoDuration;
