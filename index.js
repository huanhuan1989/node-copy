const Copy = require('./lib/index.js')
new Copy({
	entry: '../output', //原始路径
	dist: '../online', //输出路径
	except:['.idea', '.vscode'],   //排除文件或文件夹
	copy: [
		{
			from: 'static/**'
		}
	]
})
