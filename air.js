/*--
	node.js服务端使用air-js的入口
*/
var module_abbr = require('./module-abbr'),
	air = {};

air.use = function (moduleAbbr) {
	if (air.hasOwnProperty(moduleAbbr)) {
		return air[moduleAbbr];
	}
	var id = module_abbr[moduleAbbr];
	if (id) {
		return air[moduleAbbr] = require('./'+id);
	} else {
		console.log('AIR-ERROR: Module "'+ moduleAbbr +'" is not found!');
	}
};

air.load = function (moduleAbbrs) {
	var abbrs = moduleAbbrs.replace(/\s/g, '').split(','),
		i = abbrs.length,
		moduleAbbr,
		id;
	while (i--) {
		moduleAbbr = abbrs[i];
		if (air.hasOwnProperty(moduleAbbr)) {continue}
		id = module_abbr[moduleAbbr];
		if (id) {
			air[moduleAbbr] = require('./'+id);
		} else {
			console.log('AIR-ERROR: Module "'+ moduleAbbr +'" is not found!');
		}
	}
};

module.exports = air;
