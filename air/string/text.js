	/*--
		文本处理工具
		-as Text
		-note 服务端不可用
		-eg
			var Text = require('air/string/text');
	*/
	module.exports = {
		/*--
			将字符串进行html编码
			-p str str 需要html编码的字符串
			-r 对str进行html编码后的字符串
			-eg
				var Text = require('air/string/text');
				var code = '<script data-ng="1">alert(1);</script>';
				alert(Text.encodeHTML(code)); //&lt;script data-ng="1"&gt;alert(1);&lt;/script&gt;
		*/
		encodeHTML: function (str) {
			var div = document.createElement('div');
			div.appendChild(document.createTextNode(str));
			return div.innerHTML.replace(/\s\s/g, '&nbsp;&nbsp;');
		},
		/*--
			将html编码的字符串解码
			-p str str 需要解码的html字符串
			-r 解码后的字符串
			-eg
				var code = '&lt;script&gt;alert(1);&lt;/script&gt;';
				alert(Text.decodeHTML(code)); //<script>alert(1);</script>
		*/
		decodeHTML: function (str) {
			var div = document.createElement('div');
			div.innerHTML = str;
			return div.innerText || div.textContent || '';
		}
	};
	
	/*--
		单引号实体编码：&amp;#39;<br/>
		双引号实体编码：&amp;quot;<br/>
		&实体编码：&amp;amp;
		-know 单双引号实体编码
	*/