/**
 * 应用初始化完成之后再进行页面加载渲染
 */
async function initApplication() {
  // name用于指定项目唯一标识
  // 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据

  // 启动应用并挂载
  // vue应用主要逻辑及视图
  const { bootstrap } = await import('./bootstrap')
  await bootstrap()
}

initApplication()
