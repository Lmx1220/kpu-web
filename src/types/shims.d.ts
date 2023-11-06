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
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}
