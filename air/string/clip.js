	/*--
		截取指定长度的字符串
		-author hahaboy
		-p string str 源字符串
		-p number clipLen 截取长度
		-p number [limitLen] 最大长度，默认是截取长度。超过这个最大长度才截字符串。
		-p string [suffix='..'] 后缀，默认两个点
		-note 一个全角字符长度算2
		-eg
			var clip = require('air/util/clip');
			trace(clip('我是中国人', 8)); //我是中国..
			trace(clip('我是中国人', 8, '…')); //我是中国…
			trace(clip('我是中国人', 8, 10)); //我是中国人
			trace(clip('我是中国人哈哈哈', 8, 10)); //我是中国..
	*/
	var clip = function(str, clipLen, limitLen, suffix){
		if(!str){
			return '';
		}
		var len = str.length;
		if(len*2<=clipLen){return str}
		if(typeof limitLen!=='number'){
			suffix = limitLen; //没有传limitLen
			limitLen = clipLen;
		}
		suffix || (suffix = '..');

		var clipi = 0,
			a = 0,
			i = 0;
		for(; i < len; i++){
			if(str.charCodeAt(i) > 255){
				a += 2;
			}else{
				a++;
			}
			if(a > clipLen && clipi===0){
				clipi = i;
			}
			if(a > limitLen){
				return str.slice(0, clipi) + suffix;
			}
		}
		return str;
	};

	module.exports = clip;
