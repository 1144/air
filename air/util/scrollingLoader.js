	/*--
		滚动加载（即瀑布流，边滚动鼠标边加载数据，或点击按钮才加载数据）
		-note 服务端不可用
		-p obj opt 实例化选项，必填参数：
			<p>loadData: 加载数据的函数，点击加载按钮或滚动页面至该加载数据时调用。</p>
			可选参数：
			<p>$list: 利用滚动事件加载数据时，此参数必选</p>
			<p>offsetY: 利用滚动事件加载数据时，校正Y方向的偏移量，
				滚动到$list底部时，提前多少px就加载数据</p>
			<p>$loadBtn: 加载数据的按钮（类型为有绑定点击事件方法的对象，例如jQuery对象）</p>
			<p>maxTimes: 最多加载几次数据</p>
			<p>onStop: 停止加载数据的回调，传递一个参数，表明是否用户手动停止，
				值为false表示超过最大加载次数而停止</p>
		-eg
			var ScrollingLoader = require('air/util/scrollingLoader');

			var n = 1;
			var opt = {
				$list: $('#list'),
				offsetY: 150,
				//$loadBtn: $('#loadBtn'),
				maxTimes: 3,
				//isUserStopped 是否用户触发的停止加载
				onStop: function (isUserStopped) {
					console.log('isUserStopped:', isUserStopped);
					//通过this.loadedTimes可取到请求了几次数据
					console.log('loadedTimes:', this.loadedTimes);
				},
				loadData: function () {
					//通过this.loadedTimes可取到请求了几次数据
					console.log('第 '+this.loadedTimes+' 次请求数据...');
					var i = 0, pageSize = 10;
					for (; i < pageSize; i++) {
						$('#list').append('<li style="height:100px;">第 '+(n++)+' 条数据</li>');
					}
				}
			};

			var loader = new ScrollingLoader(opt);

			$('#stop').on('click', function () {
				loader.stopLoading();
			});
			$('#continue').on('click', function () {
				loader.continueToLoad();
			});
	*/
	function ScrollingLoader(opt) {
		var _this = this;
		_this.loadedTimes = 0;
		_this.onStop = opt.onStop || function () {};
		_this._loadData = opt.loadData;
		_this._maxTimes = opt.maxTimes;
		if (opt.$loadBtn) {
			opt.$loadBtn.on('click', function () {
				_this.loadData();
			});
		} else if (opt.$list) {
			_this._initScrollEvent(opt);
		}
	}

	ScrollingLoader.prototype = {
		_initScrollEvent: function (opt) {
			var _this = this;
			var $win = $(window),
				$list = opt.$list,
				offsetY = opt.offsetY || 0,
				timer = 0;
			_this._onscroll = function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					var h1 = $win.scrollTop() + $win.height() + offsetY,
						h2 = $list.offset().top + $list.height();
					//console.log(h1, h2);
					if (h1>h2) {
						_this.loadData();
					}
				}, 100);
			};
			_this.addScrollEvent();
		},
		/*--
			手动加载数据，比如第一屏时手动加载一次
		*/
		loadData: function () {
			var _this = this;
			if (_this._isStopped) {return}
			_this.loadedTimes++;
			_this._loadData();
			if (_this.loadedTimes===_this._maxTimes) {
				_this._isStopped = true;
				_this.onStop(false);
			}
		},
		/*--
			暂停加载数据
		*/
		stopLoading: function () {
			this._isStopped = true;
			this.onStop(true);
		},
		/*--
			继续加载数据
		*/
		continueToLoad: function () {
			this._isStopped = false;
		},
		/*--
			通过scroll事件加载数据时，手动绑定scroll事件
			-note 一般不用调用此方法，只有在因为业务逻辑原因调用了removeScrollEvent之后，
				又想再次绑定scroll事件时才能调用此方法。
		*/
		addScrollEvent: function () {
			window.addEventListener ?
				window.addEventListener('scroll', this._onscroll, false) :
				$(window).on('scroll', this._onscroll);
		},
		/*--
			通过scroll事件加载数据时，手动取消绑定scroll事件
		*/
		removeScrollEvent: function () {
			window.removeEventListener ?
				window.removeEventListener('scroll', this._onscroll) :
				$(window).off('scroll', this._onscroll);
		}
	};

	module.exports = ScrollingLoader;
