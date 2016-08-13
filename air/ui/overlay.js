	var zIndex = 8001; //从8001开始自增，如果没有传zIndex配置项的话
	var n = 1;
	var isIE6 = require('air/env/isIE6');
	var mask = require('./mask');
	var $win = $(window);
	var noop = function () {};

	/*--
		弹出层
		-class
		-p obj opt 调用配置，除$box和html选且必选一个外，其他都是可选项。<br/>
			<p>$box: jQuery对象或一个DOM选择器（只能选中一个节点），弹出层的根节点</p>
			<p>html: html字符串，将此html插入到文档流，然后弹出</p>
			<p>fixed: 是否把层固定在浏览器窗口区内，默认为true固定</p>
			<p>mask: 遮罩层的透明度，为0~1之间的浮点数，默认为0.2。不需要遮罩层时将该选项置为false</p>
			<p>draggable: 弹出层是否可拖拽，默认false不可拖拽。为true的时，弹出层里样式加了`j-dragbar`的节点将作为拖拽触发点</p>
			<p>visible: 是否在实例化Overlay后立即显示弹出层，默认显示</p>
			<p>autoClose: 多少毫秒后自动关闭弹出层，默认不自动关闭</p>
			<p>onShow: 显示弹出层时回调</p>
			<p>onHide: 隐藏弹出层时回调</p>
			<p>onClose: 关闭弹出层时回调</p>
			<p>onClickMask: 点击遮罩层时执行的回调</p>
			<p>showFn: 代替`this.$box.show()`来显示弹出层，你可以自己写显示效果，在函数内使用`this.$box`引用到层节点</p>
			<p>hideFn: 代替`this.$box.hide()`来隐藏弹出层，你可以自己写隐藏效果，在函数内使用`this.$box`引用到层节点</p>
			<p>events: 对弹出层里的指定节点绑定事件，为一个纯对象，
				key例如`'click .j-close'`，值为处理函数，处理函数里使用`this.$box`引用到层节点</p>
			<p>underlay: 是否需要一个iframe垫片放在弹出层下面，以解决在有的浏览器下弹出层盖不住flash的bug。目前一般不需要，默认为false。</p>
		-note 依赖jQuery
		-note 由于div在样式`display:none`时无法计算div的宽高，所以弹出层在被弹出前，请使用`visibility:hidden`的方式隐藏层。
		-eg
			var Overlay = require('air/ui/overlay');
			new Overlay({
				draggable: true,
				$box: $('#recommend'),
				events: {
					//在弹出层里的.j-close节点上绑点击事件
					'click .j-close': function () {
						//使用this.$box引用到当前层
					}
				},
				onClickMask: function () {
					this.close(); //点击遮罩层时关闭弹出层
				}
			});
	*/
	function Overlay(opt) { //console.log(opt);
		var _this = this;
		_this.mask = opt.mask===false ? false : (opt.mask || 0.2);
		_this.onClickMask = opt.onClickMask || false;
		_this.onShow = opt.onShow || noop;
		_this.onHide = opt.onHide || noop;
		_this.onClose = opt.onClose || noop;
		_this.showFn = opt.showFn || false;
		_this.hideFn = opt.hideFn || false;
		var $box;
		if (opt.html) {
			_this.$box = $box = $(opt.html);
			$(document.body).prepend($box);
		} else if (typeof $box==='string') {
			_this.$box = $box = $($box);
		} else {
			_this.$box = $box = opt.$box;
		}
		_this.fixed = opt.fixed===false ? false : true;
		$box.css('position', _this.fixed ? 'fixed' : 'absolute');
		$box.css('z-index', zIndex);
		_this._zIndex = zIndex++;
		//构造一个伪jQuery对象
		_this.$underlay = {css: noop, show: noop, hide: noop, remove: noop};
		_this._calcSize();
		opt.underlay && _this._initUnderlay();
		if (opt.draggable) {
			_this._drag(); //可拖拽
			_this.resize = '';
		} else {
			_this.resize = require('air/event/resize').add(function () {
				_this.setMiddle();
			});
		}
		setTimeout(function () {
			_this._bindEvents(opt.events);
			if (opt.visible!==false) {
				_this.show();
				opt.autoClose && setTimeout(function () {
					_this.close();
				}, opt.autoClose);
			}
		}, 80); //解决有滚动条时位置计算不对的bug
		isIE6 && _this._fixIE6();
	}

	Overlay.prototype = {
		constructor: Overlay,
		_bindEvents: function (events) {
			var _this = this, $box = _this.$box;
			var k, type;
			for (k in events) {
				type = k.split(/ +/);
				if (type.length===2) {
					$box.find(type[1]).on(type[0], (function (fn) {
						return function (e) {fn.call(_this, e, this)};
					})(events[k]));
				}
			}
		},
		_calcSize: function () {
			var _this = this, $box = _this.$box;
			if ($box.outerWidth) {
				_this.width = $box.outerWidth();
				_this.height = $box.outerHeight();
			} else {
				_this.width = $box.width();
				_this.height = $box.height();
			}
			_this.$underlay.css({width: _this.width, height: _this.height});
		},
		/*--
			将弹出层居中
		*/
		setMiddle: function () {
			//var offset = this.fixed ? 0 : $win.scrollTop();
			//trace($win.height(), $win.width(), this.height, this.width);
			this._calcSize();
			this.setPosition({
				top: ($win.height() - this.height) / 2,
				left: ($win.width() - this.width) / 2
			});
			return this;
		},
		/*--
			设置弹出层的位置
			-p obj pos 位置数据，例如`{letf: 200, top: 300}`，表示距左边200px，距顶部300px
		*/
		setPosition: function (pos) {
			var top = pos.top, left = pos.left;
			if (top) {
				(!this.fixed || isIE6) && (top += $win.scrollTop());
				pos.top = top>0 ? top : 0;
			}
			//console.log(top);
			if (left) {
				isIE6 && (left += $win.scrollLeft());
				pos.left = left>0 ? left : 0;
			}
			//console.log(pos);
			this.$box.css(pos);
			this.$underlay.css(pos);
			return this;
		},
		/*--
			显示弹出层
		*/
		show: function () {
			var _this = this;
			if (_this.showFn) {
				_this.showFn();
			} else {
				_this.$box.css('display', 'block');
				_this.setMiddle();
				_this.$box.css('visibility', 'visible');
			}
			_this.$underlay.show();
			if (_this.mask) {
				mask.setZIndex(_this._zIndex - 1).show(_this.mask);
				_this.onClickMask && mask.onClick(function () {
					_this.onClickMask();
				});
			}
			return _this;
		},
		/*--
			隐藏弹出层
		*/
		hide: function () {
			this.hideFn ? this.hideFn() : this.$box.css('display', 'none').css('visibility', 'hidden');
			this.$underlay.hide();
			this.mask && mask.hide();
			return this;
		},
		/*--
			关闭弹出层，并从文档流里移除节点
		*/
		close: function () {
			if (this._closed) {return}
			this._closed = true;
			var $box = this.$box;
			this.hideFn ? this.hideFn() : $box.css('visibility', 'hidden');
			setTimeout(function () {
				$box.remove();
			}, 3000);
			this.$underlay.remove();
			this.mask && mask.hide();
			this.resize && $win.off(this.resize);
		},
		/*--
			设置弹出层里.j-content节点的内容
			-p string content 要设置的内容
		*/
		setContent: function (content) {
			this.$box.find('.j-content').html(content);
			return this;
		},
		//加上拖拽功能
		_drag: function () {
			var $box = this.$box;
			var $dragbar = $box.find('.j-dragbar');
			if (!$dragbar.length) {
				return;
			}

			var $underlay = this.$underlay;
			var startX, startY;

			var mouseMove = function (e) {
				var dx = e.pageX - startX, dy = e.pageY - startY;
				dx<0 && (dx = 0);
				dy<0 && (dy = 0);
				$box.css({top: dy, left: dx});
				$underlay.css({top: dy, left: dx});
			};
			var mouseUp = function () {
				document.onselectstart = function () {return true};
				$(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
			};

			$dragbar.on('mousedown', function (e) {
				document.onselectstart = function () {return false};
				e.preventDefault();
				startX = e.pageX - parseInt($box.css('left'));
				startY = e.pageY - parseInt($box.css('top'));

				$(document).on('mousemove', mouseMove).on('mouseup', mouseUp);
			});
		},
		//初始化underlay垫片
		_initUnderlay: function () {
			this.$underlay = $('<iframe style="background:none repeat scroll 0 0 #ffffff;'+
				'overflow:hidden; position:'+(this.fixed ? 'fixed' : 'absolute')+
				'; z-index:'+this._zIndex+
				'; width:'+this.width+'px;height:'+this.height+
				'px; border:none; display:none;" frameborder="0"></iframe>');
			this.$box.before(this.$underlay);
		},
		//修正IE6下的定位问题
		_fixIE6: function () {
			var _this = this;
			if (_this.fixed) {
				_this.$box.css('position', 'absolute');
				_this.$underlay.css('position', 'absolute');
				$win.on('scroll', function () {
					_this.setPosition({
						top: ($win.height() - _this.height) / 2
					});
				});
			}
		}
	};

	module.exports = Overlay;
