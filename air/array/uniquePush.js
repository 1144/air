	/*--
		将一个非引用类型的值添加到数组末尾，并删除数组里之前已有的与之相等的元素。
		-as uniquePush
		-rel [0, uniqueUnshift] 添加到数组头部
		-p array arr 目标数组
		-p non-reference item 需要添加的元素，非引用类型
		-p num [maxLength] 添加后，如果数组长度超过这个值，则移除数组开头的元素
		-eg
			var uniquePush = require('air/array/uniquePush');
			uniquePush([1, 3, 2], 3); // => [1, 2, 3]
			uniquePush([1, 2, 3, 5], 6, 4); // => [2, 3, 5, 6]
	*/
	module.exports = function (arr, item, maxLength) {
		var i = arr.length;
		while (i--) {
			if (item===arr[i]) {
				arr.splice(i, 1);
				break;
			}
		}
		arr.push(item);
		maxLength && arr.length>maxLength && arr.shift();

		return arr;
	};