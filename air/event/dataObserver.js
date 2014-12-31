	/*--
		数据观察者。
		使用场景：多个模块里需要加载同一个数据，但只需要加载一次。所以在每个模块里绑定
		数据加载完毕的事件，然后只在一个地方加载数据，加载完后触发数据事件就ok了。
		-note 在触发了数据事件之后再绑定事件时，会立即执行回调函数，
			所以始终会触发回调的。
		-eg
			var DataObserver = require('air/event/dataObserver');
			//绑定数据事件
			DataObserver.on('feed-load', function (data1, data2) {
				//todo
			});
			//触发数据事件
			DataObserver.emit('feed-load', data1, data2);
	*/
	var DataObserver = {
		_EVENTS_: {}, //事件池
		//数据池，被调用过的事件类型才会有数据
		//所以根据这个判断数据是否已经准备好
		_DATA_: {},
		/*--
			绑定数据事件
			-p string type 事件类型
			-p function handler 事件处理函数
		*/
		on: function (type, handler) {
			(this._EVENTS_[type] || (this._EVENTS_[type] = [])).push(handler);
			if (this._DATA_.hasOwnProperty(type)) {
				handler.apply(null, this._DATA_[type]);
			}
			return this;
		},
		/*--
			解绑事件
			-p string type 事件类型
		*/
		off: function (type) {
			this._EVENTS_[type] = null;
			delete this._DATA_[type];
			return this;
		},
		/*--
			触发事件
			-p string type 事件类型
			-note 要传递事件数据时，将数据依次列在type后面
		*/
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
