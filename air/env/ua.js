	/*--
		通过浏览器ua检测JS运行环境
		-nf
		-eg
			var ua = require('air/env/ua');
			trace(ua.msie);
			trace(ua.mobile);
			trace(ua.ua);

			//所有属性
			ua.winPhone //是否winPhone
			ua.mobile //是否手机端
			ua.win //是否windows系统
			ua.ipad //是否ipad
			ua.ios //是否ios系统
			ua.ipod //是否ipod
			ua.iphone //是否iphone
			ua.mac //是否mac系统
			ua.android //是否android
			ua.androidPad //是否androidPad
			ua.blackberry //是否blackberry
			ua.linux //是否linux系统

			ua.chrome //是否chrome浏览器
			ua.ieMobile //是否ieMobile浏览器
			ua.msie //是否msie浏览器
			ua.firefox //是否firefox浏览器
			ua.safari //是否safari浏览器
			ua.weixin //是否weibo浏览器
			ua.weibo //是否weibo浏览器
			ua.uc //是否uc浏览器
			ua.qq //是否qq浏览器
			ua.xiaomi //是否xiaomi
			ua.opera //是否opera浏览器

			ua.platVersion //操作系统版本号
			ua.browserVersion //浏览器版本号
			ua.ua //全部小写的ua源字符串
	*/
	var ua = {};
	var userAgent = navigator.userAgent.toLowerCase();

	var data = {
		platforms: [
			// windows phone must be tested before win
			{ tag: 'windows phone', versionSearch: 'windows phone os ', flags: ['winPhone', 'mobile']},
			{ tag: 'win', versionSearch: 'windows(?: nt)? ', flags: ['win']},
			// ipad and ipod must be tested before iphone
			{ tag: 'ipad', versionSearch: 'cpu os ', flags: ['ipad', 'ios'] },
			{ tag: 'ipod', versionSearch: 'iphone os ', flags: ['ipod', 'ios', 'mobile'] },
			// iphone must be tested before mac
			{ tag: 'iphone', versionSearch: 'iphone os ', flags: ['iphone', 'ios', 'mobile'] },
			{ tag: 'macintosh', versionSearch: 'os x ', flags: ['mac', 'ios'] },
			// android must be tested before linux
			{ tag: 'android', versionSearch: 'android ', flags: ['android'] },
			//versionSearch: '(?:blackberry\\d{4}[a-z]?|version)/', 
			{ tag: 'blackberry', flags: ['blackberry', 'mobile'] },
			{ tag: 'linux', flags: ['linux'] }
		],
		browsers: [
			// iemobile must be tested before msie
			{ tag: 'iemobile', versionSearch: 'iemobile/', flags: ['ieMobile', 'mobile'] },
			{ tag: 'msie', versionSearch: 'msie ', flags: ['msie'] },
			{ tag: 'firefox', versionSearch: 'firefox/', flags: ['firefox'] },
			{ tag: 'micromessenger', flags: ['weixin'] },
			{ tag: '__weibo__', flags: ['weibo'] },
			{ tag: /ucbrowser|ucweb/, flags: ['uc'] },
			{ tag: 'qqbrowser', flags: ['qq'] },
			{ tag: 'chrome', versionSearch: 'chrome/', flags: ['chrome'] },
			{ tag: 'safari', versionSearch: 'version/', flags: ['safari'] },
			{ tag: 'opera', versionSearch: 'version/', flags: ['opera'] }
		],
		engines: [
			{ tag: 'trident', flags: ['trident'] },
			// webkit must be tested before gecko
			{ tag: 'webkit', flags: ['webkit'] },
			{ tag: 'gecko', flags: ['gecko'] },
			{ tag: 'presto', flags: ['presto'] }
		]
	};

	var detect = function (items, versionFlag) {
		var versionSearch, flags,
			item, i, len, tag, got, j;
		for (i = 0, len = items.length; i < len; i++) {
			item = items[i];
			tag = item.tag;
			got = typeof tag==='string' ? userAgent.indexOf(tag)>-1 : tag.test(userAgent);
			if (got) {
				versionSearch = item.versionSearch;
				flags = item.flags;
				if (flags) {
					for (j = flags.length; j--; ) {
						ua[flags[j]] = true;
					}
				}
				if (versionFlag && versionSearch) {
					ua[versionFlag] = (new RegExp(versionSearch+'(\\d+((\\.|_)\\d+)*)').exec(userAgent) ||
						['', '0'])[1].replace(/_/g, '.');
				}
				break;
			}
		}
	};

	detect(data.platforms, 'platVersion');
	detect(data.browsers, 'browserVersion');
	detect(data.engines);
	ua.mobile || (ua.mobile = userAgent.indexOf('mobile')>0);
	ua.android && (ua.androidPad = !ua.mobile);
	if (!ua.msie) {
		//IE 11 的ua里已经没有msie字样
		ua.msie = !!window.ActiveXObject || 'ActiveXObject' in window;
	}

	ua.ua = userAgent; //全部小写的ua源字符串

	module.exports = ua;
