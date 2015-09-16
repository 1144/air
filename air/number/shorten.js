	/*--
		将一个数字缩短为带“万”、“亿”等单位的数字
		-as shorten
		-p num num 源数字
		-p num [fix = 1] 小数点后保留几位小数，默认保留1位
		-r string 缩短后的数字字符串
		-eg
			var shorten = require('air/number/shorten');
			shorten(8938382); // 893.8万
			shorten(8938382, 0); // 894万
			shorten(8938382, -1); // 890万
			shorten(8938382, -2); // 900万
			shorten(-898); // -898
	*/
	module.exports = function (num, fix) {
		var n = num>0 ? num : -num;
		fix==null && (fix = 1);
		//1万以内
		if (n<1E4) {
			return String(num);
		}
		//1亿以内
		if (n<1E8) {
			return (num/1E4).toFixed(fix)+'万';
		}
		return (num/1E8).toFixed(fix)+'亿';
	};
