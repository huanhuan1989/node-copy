# node-copy
node copy

个人使用

## 使用方法

```javascript
//引入文件
const Copy = require('./lib/index.js')

//实例化对象
/**
 * 实例化对象
 */
new Copy({
	entry: '../output', //原始路径
	dist: '../online', //输出路径
	except:['.idea', '.vscode'],   //排除文件或文件夹， 可不写，默认为：['.idea', '.vscode', '.gitignore', 'node_modules', '.map']
	copy: [  // 如果是整个文件夹，可直接忽略
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
| copy | 需要拷贝的文件夹或是文件 |


>copy属性可用，可不用，其中参数为

| copy参数| 说明  |
| --- |-------------:|
| from | 文件原始目录 |
| to | 输出目录 |