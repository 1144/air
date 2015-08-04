	var css = ''+
		'.air-dialog {width:400px; height:182px; padding:8px; position:fixed; top:0; left:0; display:none}' +
		'.air-dialog .pop_mask {width:416px; height:198px; position:absolute; top:0; left:0; background:#000; opacity:0.1; filter:alpha(opacity=10);/**IE**/ border-radius:3px; box-shadow:0 0 5px #395680}' + //; _width:expression(this.parentNode.scrollWidth+"px");_height:expression(this.parentNode.scrollHeight+"px")
		'.air-dialog .pop_box {width:400px; height:182px; position:absolute; overflow:hidden}' +
		'.air-dialog .pop_head {font-size:12px; line-height:30px; color:#fff; background:#2B83C1}' +
		'.air-dialog .pop_head_tit {height:30px; padding-left:12px; border:none; overflow:hidden}' +
		'.air-dialog .pop_head_close {float:right; width:30px; cursor:pointer; text-align:center}' +
		'.air-dialog .pop_body {background:#fff; overflow:hidden}' +
		'.air-dialog .pop_cont {height:64px; padding:20px 25px; font-size:14px; color:#000}' +
		'.air-dialog .pop_btns {text-align:center}' +
		'.air-dialog .pop_btns input {height:28px; margin:0 20px 20px; background:url(http://i3.letvimg.com/css/201208/13/usebg.png) no-repeat; padding:0 20px; border:1px solid #d6d6d6; background-position:0 -235px; color:#969696; border-radius:2px; cursor:pointer}'+
		'.air-dialog .pop_btns input:hover {box-shadow:1px 1px 3px #ccc}';
	require('air/dom/insertCSS')(css); //将样式插入到页面

	var alertHTML = '<div class="air-dialog">'+
		'<div class="pop_mask"></div>'+
		'<div class="pop_box">'+
			'<div class="pop_head j-dragbar">'+
				'<div class="pop_head_close j-close">×</div>'+
				'<div class="pop_head_tit">{title}</div>'+
			'</div>'+
			'<div class="pop_body">'+
				'<div class="pop_cont j-content">{content}</div>'+
				'<div class="pop_btns j-btns">'+
					'<input class="j-yes" type="button" value="{textYes}" />'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	var confirmHTML = '<div class="air-dialog">'+
		'<div class="pop_mask"></div>'+
		'<div class="pop_box">'+
			'<div class="pop_head j-dragbar">'+
				'<div class="pop_head_close j-close">×</div>'+
				'<div class="pop_head_tit">{title}</div>'+
			'</div>'+
			'<div class="pop_body">'+
				'<div class="pop_cont j-content">{content}</div>'+
				'<div class="pop_btns j-btns">'+
					'<input class="j-yes" type="button" value="{textYes}" />'+
					'<input class="j-no" type="button" value="{textNo}" />'+
				'</div>'+
			'</div>'+
		'</div>'+
	'</div>';

	var simpleReplace = function (template, data) {
		data || (data = {});
		return template.replace(/{(\w+)}/g, function ($0, $1) {
			return data[$1] || (data[$1]===0 ? '0' : '');
		});
	};

	var Overlay = require('./overlay');

	/*--
		对话框，代替浏览器自带的alert和confirm
		-note 底层调用Overlay，具有Overlay的所有配置选项。
		-rel [0, Overlay] 弹出层类
	*/
	var Dialog = {};

	/*--
		alert对话框
		-p object||string opt 调用配置，具体选项请参考Overlay类。当然可以直接传提示文案，那么其他所有选项就是使用默认选项。
		-eg
			var Dialog = require('air/ui/dialog');
			Dialog.alert('操作成功');

			//或者
			Dialog.alert({
				content: '操作成功',
				//点击确定按钮时回调
				onYes: function () {
					console.log('yes');
				},
				//点击右上角关闭按钮时回调
				onClose: function () {
					console.log('close');
				},
				textYes: '朕知道了'
			});
	*/
	Dialog.alert = function (opt) {
		typeof opt==='string' && (opt = {content: opt});
		var settings = {
			draggable: true,
			title: '提示',
			content: '内容',
			textYes: '确定'
		};
		for (var k in opt) {
			settings[k] = opt[k];
		}
		settings.html = simpleReplace(alertHTML, settings);
		settings.events = {
			'click .j-close': function () {
				this.close();
				opt.onClose && opt.onClose.call(this);
			},
			'click .j-yes': function () {
				this.close();
				opt.onYes && opt.onYes.call(this);
			}
		};
		
		return new Overlay(settings);
	};

	/*--
		confirm对话框
		-p object||string opt 调用配置，具体选项请参考Overlay类。当然可以直接传提示文案，那么其他所有选项就是使用默认选项。
		-eg
			var Dialog = require('air/ui/dialog');
			Dialog.confirm({
				//fixed: false,
				//underlay: true,
				//autoClose: 5000,
				//mask: false,
				content: '您确定一定以及肯定要这么干吗？',
				//点击确定按钮时回调
				onYes: function () {
					console.log('yes');
				},
				//点击取消按钮时回调
				onNo: function () {
					console.log('no');
				},
				//点击右上角关闭按钮时回调
				onClose: function () {
					console.log('close');
				},
				textYes: '同意',
				textNo: '不同意'
			});
	*/
	Dialog.confirm = function (opt) {
		typeof opt==='string' && (opt = {content: opt});
		var settings = {
			//draggable: true,
			title: '提示',
			content: '内容',
			textYes: '确定',
			textNo: '取消'
		};
		for (var k in opt) {
			settings[k] = opt[k];
		}
		settings.html = simpleReplace(confirmHTML, settings);
		settings.events = {
			'click .j-close': function () {
				this.close();
				opt.onClose && opt.onClose.call(this);
			},
			'click .j-yes': function () {
				this.close();
				opt.onYes && opt.onYes.call(this);
			},
			'click .j-no': function () {
				this.close();
				opt.onNo && opt.onNo.call(this);
			}
		};
		
		return new Overlay(settings);
	};
	
	module.exports = Dialog;
