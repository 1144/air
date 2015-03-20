	require('air/event/mousewheel'); //引入mousewheel的jquery插件

	/*--
		y方向的滚动条拖拽组件，包括处理鼠标滚动事件
		-p obj opt 初始化选项：
			<p>$dragBar: 滚动条</p>
			<p>$cont: 容器窗口</p>
			<p>$list: 列表</p>
			<p>initTop: 可选，初始时内容列表的top值，默认0</p>
			<p>contHeight: 内容区高度</p>
			<p>listHeight: 列表高度，一般是数据条数乘以单条高度算得</p>
			<p>stepLen: 可选，滚动一下移动多长的距离，默认15</p>
			<p>onInit: 初始化完成时回调，可选</p>
			<p>onDrag: 拖拽过程中回调，可选</p>

	*/
	var yDragBar = function (opt) {
		var config = {
			minY: 0,
			maxY: 100,
			onInit: function ($dragBar) {},
			onDrag: function ($dragBar, data) {}
		};
		this.$dragBar = typeof opt.$dragBar==='string' ? $(opt.$dragBar) : opt.$dragBar;
		this.$cont = typeof opt.$cont==='string' ? $(opt.$cont) : opt.$cont;
		opt.$list = typeof opt.$list==='string' ? $(opt.$list) : opt.$list;

		var hiddenHeight = opt.listHeight - opt.contHeight;
		var barHeight = Math.floor(opt.contHeight*opt.contHeight/opt.listHeight);
		barHeight<50 && (barHeight = 50);
		this.$dragBar.height(barHeight);
		opt.maxY = opt.contHeight - barHeight;
		config.ratio = hiddenHeight / opt.maxY;
		config.dy = (opt.stepLen || 25) * opt.maxY / hiddenHeight;
		config.hiddenHeight = hiddenHeight;

		this.config = $.extend(config, opt);

		this.init();
	};

	yDragBar.prototype = {
		init: function () {
			var $dragBar = this.$dragBar, config = this.config;
			var data = {};
			var startY;
			var isMoving = false;
			
			config.onInit($dragBar); //初始
			config.initTop && this.moveTo(config.initTop);
			$dragBar.mousedown(function (e) {
				document.onselectstart = function () {return false};
				e.preventDefault();
				isMoving = true;
				startY = e.pageY;
				data.top = parseFloat($dragBar.css("top")) || 0;
			});
			
			var $doc = $(window.document.documentElement);
			$doc.mousemove(function (e) {
				if (!isMoving) {return}
				var dy = e.pageY - startY;
				var y = data.top + dy;
				
				if (y>config.maxY) {
					y = config.maxY;
				}
				if (y<config.minY) {
					y = config.minY;
				}
				
				$dragBar.css({top:y});
				config.$list.css({top: -1 * y * config.ratio});
				config.onDrag($dragBar, {
					top: y,
					dy: dy
				});
			}).mouseup(function () {
				isMoving = false;
				document.onselectstart = function () {return true};
			});
			this.on(data);
		},
		//config值重置
		reset: function (opt) {
			//TODO
			//$.extend(this.config, opt);
		},
		//绑定滚动事件
		on: function (data) {
			var config = this.config;
			var $dragBar = this.$dragBar;
			//是否滚动
			if (config.ifScroll===0) {return} //开关
			//console.log(config.cont);
			this.$cont.mousewheel(function (direction) {
				var dy = config.dy;
				data.top = parseFloat($dragBar.css('top'));
				var y, emitDefault = false;
				if (direction>0) {
					y = data.top - dy;
				} else {
					y = data.top + dy;
				}
				if (y>config.maxY) { 
					y = config.maxY;
					emitDefault = true;
				}
				if (y<config.minY) {
					y = config.minY;
					emitDefault = true;
				}
				$dragBar.css({top: y});
				config.$list.css({top: -1 * y * config.ratio});
				config.onDrag($dragBar, {
					top: y,
					dy: dy
				});
				return emitDefault;
			});
		},
		//解绑
		off: function () {
			this.$cont.removeMousewheel();
		},
		/*--
			将内容列表移动指定的长度（相对当前位置的一个偏移量）
		*/
		move: function (offset) {
			var config = this.config;
			var top = parseInt(config.$list.css('top')) + offset;
			if(top<-1*config.hiddenHeight){
				top = -1*config.hiddenHeight;
			}else if(top>0){
				top = 0;
			}
			var $dragBar = this.$dragBar;
			config.$list.animate({top: top}, {
				duration: 'slow',
				step: function (t) {
					$dragBar.css({top: -1 * t / config.ratio}); //滚动时拖拽条也同时滚动
				}
			});
		},
		/*--
			将内容列表移动到指定的位置（一个绝对的top值）
		*/
		moveTo: function (top) {
			var config = this.config;
			if (top<-1*config.hiddenHeight) {
				top = -1 * config.hiddenHeight;
			} else if (top>0) {
				top = 0;
			}
			var $dragBar = this.$dragBar;
			config.$list.animate({top: top}, {
				duration: 'slow',
				step: function (t) {
					$dragBar.css({top: -1 * t / config.ratio}); //滚动时拖拽条也同时滚动
				}
			});
		}
	};
	
	module.exports = yDragBar;
