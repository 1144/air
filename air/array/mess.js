	/*--
		洗牌算法，即随机打乱数组。<br/>
		保证每张牌出现在每个位置的概率是1/n，比如54张牌就是1/54。<br/>
		使用场景：随机从数组里选取几项；抽奖。
		-as mess
		-note 会改变原数组
		-p array arr 要打乱的数组
		-eg
			var mess = require('air/array/mess');
			mess([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	*/
	module.exports = function (arr) {
		var _floor = Math.floor,
			_random = Math.random,
			i = arr.length, j, v;

		while (i>1) {
			j = _floor(_random() * i);
			i--;
			//console.log(i);
			if (i!==j) {
				v = arr[i];
				arr[i] = arr[j];
				arr[j] = v;
			}
		}
	};
