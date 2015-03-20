	/*--
		让jsonp请求可以缓存，注意只支持jsonp请求。
		-as cacheJSONP
		-p string cacheName 缓存名称，请注意命名成唯一的名字。
			推荐使用当前js文件的路径作为名称，如bz/so/juji。
			一个js文件多个请求可以加上序号如bz/so/juji_1、bz/so/juji_2等。
		-p object opt 请求接口选项。需要包含下面几项：
			url api接口地址。注意不能加“callback=?”。
			data 请求数据。可选。
			cache 缓存多少分钟数。可选，默认永久缓存（即不加时间戳）。
			success 请求成功的回调函数。
		-eg
			var cacheJSONP = require('air/io/cacheJSONP');
			cacheJSONP('bz/so/juji', {
				url: 'http://api.letv.com/mms/out/album/getVideoList',
				data: {p:1,a:2},
				cache: 60, //缓存60分钟
				success: function(res){
					//console.log(res);
					res && callback(res.data || []);
				}
			});
	*/
	module.exports = function (cacheName, opt) {
		cacheName = cacheName.replace(/\W/g, '_');
		if (typeof opt.cache==='number') {
			cacheName += '_'+Math.floor(new Date().getTime() / (opt.cache * 60000));
		}
		
		opt.cache = true;
		opt.dataType = 'jsonp';
		if (opt.success) {
			window[cacheName] = opt.success;
			delete opt.success;
			opt.jsonpCallback = cacheName;
		}
		$.ajax(opt);

		return cacheName;
	};
