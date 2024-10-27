/**
 * 根据 watermark-dom 进行修改
 * https://github.com/saucxs/watermark-dom
 */

export interface settingsType {
  /** 水印总体的id */
  id?: string
  /** 小水印的id前缀 */
  prefix?: string
  /** 水印文案 */
  text?: string
  /** 水印起始位置x轴坐标 */
  x?: number
  /** 水印起始位置Y轴坐标 */
  y?: number
  /** 水印行数 */
  rows?: number
  /** 水印列数 */
  cols?: number
  /** 水印x轴间隔 */
  x_space?: number
  /** 水印y轴间隔 */
  y_space?: number
  /** 水印字体 */
  font?: string
  /** 水印字体颜色 */
  color?: string
  /** 水印字体大小 */
  fontsize?: string
  /** 水印透明度，要求设置在大于等于0.005 */
  alpha?: number
  /** 水印宽度 */
  width?: number
  /** 水印长度 */
  height?: number
  /** 水印倾斜度数 */
  angle?: number
  /** 水印的总体宽度（默认值：body的scrollWidth和clientWidth的较大值） */
  parent_width?: number
  /** 水印的总体高度（默认值：body的scrollHeight和clientHeight的较大值） */
  parent_height?: number
  /** 水印插件挂载的父元素element，不输入则默认挂在body上 */
  parent_node?: HTMLElement | null
  /** 是否监控，true: 不可删除水印; false: 可删水印 */
  monitor?: boolean
}

