	/*--
		去除重复值后，遍历数组（包括json数组，根据指定属性排重），执行处理函数。
		如果处理函数返回false，将中止遍历。
		-as uniqueEach
		-p array arr 要处理的数组
		-p string [prop] 对json数组排重依据的属性
		-p fn handler 对每一项进行处理的函数
		-rel [0, unique] 排重方法同unique
		-eg
			var uniqueEach = require('air/array/uniqueEach');
			uniqueEach([1, 3, 2, 1, '3'], function (i, value) {
				console.log(i, value);
			});
			uniqueEach([{a:1, b:3}, {a:2, b:1}, {a:5, b:1}], 'b', function (key, value) {
				console.log(key, value);
			});
	*/
	module.exports = function (arr, prop, handler) {
		var map = {},
			i = 0,
			len = arr.length,
			v, k;

		if (typeof prop === 'string') {
			for (; i < len; i++) {
				v = arr[i][prop];
				k = typeof v==='string' ? '_'+v : String(v);
				if (!map.hasOwnProperty(k)) {
					if (handler(i, arr[i]) === false){
						break;
					}
					map[k] = true;
				}
			}
		} else {
			//prop是function，则prop即handler
			for (; i < len; i++) {
				v = arr[i];
				k = typeof v==='string' ? '_'+v : String(v);
				if (!map.hasOwnProperty(k)) {
					if (prop(i, v) === false){
						break;
					}
					map[k] = true;
				}
			}
		}
	};
