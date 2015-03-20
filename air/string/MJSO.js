	/*--
		MJSO最小化的JS对象(Minimized JavaScript Object)
		-as MJSO
	*/
	module.exports = {
		/*--
			解析字符串
			-p string mjsoString MJSO字符串
			-p string [splitChar = '\u0001'] 分隔符
			-r object 结果对象
			-eg
				trace(MJSO.parse('a1b2cx-x')); //返回{a:'1', b:'2', c:'x-x'}
				trace(MJSO.parse('a,1,b,2,c,x-x', ',')); //返回{a:'1', b:'2', c:'x-x'}
		*/
		parse: function (mjsoString, splitChar) {
			var res = {},
				data = (mjsoString || '').split(splitChar || '\u0001'),
				len = data.length,
				i = 0;
			if (len>1) {
				for (; i < len; i += 2) {
					res[data[i]] = data[i + 1];
				}
			}
			return res;
		},
		/*--
			将对象最小字符串化
			-p object obj 纯对象
			-p string [splitChar = '\u0001'] 分隔符
			-r 结果字符串
			-eg
				trace(MJSO.stringify({a:1,b:2,c:'x-x'})); //'a1b2cx-x'
				trace(MJSO.stringify({a:1,b:2,c:'x-x'}, ',')); //'a,1,b,2,c,x-x'
		*/
		stringify: function (obj, splitChar) {
			splitChar = splitChar || '\u0001';
			var p, res = [];
			for (p in obj) {
				if (obj.hasOwnProperty(p)) {
					res.push(p+splitChar+obj[p]);
				}
			}
			return res.join(splitChar);
		}
	};
