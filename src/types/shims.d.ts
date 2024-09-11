declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare module '*.vue' {

  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare const __SYSTEM_INFO__: {
  pkg: {
    version: Recordable<string>
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}

declare module 'virtual:app-loading' {
  const loadingFadeOut: () => void
  export {
    loadingFadeOut,
  }
}

declare module 'vue-esign'
declare module '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'
