	/*--
		删除数组里的重复元素，或者将json数组里的每个json对象根据指定属性排重。
		-as unique
		-p array arr 数组
		-p string [prop] 如果是一个对象数组，那么根据每个对象的prop这个属性的值进行排重。
		-eg
			var unique = require('air/array/unique');
			//返回[1, 3, 2, 5, '2', '1', null, 'null', '']
			unique([1, 3, 2, 1, 5, 1, '2', '1', null, 'null', null, '']);
			unique([{a:1, b:3}, {a:2, b:1}, {a:5, b:1}], 'b'); //返回[{a:1, b:3}, {a:2, b:1}]
		-author hahaboy
		-ver 0.0.1
	*/
	module.exports = function (arr, prop) {
		var map = {},
			res = [],
			i = 0,
			len = arr.length,
			v, k;

		if (prop) {
			for (; i < len; i++) {
				v = arr[i][prop];
				k = typeof v==='string' ? '_'+v : String(v);
				if (!map.hasOwnProperty(k)) {
					res.push(arr[i]);
					map[k] = 1;
				}
			}
			return res;
		}
		for (; i < len; i++) {
			v = arr[i];
			k = typeof v==='string' ? '_'+v : String(v);
			if (!map.hasOwnProperty(k)) {
				res.push(v);
				map[k] = 1;
			}
		}
		return res;
	};
