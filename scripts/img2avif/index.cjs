const ImageToAvifConverter = require('./lib.cjs')

// 修正为相对于项目根目录的路径
const content = './src/assets/images' // 或者 'src/assets/images'

const converter = new ImageToAvifConverter(content, {
    keepOriginal: false,
    quality: 80,
    recursive: true,
})

converter.convert().catch(console.error)
