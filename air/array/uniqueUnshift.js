	/*--
		将一个非引用类型的值添加到数组头部，并删除数组里之前已有的与之相等的元素。
		-as uniqueUnshift
		-rel [0, uniquePush] 添加到数组尾部
		-p array arr 目标数组
		-p non-reference item 需要添加的元素，非引用类型
		-p num [maxLength] 添加后，如果数组长度超过这个值，则移除数组尾部的元素
		-eg
			var uniqueUnshift = require('air/array/uniqueUnshift');
			uniqueUnshift([1, 3, 2], 3); // => [3, 1, 2]
			uniqueUnshift([1, 2, 3, 5], 6, 4); // => [6, 1, 2, 3]
	*/
	module.exports = function (arr, item, maxLength) {
		var i = arr.length;
		while (i--) {
			if (item===arr[i]) {
				arr.splice(i, 1);
				break;
			}
		}
		arr.unshift(item);
		maxLength && arr.length>maxLength && arr.pop();

		return arr;
	};