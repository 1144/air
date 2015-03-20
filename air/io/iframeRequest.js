	/*--
		通过iframe请求数据或提交表单。在IE6下不能跨域请求。
		-as iframeRequest
		-p obj opt 请求配置：
			<p>url: 请求接口</p>
			<p>type: 请求类型，POST、GET等等，可选，默认'GET'</p>
			<p>data: 请求数据，可选</p>
			<p>callback: 请求成功后的回调，参数为请求的返回数据</p>
			<p>callbackName: 传递回调名称的请求参数名，可选，默认'callback'</p>
		-rel [0, iframeCrossRequest]
		-note 基于jQuery框架
		-eg
			var iframeRequest = require('air/io/iframeRequest');
			iframeRequest({
				url: '',
				type: 'POST',
				data: {
					name: 'Feng',
					password: '123'
				},
				callback: function (res) {
					alert(res); //返回数据
				}
			});

			//接口返回值类似于：
			<script>window.parent['ifr_cb_xxxxxxxxx'](data);</script>
	*/
	module.exports = function (opt) {
		var id = String(new Date().getTime())+(Math.random()*1E5>>0),
			html, p, params = opt.data || {};

		html = '<div id="ifr_box_'+id+'" style="width:1px;height:0px;overflow:hidden;">'+
			'<form name="form_'+id+'" id="form_'+id+'" method="'+(opt.type || 'GET')
				+'" action="'+opt.url+'" target="ifr_'+id+'">';
		for (p in params) {
			html += '<input type="hidden" name="'+p+'" value="" />';
		}
		if (opt.callback) {
			window['ifr_cb_'+id] = function (res) {
				opt.callback(res);
				$('#ifr_box_'+id).remove();
				window['ifr_cb_'+id] = null;
			};
			html += '<input type="hidden" name="'+(opt.callbackName || 'callback')+
				'" value="ifr_cb_'+id+'" />';
		}
		html += '<input type="submit" value="submit" />';
		html += '</form><iframe name="ifr_'+id+'" id="ifr_'+id+'"></iframe></div>';
		$(document.body).append(html);

		setTimeout(function () {
			var f = document.getElementById('form_'+id);
			for (var p in params) {
				f[p].value = params[p];
			}
			f.submit();
		}, 1);
	};
