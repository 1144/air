	/*--
		给整数加上千位分隔符
		-as thousand
		-p num num 源数字
		-r string 加上千位分隔符的数字字符串
		-eg
			var thousand = require('air/number/thousand');
			thousand(289887); //返回 289,887
			thousand(-89887); //返回 -89,887
	*/
	module.exports = function (num) {
		//return String(num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
		num = String(num).split('');
		var i = num.length, j = 0;
		while (i--) {
			j++;
			if (j===4) {
				num.splice(i + 1, 0, ',');
				j = 1;
			}
		}
		num[0]==='-' && num[1]===',' && num.splice(1, 1);
		return num.join('');
	};
