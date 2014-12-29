	/*--
		数据观察者
		-eg
			var DataObserver = require('air/event/dataObserver');
			//绑定数据事件
			DataObserver.on('xxx', function(data1, data2){
				;
			});
			//触发数据事件
			DataObserver.emit('xxx', data1, data2);
	*/
	var DataObserver = {
		_EVENTS_: {}, //事件池
		//数据池，被调用过的事件类型才会有数据
		//所以根据这个判断数据是否已经准备好
		_DATA_: {},
		//绑定数据事件
		on: function (type, handler) {
			(this._EVENTS_[type] || (this._EVENTS_[type] = [])).push(handler);
			if (this._DATA_.hasOwnProperty(type)) {
				handler.apply(null, this._DATA_[type]);
			}
			return this;
		},
		off: function (type) {
			this._EVENTS_[type] = null;
			delete this._DATA_[type];
			return this;
		},
		//触发type类型的所有事件
		emit: function (type/*, arg1, arg2, ...*/) {
			var es = this._EVENTS_[type] || [];
			var i = 0, len = es.length, args = es.slice.call(arguments, 1);
			this._DATA_[type] = args;
			for (; i < len; i++) {
				es[i].apply(null, args);
			}
			return this;
		}
	};

	module.exports = DataObserver;
