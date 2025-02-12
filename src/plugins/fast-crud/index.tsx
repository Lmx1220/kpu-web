import type {
  ColumnCompositionProps,
  CrudOptions,
  PageQuery,
  TransformResProps,
  UseCrudProps,
} from '@fast-crud/fast-crud'

import { findCodeByType, findEnumListByType } from '@/api/modules/common/general.ts'
import { uploadFile } from '@/api/modules/file/upload.ts'
import { $t } from '@/locales'

import KpuIcon from '@/ui/components/KpuIcon/index.vue'
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
import UiAntdv from '@fast-crud/ui-antdv4'
import { notification, Popconfirm } from 'ant-design-vue'
import '@fast-crud/fast-crud/dist/style.css'
import '@fast-crud/fast-extends/dist/style.css'
import '@fast-crud/ui-antdv4/dist/style.css'

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
  app.use(UiAntdv)
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
              size: 'small',
              type: 'link',
              // icon: null,
            },
            edit: {
              order: 2,
              size: 'small',
              type: 'link',
              // icon: null,
            },
            remove: {
              order: 3,
              size: 'small',
              type: 'link',
              icon: '',
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
                  <Popconfirm onConfirm={del} placement="bottom" cancel-text="取消" ok-text="确认删除" title="确定要删除这条记录吗？">
                    {{
                      reference: () => (
                        <FsButton
                          className="ant-btn-sm"
                          danger={false}
                          type="link"
                        >
                          删除
                        </FsButton>
                      ),
                      icon: () => (
                        <KpuIcon name="i-ant-design:question-circle-outlined" className="c-red"></KpuIcon>
                      ),

                    }}
                  </Popconfirm>
                )
              },
            },
            copy: {
              show: true,
              text: $t('common.title.copy'),
              dropdown: true,
            },
          },
          dropdown: {
            more: {
              type: 'link',
            },
          },
        },
        table: {
          size: 'small',
          scroll: {
            fixed: true,
          },
          pagination: false,
          onResizeColumn: (w: number, col: any) => {
            if (crudBinding.value?.table?.columnsMap && crudBinding.value?.table?.columnsMap[col.key]) {
              crudBinding.value.table.columnsMap[col.key].width = w
            }
          },
          columns: {
            // 最后一列空白，用于自动伸缩列宽
            __blank__: {
              title: '',
              type: 'text',
              form: {
                show: false,
              },
              column: {
                order: 99999,
                width: -1,
                columnSetShow: false,
                resizable: false,
              },
            },
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
            is: 'a-drawer',
            maskClosable: false,
            saveRemind: true,
          },
          async afterSubmit({ mode }) {
            if (mode === 'add') {
              notification.success({ message: '添加成功' })
            }
            else if (mode === 'edit') {
              notification.success({ message: '保存成功' })
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
    handle: (columnProps: ColumnCompositionProps) => {
      if (!columnProps.column) {
        columnProps.column = {}
      }
      if (columnProps.column.resizable === null) {
        columnProps.column.resizable = true
        if (!columnProps.column.width) {
          columnProps.column.width = 100
        }
      }

      return columnProps
    },
  })
}

export default {
  install,
}
