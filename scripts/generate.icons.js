import path from 'node:path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import { lookupCollection, lookupCollections } from '@iconify/json'

async function generateIcons() {
  // 拿到全部图标集的原始数据
  const raw = await lookupCollections()

  // 默认必须安装的图标集
  const defaultCollectionID = ['ep']
  // 取出可使用的图标集数据用于 inquirer 选择，并按名称排序
  const collections = Object.entries(raw).map(([id, item]) => ({
    ...item,
    id,
  })).filter((item) => {
    return item.hidden !== true && !defaultCollectionID.includes(item.id)
  }).sort((a, b) => a.name.localeCompare(b.name))
  console.log(collections.map(item => `${item.name} : ${item.id}`))
  /**
     * 分别会在对应目录下生成以下文件，其中(1)(3)用于离线下载并安装图标，(2)用于图标选择器使用
     * (1) src/iconify/index.json    记录用户 inquirer 的交互信息
     * (2) src/iconify/data.json     包含多个图标集数据，仅记录图标名
     * (3) public/icons/*-raw.json   多个图标集的原始数据，独立存放，用于离线使用
     */
  inquirer.prompt([
    {
      type: 'checkbox',
      message: '请选择需要生成的图标集',
      name: 'collections',
      choices: collections.map(item => ({
        name: `${item.name} prefix:${item.id} (${item.total} icons)`,
        value: item.id,
      })),
    },
    {
      type: 'list',
      message: '图标集使用方式',
      name: 'useType',
      choices: [
        { name: '在线', value: 'online', default: true },
        { name: '离线 (本地)', value: 'offline' },
      ],
    },
  ]).then(async (answers) => {
    answers.collections.push(...defaultCollectionID)

    await fs.writeJSON(
      path.resolve(process.cwd(), 'src/iconify/index.json'),
      {
        collections: answers.collections,
        useType: answers.useType,
      },
    )

    const outputDir = path.resolve(process.cwd(), 'public/icons')
    await fs.ensureDir(outputDir)
    await fs.emptyDir(outputDir)

    const collectionsMeta = []
    for (const info of answers.collections) {
      const setData = await lookupCollection(info)

      collectionsMeta.push({
        prefix: setData.prefix,
        info: setData.info,
        icons: Object.keys(setData.icons),
      })

      const offlineFilePath = path.join(outputDir, `${info}-raw.json`)

      if (answers.useType === 'offline') {
        await fs.writeJSON(offlineFilePath, setData)
      }
    }

    await fs.writeJSON(
      path.resolve(process.cwd(), 'src/iconify/data.json'),
      collectionsMeta,
    )
  })
}

generateIcons()
