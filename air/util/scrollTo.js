	/*--
		滚动页面到指定节点处或指定像素位置处
		-p jQuery|string pos jQuery对象，或节点选择器，或指定的像素位置
		-p number [offsetY] 修正纵向的偏移量，pos为非像素位置时有效
		-eg
			var scrollTo = require('air/util/scrollTo');
			scrollTo($('.Comment'));
			//或
			scrollTo('.Comment');
	*/
	function scrollTo(pos, offsetY) {
		var x = typeof pox;
		if (x==='number') {
			x = pos;
		} else {
			x==='string' && (pos = $(pos));
			if (!pos.length) {return}
			x = pos.offset().top + (offsetY || 0);
		}

		$(document.documentElement).animate({'scrollTop': x}, 'normal');
		$(document.body).animate({'scrollTop': x}, 'normal');
	}
	
	module.exports = scrollTo;
