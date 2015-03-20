
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
	'mousewheel': 'air/event/mousewheel',

	//dom
	'contains': 'air/dom/contains',

	//io
	'cacheJSONP': 'air/io/cacheJSONP',
	'iframeCrossRequest': 'air/io/iframeCrossRequest',
	'iframeRequest': 'air/io/iframeRequest',

	//lang
	'extend': 'air/lang/extend',

	//node 只有node.js能用的
	'cleardir': 'air/node/cleardir',
	'mkdir': 'air/node/mkdir',

	//number
	'thousand': 'air/number/shorten',
	'thousand': 'air/number/thousand',
	'thousand': 'air/number/thousandFloat',

	//string
	'byteLength': 'air/string/byteLength',
	'clip': 'air/string/clip',
	'decodeHTML': 'air/string/decodeHTML',
	'encodeHTML': 'air/string/encodeHTML',
	'MJSO': 'air/string/MJSO',
	'parseJSON': 'air/string/parseJSON',
	'repeat': 'air/string/repeat',
	'stringifyJSON': 'air/string/stringifyJSON',

	//ui
	'popLayer': 'air/ui/popLayer',
	'yDragBar': 'air/ui/yDragBar',

	//util
	'cookie': 'air/util/cookie',
	'formatDuration': 'air/util/formatDuration',
	'formatVideoDuration': 'air/util/formatVideoDuration',
	'parseFormattedTime': 'air/util/parseFormattedTime',
	'promise': 'air/util/promise',
	'scrollEmitter': 'air/util/scrollEmitter',
	'scrollingLoader': 'air/util/scrollingLoader',
	'scrollTo': 'air/util/scrollTo',
	'textarea': 'air/util/textarea',
	'tpl': 'air/util/tpl',
	'url': 'air/util/url'
};
