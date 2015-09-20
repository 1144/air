/*--
	node.js服务端使用air-js的入口
*/
var module_abbr = require('./module-abbr'),
	moduleAbbr,
	air = {};

for (moduleAbbr in module_abbr) {
	~function (abbr) {
		air.__defineGetter__(abbr, function () {
			//console.log(abbr);
			return air['_'+abbr] || (air['_'+abbr] = require('./'+module_abbr[abbr]));
		});
	}(moduleAbbr);
}

module.exports = air;
