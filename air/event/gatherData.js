	/*--
		收集数据，然后执行回调。
		使用场景：一个模块里需要加载多个接口的数据，并且要等所有数据都加载完成后
			才能执行模块的功能。
		-p str dataNames 要加载的数据名称的列表，数据名称之间以逗号分隔，
			例如'template, data'。（这种格式可直接复制作为回调函数的形参~）
		-p fn callback 所有数据加载完成后的回调，回调参数就是dataNames指定的列表。
		-r object 一个具有emit方法的对象
		-eg
			var gatherData = require('air/event/gatherData');
			//绑定数据事件
			var gather = gatherData('data1, data2', function (data1, data2) {
				console.log('all datas are ready!', data1, data2);
			});
			$.get('/data1api', function (data) {
				//加载到数据后出发对应的事件
				gather.emit('data1', data);
			});
			$.get('/data2api', function (data) {
				gather.emit('data2', data);
			});
	*/
	function gatherData(dataNames, callback) {
		dataNames = dataNames.replace(/ /g, '').split(',');
		
		var i = 0,
			len = dataNames.length,
			datas = new Array(len),
			name2index = {};
		for (; i<len; i++) {
			~function (n) {
				name2index[dataNames[n]] = n;
			}(i);
		}

		i = 0;
		return {
			emit: function (dataName, data) {
				var j = name2index[dataName];
				if (typeof j==='number') {
					name2index[dataName] = null;
					datas[j] = data;
					if (++i===len) {
						callback.apply(null, datas);
						dataNames = callback = datas = null;
					}
				}
			}
		};
	}

	module.exports = gatherData;
