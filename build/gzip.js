'use strict'

const { name } = require('../package.json')
const fs = require('fs-extra')
const compressing = require('compressing')

// 默认配置
const config = {
  input: './dist',
  output: '' || name,
  temp: 'gziptemp',
};

// // 检查文件是否存在于当前目录中
// try {
//   fs.accessSync(fromPath, fs.constants.F_OK)
// } catch (err) {
//   console.error('no such file or directory')
//   return
// }

async function main() {
  const { input, output, temp } = config
  try {
    await fs.copy(input, `./${temp}/${name}`)
    await compressing.tar.compressDir(`./${temp}/${name}`, `./${temp}/${name}.tar`)
    await compressing.gzip.compressFile(`./${temp}/${name}.tar`, `./${name}.tgz`)
    await fs.remove(`./${temp}`)
  } catch (err) {
    console.error(err)
  }
}

main()
