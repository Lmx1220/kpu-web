/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
  // 登录 未授权。 客户端在访问请求的资源之前，对自己进行认证。，可以简单的理解为没有登录此站。
  // UNAUTHORIZED = 401,
  // 访问资源 被禁止。 资源不可用，服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致，可以简单的理解为没有权限访问此站。
  FORBIDDEN = 403,
  // 未能读取到有效Token
  NOT_TOKEN = 11011,
  // token 无效
  INVALID_TOKEN = 11012,
  // token 已过期
  TOKEN_TIMEOUT = 11013,
  // token 已被顶下线
  BE_REPLACED = 11014,
  // token 已被踢下线
  KICK_OUT = 11015,
  // 已被冻结
  NOT_VALUE_EXPIRE = 11016,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const HTTP_TAG_MAP = new Map([
  [RequestEnum.GET, 'success'],
  [RequestEnum.POST, 'processing'],
  [RequestEnum.PUT, 'warning'],
  [RequestEnum.DELETE, 'error'],
])

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
