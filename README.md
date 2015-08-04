# 轻量级、模块化的JS组件库 (函数库)

致力于打造轻量级、模块化的JS组件库，浏览器端和node服务端都可以使用的组件库。墙裂欢迎大家分享自己的组件，享用别人的组件！

## 组件API文档

请移步到：[http://mokjs.sinaapp.com/air-api](http://mokjs.sinaapp.com/air-api)

## 在node服务端使用

通过npm命令安装air：`npm install air-js`

只有一个API：__air.use__(moduleId) - 引用模块，moduleId为模块简称或全称（也即模块路径），简称与全称的对应关系请看 module-abbr.js 文件。

使用示例：
```javascript
	var air = require('air-js');
	var byteLength = air.use('byteLength'); //使用模块简称引用模块
	console.log(byteLength('中国人')); //输出：6

	console.log(air.use('air/string/byteLength')('中国人民')); //使用模块全称引用模块

	console.log(air.use('thousandFloat')(78934.25)); //输出：78,934.25
```

## 在浏览器端使用

首先，把air文件夹（即air的源代码）拷贝到你的项目目录下。

其次，由于air的模块化遵循CommonJS模块化规范，所以在浏览器端使用时，需要你的开发工具对模块进行简单的封装。

封装方法，在文件头加 `define(function (require, exports, module) {` ，在文件尾加 `});` 即可。

__自动封装全部组件：进入当前目录，执行命令 `node wrap-define 目标位置` ，目标位置指明封装后把文件放到哪里。__

最后，不知道你们怎么加载模块，是不是还得配置模块根路径啥的？

在这里，墙裂推荐你使用 [mokjs](http://mokjs.com/) 解决JS的模块化问题。如果使用mokjs，把air拷贝到你的项目目录下，你就可以愉快地使用air了！

```javascript
	var byteLength = require('air/string/byteLength');
	console.log(byteLength('中国人')); //输出：6
```

## 开发和测试air组件

air的开发和测试使用 [mokjs](http://mokjs.com/) 开发框架，在浏览器里运行测试用例前，需要打开mokjs的配置文件进行项目配置和路由配置。

在配置变量`projects`里添加以下配置：
```javascript
	'test-air': {
		path: 'D:/1144/air/',	//air项目根路径
		modular_spec: 'CommonJS'
	},
	'test-air-html': {
		type: 'html',
		path: 'D:/1144/air/test/',	//测试代码路径
		data: {
			root: 'http://test-air.cn/'
		}
	},
```

在配置变量`routes`里添加以下配置：
```javascript
	'test-air.cn': [
		{
			regexp: /^\/air\/.+?\.js$/,
			project: 'test-air',
			format: function (match) {
				return '..' + match[0];
			}
		}, {
			regexp: /^.+?\.html/,
			project: 'test-air-html'
		}, {
			regexp: /.*/,
			root: projects['test-air'].path
		}
	]
```

最后绑上host `127.0.0.1 test-air.cn` ，即可访问类似 ` http://test-air.cn/util/url.html?arg=1 ` 这样的测试地址进行查看了。

测试用例的编写请参照 `test/util/url.html`。

## 生成组件API文档

API文档采用 [mokdoc](https://github.com/1144/mokdoc) 工具生成。

需要安装mokdoc：`npm install mokdoc`

修改下面的配置并运行代码即可生成文档：
```javascript
	var mokdoc = require('mokdoc');

	mokdoc.config.set('air', {
		path: 'D:/1144/air/air/',	//源代码路径
		doc_path: 'D:/mokjs/air-api/'	//文档数据保存到哪里（要放到文档展示包里）
	});

	mokdoc.start('air', function(){
		console.log('done!');
	});
```

## 版本发布记录

请看 [CHANGELOG.md](https://github.com/1144/air/blob/master/CHANGELOG.md)
