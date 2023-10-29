export enum ActionEnum {
  ADD = 'add',
  COPY = 'copy',
  DELETE = 'delete',
  EDIT = 'edit',
  VIEW = 'view',
}
export const VALIDATE_API: Record<string, any> = {
  [ActionEnum.ADD]: 'Save',
  [ActionEnum.EDIT]: 'Update',
  [ActionEnum.COPY]: 'Copy',
}
