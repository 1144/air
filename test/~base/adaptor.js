var module = {exports: {}};
_require = require;
require = function (id) {
	var abbrs = module.exports;
	for (var k in abbrs) {
		if (abbrs[k]===id) {
			return _require(k);
		}
	}
	return _require(id);
};