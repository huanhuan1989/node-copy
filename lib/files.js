const fs = require('fs')
const promise = require('promise')
const config = require('./config')

/**
 * Files 
 */
class Files {
  constructor () {
    this.DEF_IMG_TYPE = config.DEF_IMG_TYPE
  }

  /**
   * isFile 同步判断是不是文件
   * @param {String} locationPath 路径
   */
  isFile (locationPath) {
    return fs.statSync(locationPath).isFile()
  }

  /**
   * isDir 同步判断是不是文件夹
   * @param {String} locationPath 路径
   */
  isDir (locationPath) {
    return fs.statSync(locationPath).isDirectory()
  }

  /**
   * isExists 异步判断此文件夹是否存在
   * @param {String} locationPath 路径
   */
  isExists (locationPath) {
    return new Promise((resolve, reject) => {
      return fs['exists'](locationPath, function (exists) {
        console.log(exists)
        return exists ? resolve(true) : resolve(false)
      })
    })
  }

  /**
   * isExistsSync 同步判断此文件夹是否存在
   * @param {String} locationPath 路径
   */
  isExistsSync (locationPath) {
    return fs.existsSync(locationPath)
  }

  /**
   * getSuffix  获取文件后缀
   * @param {String} locationPath 路径
   */
  getSuffix (locationPath) {
    if(locationPath.indexOf('.') != -1) {
      return locationPath.match(/\.(\w+)/)[1]
    }
    return ''
  }

  /**
   * getFileType 获取文件类型
   * @param {String} locationPath 路径
   */
  getFileType (locationPath) {
    const self = this
    const suffix = self.getSuffix(locationPath)
    let result = false
    self.DEF_IMG_TYPE
    .map(item => ({name: item}))
    .filter(item => {
      if(item.name === suffix){
        result = true
      }
      return item
    })

    return result
  }

  /**
   * createDirSync  同步创建文件夹
   * @param {String} distDirPath  输出路径
   */
  createDirSync (distDirPath) {
    const self = this
    const isExists = self.isExistsSync(distDirPath)
    if(isExists) {
      return isExists
    }
    fs.mkdirSync(distDirPath)
  }

  /**
   * createDir 异步创建文件夹
   * @param {String} distDirPath  输出路径
   */
  createDir (distDirPath) {
    const self = this
    return new Promise((resolve, reject) => {
      return self.isExists(distDirPath).then(data => {
        if (data) {
          resolve(true)
          return 'exists dir!'
        }
        return fs.mkdirSync(distDirPath, (err, mk) => {
          if (err) {
            reject(err)
            return 'creat err!'
          }
          resolve(true)
          return 'creat done!'
        })
      }, err => (console.log('----createDir方法-----', err)))
    })
  }

  /**
   * readFileSync 同步读取文件
   * @param {String} locationPath 路径
   */
  readFileSync (locationPath) {
    return fs.readFileSync(locationPath, "utf-8")
  }

  /**
   * writeFileSync 同步写文件
   * @param {String} distPath 路径
   * @param {String} content       内容
   */
  writeFileSync (distPath, content) {
   return fs.writeFileSync(distPath, content)
  }

  /**
   * writeFiles 异步写文件
   * @param {String} distPath 路径
   * @param {String} content       内容
   */
  writeFiles (distPath, content) {
    return new Promise((resolve, reject) => {
      return fs.writeFile(distPath, content, function (err, data) {
        if (err) {
          reject(false)
          return 'creat err!'
        }
        resolve(data)
        return data
      })
    })
  }

  /**
   * getFilesContent  异步获取文件内容
   * @param {String} distPath 路径
   */
  getFilesContent (distPath) {
    const type = this.getFileType(distPath)
    const bufferC = type ? '' : 'utf-8'
    return new Promise((resolve, reject) => {
      return fs.readFile(distPath, bufferC, function (err, data) {
        if (err) {
          reject(false)
          return 'creat err!'
        }
        resolve(data)
        return data
      })
    })
  }

  /**
   * readdir  以同步的方式读取文件目录
   * @param {String} locationPath 路径
   */
  readdirSync (localPath) {
    return fs.readdirSync(localPath)
  }
}

module.exports = Files