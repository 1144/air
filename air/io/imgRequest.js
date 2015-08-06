	__imgRequests__ = {};
	/*--
		发送img类型的请求，主要用于数据上报。
		-as imgRequest
		-p str url img请求的地址
		-p boolean [random = true] 是否在请求地址后加上随机数，值为false不加随机数。
		-note 会产生全局变量__imgRequests__
		-eg
			var imgRequest = require('air/io/imgRequest');
			imgRequest('http://dc.letv.com/s/?k=reg');
	*/
	module.exports = function (url, random) {
		var rnd = String(Math.random()),
			img = __imgRequests__[rnd] = new Image();
		img.onload = img.onerror = function () {
			img = __imgRequests__[rnd] = null;
		};
		img.src = random===false ? url :
			(url.indexOf('?')>0 ? url+'&_='+rnd : url+'?_='+rnd);

		setTimeout(function () {}, 1000); //确保在ie和firefox下页面关闭时也能发出img请求
	};
