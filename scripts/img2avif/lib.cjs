const fs = require('node:fs').promises
const path = require('node:path')
const sharp = require('sharp')

/**
 * 图片转 AVIF 工具类
 * 遍历 src 目录下所有 png/jpg/jpeg 文件，转换为 avif 格式
 */
class ImageToAvifConverter {
    /**
     * @param {string} srcDir 源目录路径（必须存在）
     * @param {Object} options 配置项
     * @param {boolean} options.keepOriginal 是否保留原文件（默认 false，即转换后删除原文件）
     * @param {number} options.quality AVIF 质量参数 0-100（默认 80）
     * @param {boolean} options.recursive 是否递归子目录（默认 true）
     */
    constructor(srcDir, options = {}) {
        this.srcDir = path.resolve(srcDir)
        this.keepOriginal = options.keepOriginal ?? false
        this.quality = options.quality ?? 80
        this.recursive = options.recursive ?? true
        this.supportedExt = ['.png', '.jpg', '.jpeg']
    }

    /**
     * 执行转换
     */
    async convert() {
        try {
            // 检查源目录是否存在
            await fs.access(this.srcDir)
        } catch {
            throw new Error(`源目录不存在: ${this.srcDir}`)
        }

        const files = await this._getImageFiles(this.srcDir)
        console.log(`找到 ${files.length} 个图片文件`)

        for (const file of files) {
            await this._convertFile(file)
        }

        console.log('转换完成')
    }

    /**
     * 递归获取所有图片文件
     * @param {string} dir 当前目录
     * @returns {Promise<string[]>} 文件绝对路径数组
     */
    async _getImageFiles(dir) {
        let results = []
        const entries = await fs.readdir(dir, { withFileTypes: true })

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory() && this.recursive) {
                results = results.concat(await this._getImageFiles(fullPath))
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase()
                if (this.supportedExt.includes(ext)) {
                    results.push(fullPath)
                }
            }
        }
        return results
    }

    /**
     * 转换单个文件
     * @param {string} filePath 原文件路径
     */
    async _convertFile(filePath) {
        const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.avif')
        try {
            await sharp(filePath).avif({ quality: this.quality }).toFile(outputPath)

            console.log(`✓ 已转换: ${path.basename(filePath)} → ${path.basename(outputPath)}`)

            if (!this.keepOriginal) {
                await fs.unlink(filePath)
                console.log(`  已删除原文件: ${path.basename(filePath)}`)
            }
        } catch (err) {
            console.error(`✗ 转换失败: ${filePath}`, err.message)
        }
    }
}

module.exports = ImageToAvifConverter
