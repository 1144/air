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
			handler || (handler = function () {});
			var wheelHandler = function (e) {
				var direction = e.wheelDelta<0 ? -1 : 1; //滚动方向
				if (handler.call(elem, direction, e)===false) {
					if (e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					}
				}
			};
			if (browser.msie || browser.safari || browser.opera) {
				if (elem.attachEvent) {
					elem.attachEvent('onmousewheel', wheelHandler);
				} else {
					elem.onmousewheel = wheelHandler;
				}
			} else {
				elem.addEventListener('DOMMouseScroll', function (e) {
					var direction = e.detail>0 ? -1 : 1; //滚动方向
					if (handler.call(elem, direction, e)===false) {
						e.preventDefault();
					}
				}, false);
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
			if (browser.msie || browser.safari || browser.opera) {
				if (elem.detachEvent) {
					elem.detachEvent('onmousewheel');
				} else {
					elem.onmousewheel = null;
				}
			} else {
				elem.removeEventListener('DOMMouseScroll');
			}
		});
	}
});
