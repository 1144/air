	var undef, reg_rep = /[\r\n\t\"\\]/g,
		rep = {'\r':'\\r', '\n':'\\n', '\t':'\\t', '"':'\\"', '\\':'\\\\'};

	/*--
		将JSON数组转变成字符串的简单、轻量级函数。
		需要复杂的处理能力的话，请使用第三方插件
			https://github.com/douglascrockford/JSON-js
		-p string object json对象
		-r string json字符串
		-eg
			require('air/string/stringifyJSON')({a:1}); //'{"a":1}'
	*/
	function stringifyJSON(object) {
		var type = typeof object;
		if (type==='object') {
			if (Array===object.constructor) {
				type = 'array';
			} else if (RegExp===object.constructor) {
				type = 'regexp';
			} else {
				type = 'object';
			}
		}
		switch (type) {
			case 'string':
				return '"'+ object.replace(reg_rep, function (match) {
					return rep[match];
				}) +'"';

			case 'number':
				return isFinite(object) ? object.toString() : 'null';

			case 'object':
				if (object===null) {return 'null'}
				var results = [];
				for (var property in object) {
					var value = stringifyJSON(object[property]);
					if (value!==undef) {
						results.push(stringifyJSON(property)+':'+value);
					}
				}
				return '{'+results.join(',')+'}';

			case 'array':
				var results = [];
				for (var i = 0; i < object.length; i++) {
					var value = stringifyJSON(object[i]);
					if (value!==undef) {
						results.push(value);
					}
				}
				return '['+results.join(',')+']';

			case 'function':
			case 'boolean':
			case 'regexp':
				return object.toString();

			//case 'undefined':
			//case 'unknown':
			//	return;
		}
	}

	module.exports = stringifyJSON;
