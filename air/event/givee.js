	/*--
		事件对象。
		通过givee让一个对象或类支持事件功能后，它们将具有EventEmitter的所有方法。
		-private
		-note 私有对象，只能通过givee使用
		-rel [0, givee]
	*/
	var EventEmitter = {
		//_EVENTS_: {}, //事件池
		/*--
			绑定事件
			-p string type 事件类型
			-p function handler 事件处理函数
			-p boolean [once = false] 是否一次性事件（只会被触发一次）
			-eg
				foo.on('inited', function (data1, data2) {
					//todo
				});
		*/
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
		/*--
			绑定一次性事件（只会被触发一次）
			-p string type 事件类型
			-p function handler 事件处理函数
		*/
		one: function (type, handler) {
			return this.on(type, handler, true);
		},
		/*--
			解绑事件
			-p string type 事件类型
		*/
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
		/*--
			触发事件
			-p string type 事件类型
			-note 要传递事件数据时，将数据依次列在type后面
			-eg
				foo.emit('inited', data1, data2);
		*/
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
		给一个对象（包括类的实例）或类添加事件相关功能。
		-p object obj 纯对象、类、类的实例都可以
		-note 给类添加事件功能时要注意：现假设定义了一个类People，“givee(People)”之后，
			类的所有实例都会具有事件功能，并且<rb>共用同一个事件池</rb>。
			如果想让各实例单独使用事件池，那么要在类的构造器里加上
			<cs>this._EVENTS_ = {};</cs>
		-rel [0, EventEmitter] 调用givee后对象将具有EventEmitter的所有方法
		-eg
			var givee = require('air/event/givee');
			var foo = {a: 1};
			givee(foo); //给已有的foo对象添加事件功能

			var bar = givee({}); //直接创建一个具有事件功能的对象

			var Dog = function(){};
			givee(Dog); //给一个类添加事件功能
	*/
	var givee = function (obj) {
		typeof obj==='function' && (obj = obj.prototype);
		obj._EVENTS_ || (obj._EVENTS_ = {});
		obj.on || (obj.on = EventEmitter.on);
		obj.one || (obj.one = EventEmitter.one);
		obj.off || (obj.off = EventEmitter.off);
		obj.emit || (obj.emit = EventEmitter.emit);
		return obj;
	};

	module.exports = givee;
