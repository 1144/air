	/*--
		判断节点a是否包含节点b
		-fn
		-p HTMLElement a DOM节点
		-p HTMLElement b DOM节点
		-note a===b时也返回true
		-eg
			var contains = require('air/dom/contains');
			contains(a, b);
	*/
	var contains;
	if (document.documentElement.contains) {
		contains = function (a, b) {
			return a.contains ? a.contains(b) : true;
		};
	} else if (document.documentElement.compareDocumentPosition) {
		contains = function (a, b) {
			return a===b || !!(a.compareDocumentPosition(b) & 16);
		};
	} else {
		contains = function (a, b) {
			while (b) { //如果a=b要返回true
				if (a===b) {return true}
				b = b.parentNode;
			}
			return false;
		};
	}

	module.exports = contains;
