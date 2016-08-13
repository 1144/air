	__imgRequests__ = {};
	/*--
		发送img类型的请求，主要用于数据上报。
		-as imgRequest
		-p str url img请求的地址
		-p fn [callback] img请求返回后的回调，如果img迟迟不返回，则1秒后执行回调。
		-p boolean [random = true] 是否在请求地址后加上随机数，值为false不加随机数。
		-note 会产生全局变量__imgRequests__
		-eg
			var imgRequest = require('air/io/imgRequest');
			imgRequest('http://dc.letv.com/s/?k=reg');
	*/
	module.exports = function (url, callback, random) {
		callback===false && (random = false);
		var rnd = String(Math.random()),
			img = __imgRequests__[rnd] = new Image();
		img.onload = img.onerror = function () {
			img = __imgRequests__[rnd] = null;
			callback && callback();
		};
		img.src = random===false ? url :
			(url.indexOf('?')>0 ? url+'&_='+rnd : url+'?_='+rnd);

		// 除了callback，同时确保在ie和firefox下页面关闭时也能发出img请求
		setTimeout(function () {
			if (callback && img) {
				callback();
				callback = false;
			}
		}, 1000);
	};
