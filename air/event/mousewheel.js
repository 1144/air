//添加滚轮事件
$.fn.extend({
	/*--
		添加鼠标滚轮事件。作为jQuery插件。
		-as mousewheel
		-p fn handler 事件处理函数，返回false时才阻止默认事件
		-eg
			//direction 滚动方向：-1 向下，1 向上
			//e 事件对象
			$('#list').mousewheel(function (direction, e) {
				//this指向#list节点
				//todo
			});
	*/
	mousewheel: function (handler) {
		return this.each(function () {
			var elem = this, browser = $.browser;
			handler || (handler = function(){});

			if (browser.msie || browser.safari || browser.opera) {
				elem.__mousewheel = function (e) {
					var direction = e.wheelDelta<0 ? -1 : 1; //滚动方向
					if (handler.call(elem, direction, e)===false) {
						if (e.preventDefault) {
							e.preventDefault();
						} else {
							e.returnValue = false;
						}
					}
				};
				if (elem.attachEvent) {
					elem.attachEvent('onmousewheel', elem.__mousewheel);
				} else {
					elem.onmousewheel = elem.__mousewheel;
				}
			} else {
				elem.__mousewheel = function (e) {
					var direction = e.detail>0 ? -1 : 1; //滚动方向
					if (handler.call(elem, direction, e)===false) {
						e.preventDefault();
					}
				};
				elem.addEventListener('DOMMouseScroll', elem.__mousewheel, false);
			}
		});
	},
	/*--
		移除鼠标滚轮事件。作为jQuery插件。
		-as removeMousewheel
		-eg
			//移除#list节点的mousewheel事件
			$('#list').removeMousewheel();
	*/
	removeMousewheel: function () {
		return this.each(function () {
			var elem = this, browser = $.browser;
			if (!elem.__mousewheel) {return}
			if (browser.msie || browser.safari || browser.opera) {
				if (elem.detachEvent) {
					elem.detachEvent('onmousewheel', elem.__mousewheel);
				} else {
					elem.onmousewheel = null;
				}
			} else {
				elem.removeEventListener('DOMMouseScroll', elem.__mousewheel);
			}
			elem.__mousewheel = null;
		});
	}
});
