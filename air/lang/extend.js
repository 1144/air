	/*--
		简单扩展一个对象，只扩展一级，主要用于参数扩展。
		-p object dest 目标对象，纯对象、类、类的实例都可以
		-p object someObj 让dest具有someObj的属性
		-p boolean [override = true] 是否覆盖相同属性，默认覆盖
		-r 目标对象dest
		-eg
			var extend = require('air/lang/extend');
			var foo = {a: 1};
			extend(foo, {b: 2}); //foo变成{a: 1, b: 2}
	*/
	var extend = function (dest, someObj, override) {
		var k;
		if (override===false) {
			for (k in someObj) {
				!dest.hasOwnProperty(k) && someObj.hasOwnProperty(k) &&
					(dest[k] = someObj[k]);
			}
		} else {
			for (k in someObj) {
				someObj.hasOwnProperty(k) && (dest[k] = someObj[k]);
			}
		}
		return dest;
	};

	module.exports = extend;
