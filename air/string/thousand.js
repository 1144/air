	/*--
		将数字加上千位分隔符
		-as thousand
		-p num num 源数字
		-r string 加上千位分隔符的数字字符串
		-eg
			var thousand = require('air/string/thousand');
			thousand(289887); //返回289,887
			thousand(89887.90); //返回89,887.90
	*/
	module.exports = function(num){
		return String(num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
	};
