
	var air = require('air-js');
	var byteLength = air.use('byteLength'); //使用模块简称引用模块
	console.log(byteLength('中国人'));

	console.log(air.use('air/string/byteLength')('中国人民')); //使用模块全称引用模块

	console.log(air.use('thousand')(78934.25));
