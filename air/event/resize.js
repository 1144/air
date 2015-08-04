	/*--
		封装window对象的resize事件：延迟resize时的事件处理，减少不必要的处理次数。默认延迟25ms。
	*/
	var resize = {};
	var n = 1;
	var eventName = 'resize._'+(new Date().getTime())+'_';

	/*--
		添加resize事件处理函数
		-p fn handler window对象resize事件的处理函数
		-p num [delay = 25] 延迟多少毫秒执行处理函数
		-r string 该处理函数的名称，用于移除该处理函数
	*/
	resize.add = function (handler, delay) {
		var timer = 0, en = eventName+(n++);
		delay || (delay = 25);
		$(window).on(en, function () {
			clearTimeout(timer);
			timer = setTimeout(handler, delay);
		});
		return en;
	};

	/*--
		移除resize事件处理函数
		-p string eventName 添加处理函数时返回的函数名称
	*/
	resize.remove = function (eventName) {
		$(window).off(eventName);
	};

	module.exports = resize;
