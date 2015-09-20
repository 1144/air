	/*--
		简单测试node.js端使用的air-js
		-note 所有的模块以模块简称为属性名挂载在air上
	*/
	var air = require('air-js');

	var byteLength = air.byteLength;
	console.log(byteLength('中国人')); // => 6
	console.log(byteLength('air')); // => 3
	console.log(air.byteLength('air')); // => 3

	console.log(air.clip('我是中国人', 8)); // => 我是中国…
	console.log(air.thousandFloat(78934.25)); // => 78,934.25