export default function wmFn() {
  const globalSetting: settingsType = {}
  const defaultSettings: Required<settingsType> = {
    id: 'wm_div_id',
    prefix: 'mask_div_id',
    text: '测试水印',
    x: 20,
    y: 20,
    rows: 0,
    cols: 0,
    x_space: 50,
    y_space: 50,
    font: '微软雅黑',
    color: 'black',
    fontsize: '18px',
    alpha: 0.15,
    width: 100,
    height: 100,
    angle: 15,
    parent_width: 0,
    parent_height: 0,
    parent_node: null,
    monitor: true,
  }
  let forceRemove = false
  const watermarkDom = new MutationObserver(domChangeCallback)

  // 加载水印
  function loadMark(settings: settingsType) {
    Object.assign(defaultSettings, settings)

    // 如果元素存在则移除
    const watermark_element = document.getElementById(defaultSettings.id)
    watermark_element?.parentNode?.removeChild(watermark_element)

    /* 如果设置水印挂载的父元素的id */
    const watermark_parent_element = defaultSettings.parent_node
    const watermark_hook_element = watermark_parent_element || document.body

    /* 获取页面宽度 */
    const page_width = Math.max(watermark_hook_element.scrollWidth, watermark_hook_element.clientWidth)
    /* 获取页面最大长度 */
    const page_height = Math.max(watermark_hook_element.scrollHeight, watermark_hook_element.clientHeight)

    let page_offsetTop = 0
    let page_offsetLeft = 0
    if (settings.parent_width || settings.parent_height) {
      /* 指定父元素同时指定了宽或高 */
      if (watermark_hook_element) {
        page_offsetTop = watermark_hook_element.offsetTop || 0
        page_offsetLeft = watermark_hook_element.offsetLeft || 0
        defaultSettings.x = defaultSettings.x + page_offsetLeft
        defaultSettings.y = defaultSettings.y + page_offsetTop
      }
    }
    else {
      if (watermark_hook_element) {
        page_offsetTop = watermark_hook_element.offsetTop || 0
        page_offsetLeft = watermark_hook_element.offsetLeft || 0
      }
    }

    /* 创建水印外壳div */
    let otdiv = document.getElementById(defaultSettings.id)
    let shadowRoot: ShadowRoot | HTMLElement | null = null

    if (!otdiv) {
      otdiv = document.createElement('div')
      /* 创建shadow dom */
      otdiv.id = defaultSettings.id
      otdiv.setAttribute('style', 'pointer-events: none !important; display: block !important')
      /* 判断浏览器是否支持attachShadow方法 */
      if (typeof otdiv.attachShadow === 'function') {
        /* createShadowRoot Deprecated. Not for use in new websites. Use attachShadow */
        shadowRoot = otdiv.attachShadow({ mode: 'open' })
      }
      else {
        shadowRoot = otdiv
      }
      /* 将shadow dom随机插入body内的任意位置 */
      const nodeList = watermark_hook_element.children
      const index = Math.floor(Math.random() * (nodeList.length - 1))
      if (nodeList[index]) {
        watermark_hook_element.insertBefore(otdiv, nodeList[index])
      }
      else {
        watermark_hook_element.appendChild(otdiv)
      }
    }
    else if (otdiv.shadowRoot) {
      shadowRoot = otdiv.shadowRoot
    }
    /* 三种情况下会重新计算水印列数和x方向水印间隔：1、水印列数设置为0，2、水印宽度大于页面宽度，3、水印宽度小于于页面宽度 */
    defaultSettings.cols = Math.floor((page_width - defaultSettings.x) / (defaultSettings.width + defaultSettings.x_space))
    const temp_watermark_x_space = Math.floor((page_width - defaultSettings.x - defaultSettings.width * defaultSettings.cols) / (defaultSettings.cols))
    defaultSettings.x_space = temp_watermark_x_space ? defaultSettings.x_space : temp_watermark_x_space
    let allWatermarkWidth

    /* 三种情况下会重新计算水印行数和y方向水印间隔：1、水印行数设置为0，2、水印长度大于页面长度，3、水印长度小于于页面长度 */
    defaultSettings.rows = Math.floor((page_height - defaultSettings.y) / (defaultSettings.height + defaultSettings.y_space))
    const temp_watermark_y_space = Math.floor((page_height - defaultSettings.y - defaultSettings.height * defaultSettings.rows) / (defaultSettings.rows))
    defaultSettings.y_space = temp_watermark_y_space ? defaultSettings.y_space : temp_watermark_y_space
    let allWatermarkHeight

    if (watermark_parent_element) {
      allWatermarkWidth = defaultSettings.x + defaultSettings.width * defaultSettings.cols + defaultSettings.x_space * (defaultSettings.cols - 1)
      allWatermarkHeight = defaultSettings.y + defaultSettings.height * defaultSettings.rows + defaultSettings.y_space * (defaultSettings.rows - 1)
    }
    else {
      allWatermarkWidth = page_offsetLeft + defaultSettings.x + defaultSettings.width * defaultSettings.cols + defaultSettings.x_space * (defaultSettings.cols - 1)
      allWatermarkHeight = page_offsetTop + defaultSettings.y + defaultSettings.height * defaultSettings.rows + defaultSettings.y_space * (defaultSettings.rows - 1)
    }

    let x
    let y
    for (let i = 0; i < defaultSettings.rows; i++) {
      if (watermark_parent_element) {
        y = page_offsetTop + defaultSettings.y + (defaultSettings.y_space + defaultSettings.height) * i
      }
      else {
        y = defaultSettings.y + (page_height - allWatermarkHeight) / 2 + (defaultSettings.y_space + defaultSettings.height) * i
      }
      for (let j = 0; j < defaultSettings.cols; j++) {
        if (watermark_parent_element) {
          x = page_offsetLeft + defaultSettings.x + (page_width - allWatermarkWidth) / 2 + (defaultSettings.width + defaultSettings.x_space) * j
        }
        else {
          x = defaultSettings.x + (page_width - allWatermarkWidth) / 2 + (defaultSettings.width + defaultSettings.x_space) * j
        }
        const mask_div = document.createElement('div')
        mask_div.innerHTML = defaultSettings.text.replace(/\n/g, '<br>')
        /* 设置水印相关属性start */
        mask_div.id = defaultSettings.prefix + i + j
        /* 设置水印div倾斜显示 */
        mask_div.style.transform = `rotate(-${defaultSettings.angle}deg)`
        mask_div.style.visibility = ''
        mask_div.style.position = 'absolute'
        /* 选不中 */
        mask_div.style.left = `${x}px`
        mask_div.style.top = `${y}px`
        mask_div.style.overflow = 'hidden'
        mask_div.style.zIndex = '9999999'
        mask_div.style.opacity = `${defaultSettings.alpha}`
        mask_div.style.fontSize = defaultSettings.fontsize
        mask_div.style.fontFamily = defaultSettings.font
        mask_div.style.color = defaultSettings.color
        mask_div.style.textAlign = 'center'
        mask_div.style.width = `${defaultSettings.width}px`
        mask_div.style.height = `${defaultSettings.height}px`
        mask_div.style.display = 'block'
        mask_div.style.userSelect = 'none'
        /* 设置水印相关属性end */
        shadowRoot?.appendChild(mask_div)
      }
    }

    if (defaultSettings.monitor) {
      const option = {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ['style'],
        attributeOldValue: true,
      }
      watermarkDom.observe(watermark_hook_element, option)
      watermarkDom.observe((document.getElementById(defaultSettings.id) as HTMLElement).shadowRoot as ShadowRoot, option)
    }
  }

  // 移除水印
  function removeMark() {
    const watermark_element = document.getElementById(defaultSettings.id) as HTMLElement
    watermark_element?.parentNode?.removeChild(watermark_element)
    watermarkDom.disconnect()
  }

  // 监听dom是否被移除或者改变属性的回调函数
  function domChangeCallback(records: any) {
    if (forceRemove) {
      forceRemove = false
      return
    }
    if (
      (globalSetting && records.length === 1)
      || (records.length === 1 && records[0].removedNodes.length >= 1)
    ) {
      loadMark(globalSetting)
    }
  }

  // 初始化水印
  const init = function (settings: settingsType) {
    Object.assign(globalSetting, settings)
    loadMark(settings)
  }

  // 手动移除水印
  const remove = function () {
    forceRemove = true
    removeMark()
  }

  return {
    init,
    remove,
  }
}
