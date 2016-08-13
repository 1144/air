	/*--
		url相关工具
		-note 服务端不可用getQuery方法
		-eg
			var Url = require('air/util/url');
			Url.getQuery('type');
		-ver 0.0.1
		-author hahaboy
	*/
	var Url = {
		//私有属性
		_query: null,
		/*--
			获取URL中的参数
			-p str name 参数名
			-r 参数值
			-note 所有返回值都是字符串
			-eg
				//URL: http://open.api.letv.com/ms?from=pc&or=1&dt=2
				Url.getQuery('dt'); //返回'2'
				Url.getQuery(); //返回对象：{from:'pc', or:'1', dt:'2'}
		*/
		getQuery: function (name) {
			var query = Url._query;
			if (query===null) {
				query = Url._query = Url.parseQuery(window.location.search.slice(1));
			}
			return name ? (query[name.toLowerCase()] || '') : query;
		},
		/*--
			把一个数组序列化成URL参数字符串
			-p string name 参数名
			-p array valueArr 值数组
			-note 值会被进行encodeURIComponent编码
			-eg
				//返回 type=tv&type=movie
				Url.serializeArray('type', ['tv', 'movie']);
		*/
		serializeArray: function (name, valueArr) {
			name += '=';
			var res = [], i = 0, len = valueArr.length;
			for (; i<len; i++) {
				valueArr[i]==='' || res.push(name+encodeURIComponent(valueArr[i]));
			}
			return res.join('&');
		},
		/*--
			把一个对象序列化成URL参数字符串
			-p object param 参数对象
			-note 空字符串不能传
			-note 参数值会被进行encodeURIComponent编码
			-eg
				//返回 a=1&c=false&d=0
				Url.serializeQuery({a:1, b:'', c:false, d:0});
		*/
		serializeQuery: function (param) {
			var k, v, p = [];
			for (k in param) {
				v = param[k];
				if(v!=='' && param.hasOwnProperty(k)){
					p.push(v instanceof Array ? Url.serializeArray(k, v) :
						k+'='+encodeURIComponent(v));
				}
			}
			return p.join('&');
		},
		/*--
			解析URL参数格式的字符串
			-p string url 可以是url但不一定是url
			-eg
				//返回 {a:1, e:0, f:'false'}
				Url.parseQuery('http://xyz.com/?a=1&e=0&f=false#some');
		*/
		parseQuery: function (url) {
			url = url.split('#')[0]; //去掉hash
			if (url.indexOf('?')>-1) {
				url = url.split('?')[1];
			}
			url = url.split('&');
			var query = {},
				i = 0, l = url.length,
				p, j;
			for (; i<l; i++) {
				p = url[i];
				if (p) {
					j = p.indexOf('=');
					v = decodeURIComponent(p.slice(j + 1));
					if (v && j>0) {
						p = p.slice(0, j).toLowerCase();
						if (query[p]) {
							if (typeof query[p]==='string') {
								query[p] = [query[p], v];
							} else {
								query[p].push(v);
							}
						} else {
							query[p] = v;
						}
					}
				}
			}
			return query;
		},
		/*--
			把一个URL拼接上一个参数对象
			-p string url url地址
			-p object param 参数对象
			-eg
				//返回 http://xyz.com/?a=1&e=0#some
				Url.setQuery('http://xyz.com/#some', {a:1, b:'', e:0});
		*/
		setQuery: function (url, param) {
			var hash = '';
			if (url.indexOf('#')>-1) {
				url = url.split('#');
				hash = '#'+url[1];
				url = url[0];
			}
			if (url.indexOf('?')>0) {
				var query = Url.parseQuery(url);
				for (var k in query) {
					param.hasOwnProperty(k) || 
						(query.hasOwnProperty(k) && (param[k] = query[k]));
				}
				url = url.split('?')[0];
			}
			return url+'?'+Url.serializeQuery(param)+hash;
		}
	};

	module.exports = Url;
