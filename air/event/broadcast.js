	var givee = require('./givee');
	/*--
		事件广播/事件通知。进行各种全局事件的监听、广播。
		-note 具有事件对象EventEmitter的所有方法。
		-rel [0, EventEmitter] 自定义事件
		-eg
			var Broadcast = require('air/event/broadcast');
			Broadcast.on('user-login', function () {
				//todo
			});
	*/
	var Broadcast = givee({});

	module.exports = Broadcast;
