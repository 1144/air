	var thousand = require('./thousand');
	/*--
		给数字（整数、浮点数）加上千位分隔符
		-as thousandFloat
		-p num num 源数字
		-r string 加上千位分隔符的数字字符串
		-eg
			var thousandFloat = require('air/number/thousandFloat');
			thousandFloat(289887.89); //返回 289,887.89
			thousandFloat(-89887); //返回 -89,887
	*/
	module.exports = function (num) {
		num = String(num).split('.');
		return num.length>1 ? thousand(num[0])+'.'+num[1] : thousand(num[0]);
	};
