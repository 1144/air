	/*--
		将html编码的字符串解码
		-as decodeHTML
		-p str str 需要解码的html字符串
		-r 解码后的字符串
		-note 服务端不可用
		-eg
			var decodeHTML = require('air/string/decodeHTML');
			var code = '&lt;script&gt;alert(1);&lt;/script&gt;';
			alert(decodeHTML(code)); //<script>alert(1);</script>
	*/
	module.exports = function (str) {
		var div = document.createElement('div');
		div.innerHTML = str;
		return div.innerText || div.textContent || '';
	};