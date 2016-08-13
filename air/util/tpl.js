	/*--
		JS模板引擎，将 JSON对象、JSON数组、非引用类型值组成的数组 渲染到模板
		-class
		-author hahaboy
		-p str template 待渲染的模板
		-p fn mix 混合函数（数据预处理函数，在渲染每条数据之前对数据进行预处理）
		-eg
			var Tpl = require('air/util/tpl');

			//template示例1：把模板放在JS代码里
			var tpl = '<li>' +
				'<div class="headPic"><a href="{domain}" title="{name}"><span></span></a>' +
					'<img alt="" src="{head}" width="60" height="60"/>' +
				'</div>' +
				'<div class="feedCon">' +
					'<span>{$item.isOdd?[[这是奇数行]]+$item.name:[[偶的]]}</span>' +
					'<span>{ $item.abc===5 ? [[是5]] : [[是]]+$item.abc }</span>' +
				'</div>' +
			'</li>';

			//mix示例
			//	$item: 数据列表里的单条数据
			//	i: 该条数据在整个列表中的序号，从0开始
			function mix($item, i) {
				//在这里可以进行任何数据处理
				$item.domain = $item.domain.replace('shit', ''); //覆盖原来的domain值
				$item.isOdd = i & 1; //是不是奇数行
				$item.abc = $item.ab + 2; //将每条数据的ab值加2
			}

			var usertpl = new Tpl(tpl, mix);
			var html = usertpl.render([
				{domain:'domainshit', name:'FLM', head:'headdffdddd',ab:3},
				{domain:'dodshit', name:'LXH', head:'he788ddd',ab:2}
			]);

			//<!-- template示例2：把模板放在HTML页面里 -->
			<script id="tpl" type="text/templete">
				<div id="luck_box">
					<div id="ava_list">
						<div id="aa1023">{head}</div>
						<div id="aa1023">{name}</div>
						{$item.isOdd ? [[
						<div id="aa10211"><img src="logo.jpg" />isOdd</div>
						<div id="aa10212"><img src="logo.jpg" /></div>]]
						: [[
						<div id="aa1024"><img src="logo.jpg" />no isOdd</div>
						<div id="aa1025"><img src="logo.jpg" /></div>
						]]
						}
					</div>
				</div>
			</script>
	*/
	var Tpl = function (template, mix) {
		this.tpl = template;
		this.mix = mix;
	};
	Tpl.prototype = {
		/*--
			渲染数据到模板
			-p json|array data JSON对象、JSON数组、非引用类型值组成的数组
			-p fn [mix] 混合函数，有此参数时将代替实例化时传递的混合函数
			-r str 渲染结果字符串
			-eg
				var html = usertpl.render([
					{name: 'FLM', age: 25},
					{name: 'LXH', age: 27}
				], function ($item, i) {
					$item.age = $item.age + 1;
					$item.i = i;
				});
		*/
		render: function (data, mix) {
			if (!data || !this.tpl) {
				//this.tpl || trace.err('tpl render err.');
				return '';
			}
			mix = mix || this.mix;
			var hasMix = typeof mix==='function',
				tpl = this.tpl,
				ret = '',
				i, len,
				datai;

			if (typeof tpl==='string') {
				var tpls = tpl.replace(/[\r\n\t]/g, '').replace(/\'/g, "\\\'")
					.replace(/\\{/g, '\\u001').replace(/\\}/g, '\\u002').split('{'),
					sous,
					source = "return '"+tpls[0]+"'";
				for (i = 1, len = tpls.length; i < len; i++) {
					sous = tpls[i].split('}');
					if (sous[0].indexOf('$item.')<0) {
						source += "+($item."+sous[0]+"==null ? '' : $item."+
							sous[0]+")+'"+sous[1]+"'";
					} else {
						source += "+("+
							(sous[0].indexOf('[[')<0 ? sous[0] :
								sous[0].replace(/\[\[/g, "'").replace(/\]\]/g, "'"))+
						")+'"+sous[1]+"'";
					}
				}
				// console.log(source); //只会输出一次
				tpl = this.tpl = new Function('$item',
					source.replace(/\\u001/g, '{').replace(/\\u002/g, '}'));
			}

			// if (data instanceof Array) { // 通过iframe的方式请求的数据判断不准确
			if (data.sort && data.join) {
				for (i = 0, len = data.length; i<len; i++) {
					datai = data[i];
					hasMix && mix(datai, i);
					ret += tpl(datai);
				}
			} else {
				hasMix && mix(data, 0);
				ret = tpl(data);
			}
			//trace('tpl rendered!'); //每次都会输出
			return ret;
		}
	};
	
	/*--
		渲染数据到模板
		-static
		-note 本方法适合只渲染一次的模板。同一个模板渲染多次请实例化Tpl。
		-p str tpl 待渲染的模板
		-p json|array data JSON对象、JSON数组、非引用类型值组成的数组
		-p fn [mix] 混合函数，有此参数时将代替实例化时传递的混合函数
		-r str 渲染结果字符串
	*/
	Tpl.render = function (tpl, data, mix) {
		if (!data) {
			return '';
		}
		var hasMix = typeof mix==='function',
			ret = '',
			i, len,
			datai;
		
		var tpls = tpl.replace(/[\r\n\t]/g, '').replace(/\'/g, "\\\'")
			.replace(/\\{/g, '\\u001').replace(/\\}/g, '\\u002').split('{'),
			sous,
			source = "return '"+tpls[0]+"'";
		for (i = 1, len = tpls.length; i<len; i++) {
			sous = tpls[i].split('}');
			if (sous[0].indexOf('$item.')<0) {
				source += "+($item."+sous[0]+"==null ? '' : $item."+
					sous[0]+")+'"+sous[1]+"'";
			} else {
				source += "+("+
					(sous[0].indexOf('[[')<0 ? sous[0] :
						sous[0].replace(/\[\[/g, "'").replace(/\]\]/g, "'"))+
				")+'"+sous[1]+"'";
			}
		}
		//trace(source); //只会输出一次
		tpl = new Function('$item',
			source.replace(/\\u001/g, '{').replace(/\\u002/g, '}'));

		if (data.sort && data.join) {
			for (i = 0, len = data.length; i<len; i++) {
				datai = data[i];
				hasMix && mix(datai, i);
				ret += tpl(datai);
			}
		} else {
			hasMix && mix(data, 0);
			ret = tpl(data);
		}
		//trace('tpl rendered!'); //每次都会输出
		return ret;
	};
	/*--
		渲染简单的模板
		-static
		-p str template 简单的模板
		-p json|array data JSON对象、非引用类型值组成的数组
		-eg
			//输出：<dl>姓名: xiaoli, 年龄: 28</dl>
			console.log(Tpl.simple('<dl>姓名: {name}, 年龄: {age}</dl>',
				{name: 'xiaoli', age: 28}));
				
			//输出：<a href="http://www.letv.com">乐视网</a>
			console.log(Tpl.simple('<a href="{1}">{0}</a>',
				['乐视网', 'http://www.letv.com']));
	*/
	Tpl.simple = function (template, data) {
		data || (data = {});
		return template.replace(/{(\w+)}/g, function ($0, $1) {
			return data[$1] || (data[$1]===0 ? '0' : '');
		});
	};

	module.exports = Tpl;
