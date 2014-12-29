# 轻量级、模块化的JS组件库 (工具函数库)

致力于打造轻量级、模块化的JavaScript组件库，浏览器端和node服务端都可以使用的组件库。墙裂欢迎大家分享自己的组件，享用别人的组件！

## 在node服务端使用

通过npm命令安装air：`npm install air-js`

使用示例：
```javascript
	var air = require('air-js');
	var byteLength = air.use('byteLength'); //使用模块简称引用模块
	console.log(byteLength('中国人')); //输出：6

	console.log(air.use('air/string/byteLength')('中国人民')); //使用模块全称引用模块

	console.log(air.use('thousand')(78934.25)); //输出：78,934.25
```

## 在浏览器端使用

首先，把air文件夹（即air的源代码）拷贝到你的项目目录下。

其次，由于air的模块化遵循CommonJS模块化规范，所以在浏览器端使用时，需要你的开发工具对模块进行简单的封装，或者手动进行封装。

封装方法，在文件头加 `define(function(require, exports, module){` ，在文件尾加 `});` 即可。

最后，不知道你们怎么加载模块，是不是还得配置模块根路径啥的？

其实，墙裂推荐你使用 [mokjs](http://mokjs.com/) 解决JS的模块化问题。如果使用mokjs，把air拷贝到你的项目目录下，你就可以愉快地使用air了！

```javascript
	var byteLength = require('air/string/byteLength');
	console.log(byteLength('中国人')); //输出：6
```

## 开发和测试air组件

air的开发和测试使用 [mokjs](http://mokjs.com/) 开发框架。

mokjs项目配置：
```javascript
	'test-air': {
		path: 'D:/1144/air/',	//air项目根路径
		modular_spec: 'Modules'
	},
	'test-air-html': {
		type: 'html',
		path: 'D:/1144/air/test/',	//测试代码路径
		data: {
			root: '//test-air.cn/'
		}
	},
```
mokjs路由配置：
```javascript
	'test-air.cn': [
		{
			regexp: /^\/air\/.+?\.js$/,
			project: 'test-air',
			format: function(match){
				return '..' + match[0];
			}
		}, {
			regexp: /^.+?\.html/,
			project: 'test-air-html'
		}, {
			regexp: /.*/,
			locate: function(match){
				return projects['test-air-html'].path + match[0];
			}
		}
	]
```

最后配置host `127.0.0.1 test-air.cn`，即可访问类似 ` http://test-air.cn/util/url.html?arg=1 ` 这样的测试地址进行查看了。

测试用例的编写请参照 `test/util/url.html`。

## 版本发布记录

请看 [CHANGELOG.md](https://github.com/1144/air/blob/master/CHANGELOG.md)
