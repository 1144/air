	/*--
		事件对象，通过givee让一个对象或类支持自定义事件后，对象或类将具有这些方法。
	*/
	var CustomEvent = {
		//_EVENTS_: {}, //事件池
		on: function (type, handler, once) {
			var j = type.indexOf('.');
			if (j>0) {
				handler._ENAME_ = type.slice(j);
				type = type.slice(0, j);
			}
			handler._ONCE_ = once || false;
			(this._EVENTS_[type] || (this._EVENTS_[type] = [])).push(handler);
			return this;
		},
		one: function (type, handler) {
			return this.on(type, handler, true);
		},
		off: function (type) {
			var j = type.indexOf('.');
			if (j>0) {
				var handlerName = type.slice(j);
				type = this._EVENTS_[type.slice(0, j)];
				if (type) {
					for (var i = type.length; i--; ) {
						j = type[i];
						j && j._ENAME_===handlerName && (type[i] = false);
					}
				}
			} else {
				this._EVENTS_[type] = null;
			}
			return this;
		},
		//触发type类型的所有事件
		emit: function (type/*, arg1, arg2, ...*/) {
			var j = type.indexOf('.'), handlerName;
			if (j>0) {
				handlerName = type.slice(j);
				type = type.slice(0, j);
			}
			type = this._EVENTS_[type];
			if (type) {
				var i = 0, len = type.length, args = type.slice.call(arguments, 1), handler;
				for (; i < len; i++) {
					handler = type[i];
					if (handler && (!handlerName || handler._ENAME_===handlerName)) {
						handler.apply(this, args);
						handler._ONCE_ && (type[i] = false);
					}
				}
			}
			return this;
		}
	};

	/*--
		让一个对象（包括类的实例）或类支持自定义事件。
		-p object obj 纯对象、类、类的实例都可以
		-eg
			var givee = require('air.event.givee');
			var foo = {};
			givee(foo);

			var bar = givee({});

			var Dog = function(){};
			givee(Dog);
	*/
	var givee = function (obj) {
		typeof obj==='function' && (obj = obj.prototype);
		obj._EVENTS_ || (obj._EVENTS_ = {});
		obj.on || (obj.on = CustomEvent.on);
		obj.one || (obj.one = CustomEvent.one);
		obj.off || (obj.off = CustomEvent.off);
		obj.emit || (obj.emit = CustomEvent.emit);
		return obj;
	};

	module.exports = givee;
