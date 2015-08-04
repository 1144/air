	var node = document.createElement('div');
	/*--
		把一段html字符串创建成一个HTML节点
		-as createElement
		-p string html html字符串
		-note 注意html字符串只能包含一个节点
		-eg
			var createElement = require('air/dom/createElement');
			createElement('<div>test</div>');
	*/
	module.exports = function (html) {
		node.innerHTML = html;
		return node.firstChild;
	};
