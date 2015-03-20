	/*--
		通过iframe跨域请求数据或提交表单，而且是在iframe里创建表单。
		解决了IE6下跨域的问题。
		-as iframeCrossRequest
		-p obj opt 请求配置：
			<p>url: 请求接口</p>
			<p>blankUrl: 空白页的url，是一个跟请求接口在同一个域的url。
				由于跨域请求，需要在iframe里先加载一个空白页作为中介。</p>
			<p>type: 请求类型，POST、GET等等，可选，默认'GET'</p>
			<p>data: 请求数据，可选</p>
			<p>callback: 请求成功后的回调，参数为请求的返回数据</p>
			<p>callbackName: 传递回调名称的请求参数名，可选，默认'callback'</p>
		-rel [0, iframeRequest]
		-note 基于jQuery框架
		-note 需要一个空白页面，例如 http://sso.letv.com/user/loginblank
		-eg
			var iframeCrossRequest = require('air/io/iframeCrossRequest');
			iframeCrossRequest({
				url: '',
				blankUrl: 'http://sso.letv.com/user/loginblank',
				type: 'POST',
				data: {
					name: 'Feng',
					password: '123'
				},
				callback: function (res) {
					alert(res); //返回数据
				}
			});
	*/

	$(function () {
		$(document.body).append('<div style="width:1px;height:0px;overflow:hidden;">'+
			'<iframe name="ifr_blank_i18ox" id="ifr_blank_i18ox"></iframe></div>');
	});

	var iframeCrossRequest = function (opt, ready) {
		var DOC = document.getElementById('ifr_blank_i18ox');
		$(DOC).off('load');
		if (!ready) {
			$(DOC).on('load', function () {
				iframeCrossRequest(opt, true);
			});
			DOC.src = opt.blankUrl;
			return;
		}
		DOC = DOC.contentWindow.document;

		var id = String(new Date().getTime())+(Math.random()*1E5>>0),
			html, p, params = opt.data || {};

		html = '<div><form name="form_'+id+'" id="form_'+id+'" method="'+
			(opt.type || 'GET')+'" action="'+opt.url+'">';
		for (p in params) {
			html += '<input type="hidden" name="'+p+'" value="" />';
		}
		if (opt.callback) {
			window['ifr_cb_'+id] = function (res) {
				opt.callback(res);
				window['ifr_cb_'+id] = null;
			};
			html += '<input type="hidden" name="'+(opt.callbackName || 'callback')+
				'" value="ifr_cb_'+id+'" />';
		}
		html += '<input type="submit" value="submit" />';
		html += '</form></div>';
		DOC.body.innerHTML = html;

		setTimeout(function () {
			var f = DOC.getElementById('form_'+id);
			for (var p in params) {
				f[p].value = params[p];
			}
			f.submit();
		}, 1);
	};

	module.exports = iframeCrossRequest;
