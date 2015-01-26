	/*--
		将字符串进行html编码
		-as encodeHTML
		-p str str 需要html编码的字符串
		-r 对str进行html编码后的字符串
		-note 服务端不可用
		-eg
			var encodeHTML = require('air/string/encodeHTML');
			var code = '<script data-ng="1">alert(1);</script>';
			alert(encodeHTML(code)); //&lt;script data-ng="1"&gt;alert(1);&lt;/script&gt;
	*/
	module.exports = function (str) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML.replace(/\s\s/g, '&nbsp;&nbsp;');
	};
