	/*--
		将一段CSS样式插入到页面里
		-as insertCSS
		-p string cssText css样式文本
		-eg
			var cssText = '.wrap{font-size:1.2em;}';
			var insertCSS = require('air/dom/insertCSS');
			insertCSS(cssText);
	*/
	module.exports = function (cssText) {
		cssText = '<style type="text/css">'+cssText+'</style>';
		var node = document.createElement('div');
		node.innerHTML = cssText;

		var css = node.firstChild, //IE678创建不了style节点，并且要加&#00;
			head = document.head || document.getElementsByTagName('head')[0];
		css ? head.appendChild(css) : head.insertAdjacentHTML('BeforeEnd', '&#00;'+cssText);
	};
