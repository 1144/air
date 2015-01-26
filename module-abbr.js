
//模块简称与全称（模块绝对路径）的映射
module.exports = {
	//array
	'each': 'air/array/each',
	'mess': 'air/array/mess',
	'unique': 'air/array/unique',
	'uniqueEach': 'air/array/uniqueEach',
	'uniquePush': 'air/array/uniquePush',
	'uniqueUnshift': 'air/array/uniqueUnshift',
	
	//event
	'broadcast': 'air/event/broadcast',
	'dataObserver': 'air/event/dataObserver',
	'givee': 'air/event/givee',

	//只有node.js能用的
	'cleardir': 'air/node/cleardir',
	'mkdir': 'air/node/mkdir',

	//string
	'byteLength': 'air/string/byteLength',
	'clip': 'air/string/clip',
	'decodeHTML': 'air/string/decodeHTML',
	'encodeHTML': 'air/string/encodeHTML',
	'repeat': 'air/string/repeat',
	'thousand': 'air/string/thousand',

	//ui
	'popLayer': 'air/ui/popLayer',

	//util
	'cookie': 'air/util/cookie',
	'formatDuration': 'air/util/formatDuration',
	'promise': 'air/util/promise',
	'textarea': 'air/util/textarea',
	'url': 'air/util/url'
};
