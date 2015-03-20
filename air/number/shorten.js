	/*--
		将一个数字缩短为带“万”、“亿”等单位的数字
		-as shorten
		-p num num 源数字
		-r string 缩短后的数字字符串
		-eg
			var shorten = require('air/number/shorten');
			shorten(289887); //返回 28.99万
			shorten(-898); //返回 -898
	*/
	module.exports = function (num) {
		var n = num>0 ? num : -num;
		//1万以内
		if (n<1E4) {
			return String(num);
		}
		//1亿以内
		if (n<1E8) {
			return (num/1E4).toFixed(2)+'万';
		}
		return (num/1E8).toFixed(2)+'亿';
	};
