	/*--
		简单的弹出层管理，实现：点击某个元素时弹出一个层，点击这个层之外的元素时层消失。
		-p opt 调用选项<br/>
			必填选项：
			<p>$target: 绑定点击事件的目标节点</p>
			<p>$layer: 弹出的层</p>
			可选项：
			<p>toggleMode: 是否切换模式，为true表示首次点击$target展示$layer，再次点击则隐藏$layer。
				默认false，点击$target始终展示$layer。</p>
			<p>show: 取代默认的展示函数，有此参数时需要在函数里手动显示$layer</p>
			<p>hide: 取代默认的隐藏函数，有此参数时需要在函数里手动隐藏$layer</p>
		-note 依赖jQuery
		-eg
			var popLayer = require('air/ui/popLayer');
			popLayer({
				$target: $('#target'),
				$layer: $('#layer')
			});

			popLayer({
				$target: $('#target'),
				$layer: $('#layer'),
				toggleMode: true,
				show: function(){
					//this指向本配置对象
					this.$layer.fadeIn();
				},
				hide: function(){
					this.$layer.fadeOut();
				}
			});
	*/
	var n = 1;
	var popLayer = function(opt){
		var eventName = 'click.popLayer_' + (n++),
			hide = opt.hide || function(){this.$layer.hide()},
			emitBodyClick = true,
			bindClick = true;

		var clickBody = function(){
			if(emitBodyClick){
				hide.call(opt);
				$(document.body).off(eventName);
				bindClick = true;
			}
			emitBodyClick = true;
		};

		opt.$target.on('click', function(){
			//e.stopPropagation(); //不能使用阻止事件冒泡的方式，因为会阻止父节点的事件代理
			emitBodyClick = false;
			if(opt.$layer.is(':hidden')){
				opt.show ? opt.show.call(opt) : opt.$layer.show();
				if(bindClick){
					$(document.body).on(eventName, clickBody);
					bindClick = false;
				}
			}else{
				if(opt.toggleMode){
					hide.call(opt);
					$(document.body).off(eventName);
					bindClick = true;
				}
			}
		});
		opt.$layer.on('click', function(){
			//e.stopPropagation();
			emitBodyClick = false;
		});
	};

	module.exports = popLayer;
