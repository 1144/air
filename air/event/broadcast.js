
	var givee = require('air/event/givee');
	/*--
		全局事件/事件电台/事件广播（进行各种事件广播）
		-eg
			var Broadcast = require('air/event/broadcast');
			Broadcast.on('xxx', function(){
				;
			});
	*/
	var Broadcast = givee({});

	module.exports = Broadcast;
