	/*--
		简单测试node.js端使用的air-js
		-note 只能使用模块简称引用模块
	*/
	var air = require('air-js');
	// 通过use方法引用模块，只能使用模块简称
	var byteLength = air.use('byteLength');
	console.log(byteLength('中国人')); // => 6

	// 通过load方法一次性将多个模块挂载到air上
	air.load('clip, thousandFloat');

	console.log(air.clip('我是中国人', 8)); // => 我是中国…

	console.log(air.thousandFloat(78934.25)); // => 78,934.25
