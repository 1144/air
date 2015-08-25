	Date.now || (Date.now = function () {
		return new Date().getTime();
	});
	/*--
		智能轮询。使用场景：聊天室，需要及时拉取数据等场景。
		-as smartPolling
		-p obj [opt] 配置选项，有3个可选属性：
			<p>maxInterval: 最大请求时间间隔，默认20000ms</p>
			<p>minInterval: 最小请求时间间隔，默认5000ms</p>
			<p>fixInterval: 每次间隔修正量，默认5000ms</p>
		-p fn request 轮询请求（函数），当到达请求时间点，会调用该函数（在该函数里写你的
			ajax请求），调用该函数会传一个函数（假如叫`resCount`）作参数，ajax请求成功后
			以请求到的数据条数调用resCount函数，以让轮询算法计算下次请求的时间点。
		-eg
			var counts = [1, 2, 0, 0, 0, 0, 1, 3, 2, 0, 1, 4, 0, 0, 0, 5, 1, 2];
			var i = 0;
			var smartPolling = require('air/io/smartPolling');
			smartPolling(function (resCount) {
				var t = resCount(counts[i++]);
				i>(counts.length-2) && clearTimeout(t);
			});

			smartPolling(function (resCount) {
				$.get('/chatMsg', function (data) {
					// TODO
					resCount(data.length);
				});
			});
	*/
	module.exports = function (opt, request) {
		if (typeof opt==='function') {
			request = opt;
			opt = {};
		}
		var maxInterval = opt.maxInterval || 20000,
			minInterval = opt.minInterval || 5000,
			fixInterval = opt.fixInterval || 5000,
			delay = false,
			lastStamp;

		opt = null;

		// 请求完数据后，回调告知此次请求到多少条数据
		var callback = function (n) {
			var now = Date.now(),
				time = now - lastStamp;
			if (n) { // 大于0条数据
				time = Math.ceil(time / n);
				if (time>maxInterval) {
					time = maxInterval - fixInterval;
				} else if (time<minInterval) {
					time = minInterval;
				}
				delay = false;
			} else { // 0条数据
				if (delay) {
					time += fixInterval; // 第二次没取到数据才开始增加延时
				} else {
					delay = true;
				}
				time>maxInterval && (time = maxInterval);
			}
			lastStamp = now;

			//console.log(n, time);
			return setTimeout(function () {
				request(callback);
			}, time);
		};

		// 第一次不延迟请求，且请求结果不做计算参考
		request(function () {
			lastStamp = Date.now();
			return setTimeout(function () {
				request(callback);
			}, fixInterval);
		});
	};
