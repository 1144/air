	/*--
		生成module-abbr.js文件
	*/
	var fs = require('fs');
	var air_path = './air';
	var cats = 'array dom env event io lang node number string ui util'.split(' ');
	var cats_desc = {'node': 'node 只有node.js能用的'};
	var fc = '//模块简称与全称（模块绝对路径）的映射\r\nmodule.exports = {\r\n{{abbr_list}}\r\n};\r\n';
	var abbr_list = '';

	cats.forEach(function (cat) {
		var path = air_path+'/'+cat;
		abbr_list += "\t// "+(cats_desc[cat] || cat)+"\r\n";
		fs.readdirSync(path).forEach(function (filename) {
			if (filename.slice(-3)==='.js') {
				filename = filename.slice(0, -3);
				abbr_list += "\t'"+filename+"': 'air/"+cat+"/"+filename+"',\r\n";
			}
		});
		abbr_list += '\r\n';
	});

	fs.writeFile('./module-abbr.js', fc.replace('{{abbr_list}}', abbr_list.slice(0, -5)), function (err) {
		console.log(err || '生成成功~');
	});
