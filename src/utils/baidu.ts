if (!import.meta.env.DEV) {
  const _hmt = []
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
    shouldTrackUrlChange(newPath: any, oldPath: any) {
      return newPath && oldPath
    },
  }]);
  (function () {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?2a912e96951b5799f9dac64386f0009d'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode?.insertBefore(hm, s)
  })()
}

export {}
