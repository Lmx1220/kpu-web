function getVariableName(title: string) {
  function strToHex(str: string) {
    const result: string[] = []
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16)
      result.push((`000${hex}`).slice(-4))
    }
    return result.join('').toUpperCase()
  }

  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
