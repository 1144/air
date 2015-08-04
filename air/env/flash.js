	/*--
		检查浏览器是否支持flash，以及获取flash的版本号
		-as flash
		-eg
			var flash = require('air/env/flash');
			trace(flash.isSupported);
			trace(flash.getVersion());
	*/

	/*--
		浏览器是否支持flash
		-ns flash
		-nf
	*/
	var isSupported = (function () {
		var plugins = navigator.plugins;
		if (plugins && plugins['Shockwave Flash']) {
			return true;
		} else if (window.ActiveXObject) {
			try {
				var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
				if (a) {
					return true;
				}
			} catch (e) {
				return false;
			}
		}
		return false;
	}());

	exports.isSupported = isSupported;

	var version = '', got = false;
	/*--
		获取flash的版本号
		-ns flash
	*/
	exports.getVersion = function () {
		if (got) {
			return version;
		}
		got = true;
		if (isSupported) {
			var nav = navigator,
				ver,
				des;
			if (nav.plugins && nav.plugins['Shockwave Flash']) {
				des = nav.plugins['Shockwave Flash'].description;
				if (des &&
						!(typeof nav.mimeTypes!=='undefined' &&
							nav.mimeTypes['application/x-shockwave-flash'] &&
							!nav.mimeTypes['application/x-shockwave-flash'].enabledPlugin)) {
					des = des.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					ver = [parseInt(des.replace(/^(.*)\..*$/, "$1"), 10),
							parseInt(des.replace(/^.*\.(.*)\s.*$/, "$1"), 10),
							/[a-zA-Z]/.test(des) ?
								parseInt(des.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0]; 
				}
			} else if (window.ActiveXObject) {
				try {
					var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
					if (a){
						des = a.GetVariable("$version").split(" ")[1].split(",");
						ver = [parseInt(des[0], 10), parseInt(des[1], 10),
							parseInt(des[2], 10)];
					}
				} catch (e) {}
			}
			version = ver;
		}
		return version;
	};
