	/*--
		遍历数组或纯对象，执行处理函数。如果处理函数返回false，将中止遍历。
		-as each
		-p object obj 数组或可以for-in遍历的对象
		-p fn handler 对每一项进行处理的函数
		-eg
			var each = require('air/array/each');
			each([1, 3, 2, 1], function (i, value) {
				console.log(i, value);
			});
			each({a:1, b:3}, function (key, value) {
				console.log(key, value);
				return false; //只会打印出 a 1
			});
	*/
	module.exports = function (obj, handler) {
		var i;

		if (obj instanceof Array) {
			i = 0;
			for (var len = obj.length; i < len; i++) {
				if (handler(i, obj[i]) === false){
					break;
				}
			}
		} else {
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					if (handler(i, obj[i]) === false){
						break;
					}
				}
			}
		}
		
	};
