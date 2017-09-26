const path = require('path')
const Base = require('./base')
const config = require('./config')

/**
 * Copy  copy方法
 */
class Copy extends Base{
	constructor (opts){
		super(opts)
		this.opts = opts
		this.entryPath = path.resolve(__dirname, opts.entry)
		this.distPath = path.resolve(__dirname, opts.dist)
		this.copyPath = super.normalize(opts.copy, config.defaultCopyParam) 
		this.init()
	}

	init () {
		const self = this
		super.createDirSync(self.distPath)
		self.copyPath
		.map(self.normalizeOpts.bind(self))
		.reduce((prev, current) => {
			self.createNormalizeDir(current)
				.copyNormalizeFile(current)
			return current
		}, {})
	}

	/**
	 * normalizeOpts  序列化opts对象
	 * @param {Object} el 
	 */
	normalizeOpts (el) {
		const entryCopyPath = `${this.entryPath}/${el.from}`
		const distCopyPath = `${this.distPath}/${el.to}`
		return Object.assign({}, {
			entry: entryCopyPath, 
			dist: distCopyPath
		}, el)
	}
	
	/**
	 * investigationCreateDir 获取当前目录
	 * @param {Object} prev 上一次保存的目录路径
	 * @param {Object} item 当前对象
	 */
	getNowCreateDirPaths (prev, item) {
		let entryPath = `${this.entryPath}/${item.name}`
		let distPath = `${this.distPath}/${item.name}`
		
		if(item.key !== 0) {
			entryPath = `${prev[item.key - 1].entry}/${item.name}`
			distPath = `${prev[item.key - 1].dist}/${item.name}`
		}
		return {
			entryPath,
			distPath
		}
	}
	/**
	 * investigationCreateDir  获取需要创建的文件夹
	 * @param {Object} item 当前对象
	 */
	investigationCreateDir (item) {
		const self = this
		const createDirArr = item.create.split('/')
		return createDirArr
			.map((el, index) => ({name: el, key: index}))
			.filter(el => (el.name != '' || el.name))
			.reduce((prev, current)=>{
				const {entryPath, distPath} = self.getNowCreateDirPaths(prev, current)
				super.createDirSync(distPath)
				prev[current.key] = Object.assign({}, {
					name: current.name,
					entry: entryPath,
					dist: distPath
				})
				return prev
			}, [])
	}

	/**
	 * getFullPath
	 * @param {String} path  
	 */
	getFullPath (path) {
		return `${this.entryPath}/${path}`
	}

	/**
	 * isArrIncludes 判断排除文件是否存在
	 * @param {String} str 路径
	 * @param {String} type 类型
	 */
	isArrIncludes (str, type = 'file') {
		const result = true
		const fileName = type === 'file' ? str.match(/\.(\w+)/) : super.getFilesName(str)
		if(fileName) {
			const lastName = type === 'file'? fileName[0] : fileName
			return super.includes(lastName, this.opts.except)
		}
		return result
	}

	/**
	 * createNormalizeDir  复制文件夹
	 * @param {Object} item 当前对象
	 */
	createNormalizeDir (item) {
		const self = this
		const fullPath = this.getFullPath(item.to)
		const dirArr = super.getDir(this.entryPath, this.distPath, fullPath)
		dirArr
			.filter(el => {
				/**
				 * 判断是否存在于super.includes，存在则不返回
				 * 例如：node_modules
				 */
				const isArrIncludes = self.isArrIncludes(el, 'dir')
				if(!isArrIncludes) {
					return el
				}
			})
			.map(el => super.createDirSync(el))
		return this
	}

	/**
	 * copyNormalizeFile 复制文件
	 * @param {Object} item 当前对象
	 */
	copyNormalizeFile (item) {
		const self = this
		const fullPath = this.getFullPath(item.from)
		const filesArr = super.getFiles(this.entryPath, this.distPath, fullPath)
		filesArr
			.filter(el => {
				const isArrIncludes = self.isArrIncludes(el.dist)
				if(!isArrIncludes) {
					return el
				}
			})
			.map(el => (self.copyFile(el.src, el.dist)))
	}

	/**
	 * copyFile  复制文件方法
	 * @param {String} entry 原始路径
	 * @param {String} dist  输出路径
	 */
	async copyFile (entry, dist) {
		/* const isEntryExists = super.isExistsSync(entry)
		const isDistExists = super.isExistsSync(dist)
		if (!isEntryExists || isDistExists) {
			return this
		} */
		const content = await this.getFilesContent(entry)
		this.writeFileSync(dist, content)
	}
}

module.exports = Copy