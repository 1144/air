
var module_abbr = require('./module-abbr'),
	cache = {};

exports.use = function (moduleId) {
	if (cache[moduleId]) {
		return cache[moduleId];
	}
	try {
		return cache[moduleId] = require('./' + (module_abbr[moduleId] || moduleId));
	} catch (e) {
		console.log('AIR-ERROR: Module "'+ moduleId +'" is not found!');
	}
};
