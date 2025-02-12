import type {
  ColumnCompositionProps,
  CrudOptions,
  PageQuery,
  TransformResProps,
  UseCrudProps,
} from '@fast-crud/fast-crud'

import { findCodeByType, findEnumListByType } from '@/api/modules/common/general.ts'
import { uploadFile } from '@/api/modules/file/upload.ts'
import { isString } from '@/utils'
import dateUtil from '@/utils/dayjs'

import { FastCrud, FsButton, useColumns, useTypes } from '@fast-crud/fast-crud'
import {
  FsExtendsCopyable,
  FsExtendsEditor,
  FsExtendsInput,
  FsExtendsJson,
  FsExtendsTime,
  FsExtendsUploader,
} from '@fast-crud/fast-extends'
import UiElement from '@fast-crud/ui-element'
import { ElNotification, ElPopconfirm } from 'element-plus'
import '@fast-crud/fast-crud/dist/style.css'
import '@fast-crud/fast-extends/dist/style.css'
import '@fast-crud/ui-element/dist/style.css'

export function transformQuery(query: PageQuery) {
  const { page, form, sort } = query
  const pageParams = {
    current: page?.currentPage ?? 1,
    size: page?.pageSize ?? 20,
  }
  const sortParams = {
    sort: sort?.prop || undefined,
    order: sort?.order || undefined,
  }
  const extra = form.extra
  delete form?.extra
  return {
    model: form,
    ...pageParams,
    ...sortParams,
    extra,
  }
}
export function transformRes(originPageRes: TransformResProps) {
  const { res } = originPageRes
  return {
    currentPage: Number(res.current),
    pageSize: Number(res.size),
    total: Number(res.total),
    records: res.records,
  }
}

function install(app: any, options: any = {}) {
  app.use(UiElement)
  // setLogger({ level: 'debug' })
  app.use(FastCrud, {
    logger: {
      off: {
        tableColumns: false,
      },
    },
    i18n: options.i18n,
    async dictRequest({ dict }: { dict: any }) {
      const custom = dict.custom
      let params: any = {}
      let isEnum = true
      if (isString(custom)) {
        params = {
          type: custom,
          extendFirst: true,
        }
      }
      else {
        params = custom
        isEnum = params?.isEnum
      }
      return isEnum
        ? ((await findEnumListByType(params)) as any as Promise<any>)
        : ((await findCodeByType(params)) as any as Promise<any>)
    },
    /**
     * useCrud时会被执行
     * @param props
     */
    commonOptions(props: UseCrudProps): CrudOptions {
      const crudBinding: any = props.crudExpose?.crudBinding
      return {
        toolbar: {
          compact: false,
          buttons: {
            compact: {
              show: false,
            },
          },
        },
        search: {
          buttons: {
            search: {
              style: 'marginLeft:-2px',
            },
          },
        },
        container: {
          is: 'fs-layout-card',
        },
        rowHandle: {
          width: 180,
          align: 'left',
          fixed: 'right',
          buttons: {
            view: {
              order: 1,
              // size: 'small',
              link: true,
              // icon: undefined,
            },
            edit: {
              order: 2,
              // size: 'small',
              link: true,
              // icon: undefined,
            },
            remove: {
              order: 3,
              // size: 'small',
              link: true,
              // icon: '',
              render(context: any) {
                function del() {
                  const { row, index } = context
                  crudBinding.doRemove({
                    row,
                    index,
                  }, {
                    noConfirm: true,
                  })
                }
                return (
                  <ElPopconfirm iconColor="red" onConfirm={del} title="确认删除吗？">
                    {{
                      reference: () => (
                        <FsButton
                          className="ant-btn-sm"
                          danger={false}
                          link
                        >
                          删除
                        </FsButton>
                      ),
                    }}
                  </ElPopconfirm>
                )
              },
            },
            // copy: {
            //   show: true,
            //   text: Yn('common.title.copy'),
            //   dropdown: true,
            // },
          },
          dropdown: {
            more: {
              // type: 'link',
              link: true,
            },
          },
        },
        table: {
          // size: 'small',
          scroll: {
            fixed: false,
          },
          pagination: false,
          onResizeColumn: (w: number, col: any) => {
            if (crudBinding.value?.table?.columnsMap && crudBinding.value?.table?.columnsMap[col.key]) {
              crudBinding.value.table.columnsMap[col.key].width = w
            }
          },
        },
        request: {
          transformQuery,
          transformRes,
        },
        form: {
          display: 'flex',
          labelWidth: '120px',
          wrapper: {
            is: 'el-drawer',
            maskClosable: false,
            saveRemind: true,
            size: '960px',
          },
          async afterSubmit({ mode }) {
            if (mode === 'add') {
              ElNotification.success({ message: '添加成功' })
            }
            else if (mode === 'edit') {
              ElNotification.success({ message: '保存成功' })
            }
          },
          wrapperCol: {
            span: null,
          },
          labelCol: {
            span: null,
            style: {
              minWidth: '110px',
            },
          },
          layout: () => 'horizontal',
        },
      }
    },
  })

  // fast-extends里面的扩展组件均为异步组件，只有在使用时才会被加载，并不会影响首页加载速度
  // 安装uploader 公共参数
  app.use(FsExtendsUploader, {
    defaultType: 'form',
    form: {
      keepName: true,
      name: 'file',
      withCredentials: false,
      uploadRequest: async ({ file, onProgress }: any) => {
        return await uploadFile(file, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000,
          onUploadProgress: (progressEvent) => {
            onProgress({
              percent: Math.round(progressEvent.loaded / (progressEvent.total || 100) * 100),
            })
          },
        })
      },
      successHandle(ret: any) {
        // 上传完成后的结果处理， 此处应返回格式为{url:xxx,key:xxx}
        return {
          url: ret,
          key: ret,
        }
      },
    },
  })
  // 安装editor
  app.use(FsExtendsEditor, {
    // 编辑器的公共配置
    wangEditor5: {
      editorConfig: {
        MENU_CONF: {},
      },
      toolbarConfig: {},
    },
  })
  app.use(FsExtendsCopyable)
  app.use(FsExtendsJson)
  app.use(FsExtendsTime)
  app.use(FsExtendsInput)

  const { addTypes, getType } = useTypes()
  // 此处演示修改官方字段类型
  const textType = getType('dict-select')
  textType.column.component.color = 'auto' // 修改官方的字段类型，设置为文本变化就触发查询
  addTypes({
    'wp-readonly-time': {
      column: {
        width: 170,
        align: 'center',
      },
      addForm: {
        show: false,
      },
      editForm: {
        show: false,
      },
      valueBuilder({ value, row, key }: { value: any, row: Record<string, any>, key: string }) {
        value !== null && (row[key] = dateUtil(value))
      },
    },
  })
  // 自定义字段合并插件
  const { registerMergeColumnPlugin } = useColumns()
  // 默认宽度，支持自动拖动调整列宽
  registerMergeColumnPlugin({
    name: 'resize-column-plugin',
    order: 2,
    handle: (columnProps: ColumnCompositionProps, crudOptions: any) => {
      function fillWidth(columnProps: ColumnCompositionProps) {
        if (!columnProps.column) {
          columnProps.column = {}
        }
        if (crudOptions.table.tableVersion === 'v2') {
          if (!columnProps.column.width) {
            columnProps.column.width = 150
          }
        }
        if (columnProps.children && Object.keys(columnProps.children).length > 0) {
          for (const key in columnProps.children) {
            fillWidth(columnProps.children[key])
          }
        }
      }

      fillWidth(columnProps)

      return columnProps
    },
  })
}

export default {
  install,
}
