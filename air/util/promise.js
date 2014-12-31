	/*--
		异步顺序执行控制。
		-class
		-eg
			var Promise = require('air/util/promise');
			var promise = new Promise();

			function f1() {
				setTimeout(function () {
					alert(1);
					promise.resolve();
				}, 1500);
			}

			function f2() {
				setTimeout(function () {
					alert(2);
					promise.resolve();
				}, 1500);
			}

			function f3() {
				setTimeout(function () {
					alert(3);
					promise.resolve();
				}, 1500);
			}

			function f4() {
				alert(4);
			}

			//用法1：
			promise.then(f1).then(f2).then(f3).then(f4).resolve();
			//用法2：
			promise.then(f1, f3, f2, f4).resolve();
			//用法3：
			promise.then(f1, f3).then(f2).then(f4);
			promise.resolve();
	*/
	var Promise = function () {
		this.thens = [];
	};
	Promise.prototype = {
		/*--
			触发下一个任务
		*/
		resolve: function () {
			var t = this.thens.shift();
			t && t.apply(null, arguments);
		},
		/*--
			向任务顺序队列添加任务，可一次添加多个任务
		*/
		then: function () {
			return this.thens.push.apply(this.thens, arguments), this;
		}
	};
	
	module.exports = Promise;
