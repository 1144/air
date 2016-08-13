	var isIE6 = require('air/env/isIE6');
	/*--
		遮罩层，页面整个生命周期只会有一个遮罩层
		-eg
			var mask = require('air/ui/mask');
			mask.show();
			mask.show(0.5); //以0.5的透明度显示
			mask.hide();
	*/
	var mask = {
		$layer: null,
		_zIndex: 8000,
		setZIndex: function (value) {
			this._zIndex = value;
			this.$layer.css('z-index', value);
			return this;
		},
		getZIndex: function () {
			return this._zIndex;
		},
		onClick: function (handler) {
			this._click = handler;
			return this;
		},
		show: function (opacity) {
			isIE6 && this.$layer.css('height', $(document).height());
			this.$layer.css('opacity', opacity || 0.2).show();
			return this;
		},
		hide: function () {
			this._click = null;
			this.$layer.hide();
		}
	};

	//$(function () {
		var $layer = $('<div style="display:none;'+
			'background:none repeat scroll 0 0 #000000;'+
			'width:100%;'+
			'height:100%;'+
			'position:'+(isIE6 ? 'absolute' : 'fixed')+'; top:0; left:0;'+
		'"></div>');

		$(document.body).prepend($layer);
		mask.$layer = $layer;
		$layer.on('click', function () {
			mask._click && mask._click();
		});
	//});
	

	module.exports = mask;
