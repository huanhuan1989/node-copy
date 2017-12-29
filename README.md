# node-copy
node copy

个人使用

## node-安装
```javascript

npm install no-copy

```
## 使用方法

```javascript
//引入文件
const Copy = require('no-copy')

/**
 * 实例化对象
 * @param {String}  entry   原始路径
 * @param {String}  entry   输出路径
 * @param {Number}  except  排除文件或文件夹 - 可无 默认为：['.idea', '.vscode', '.gitignore', 'node_modules', '.map']
 * @param {Object}  copy    需要copy的文件/文件夹(可写正则), 无 - 整个文件夹
 * 
 */
new Copy({
	entry: './output',
  dist: './online',
	except:['.js.map', '.css.map'], 
	copy: [
		{
			from: 'static/**'
		}
	]
})
```

| 参数| 说明  |
| --- |-------------:|
| entry | 文件原始目录 |
| dist | 输出目录 |
| copy | 需要拷贝的文件夹或是文件/没有则视为copy整个文件夹 |


>copy属性可用，可不用，其中参数为

| copy参数| 说明  |
| --- |-------------:|
| from | 文件原始目录 |
| to | 输出目录 |