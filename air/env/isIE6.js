	/*--
		是否IE6浏览器
		-as isIE6
		-eg
			var isIE6 = require('air/env/isIE6');
	*/
	module.exports = !window.XMLHttpRequest && !!window.ActiveXObject;
