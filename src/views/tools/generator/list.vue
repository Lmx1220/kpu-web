<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import ImportMode from './components/ImportMode/index.vue'
import PreviewMode from './components/PreviewMode/index.vue'
import type { GenTablePageQuery, GenTableResultVO } from '@/api/modules/tools/model/genTableModel'
import crudGenTable, { downloadZip, generatorCode } from '@/api/modules/tools/genTable'
import { useDialog } from '@/components/Dialog/hooks/useDialog'
import type { DataConfig } from '@/types/global'
import { downloadFile } from '@/util'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'

defineOptions({
  name: 'ToolsGeneratorList',
})
const {
  pagination,
  search,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
  resetQuery,
} = usePagination<GenTablePageQuery>()
const router = useRouter()
// const route = useRoute()
const defaultQuery = {
  name: '',
  comment: '',
  entityName: '',
  author: '',
  daterange: [],
}
const data: Ref<DataConfig<GenTablePageQuery, GenTableResultVO>> = ref({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'router',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search,
  searchFold: false,
  // 批量操作
  batch: {
    enable: true,
    selectionDataList: [],
  },
  // 列表数据
  dataList: [],

})

const table = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  getDataList()
  if (data.value.formMode === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (data.value.formMode === 'router') {
    eventBus.off('get-data-list')
  }
})

async function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<GenTablePageQuery>({
    ...data.value.search,
  },
  {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  })
  const res = await crudGenTable.list(params)
  data.value.dataList = get(res, 'records', [])
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
  // pagination.value.size = res.size
  setTimeout(() => {
    data.value.loading = false
  }, 100)
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({ prop, order }: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onCreate() {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'ToolsGeneratorCreate',
      params: {
        type: 'add',
      },
    })
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'add'
  }
}

function onEdit(row?: any) {
  let ids: string[] = []
  let title: string
  let content: any
  if (row) {
    ids.push(row.id)
    title = `表名：${row.name}`
    content = `实体类：${row.entityName} 作者：${row.author}`
  }
  else {
    if (data.value.batch.selectionDataList.length > 0 && data.value.batch.selectionDataList.length < 2) {
      ids.push(data.value.batch.selectionDataList[0].id ?? '')
      title = `表名：${data.value.batch.selectionDataList[0].name}`
      content = `实体类：${data.value.batch.selectionDataList[0].entityName} 作者：${data.value.batch.selectionDataList[0].author}`
    }
    else {
      ids = data.value.batch.selectionDataList.map(item => item.id ?? '')
      const names = data.value.batch.selectionDataList.map(item => item.name)
      title = `批量编辑：${names.join(',')}`
    }
  }
  if (data.value.formMode === 'router') {
    router.push({
      name: 'ToolsGeneratorEdit',
      params: {
        id: ids.join(',') || '',
        type: 'edit',
      },
      query: {
        title,
        content,
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'edit'
  }
}

function onView(row: any) {
  if (data.value.formMode === 'router') {
    router.push({
      name: 'ToolsGeneratorDetail',
      params: {
        id: row.id,
        type: 'view',
      },
    })
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = 'view'
  }
}

function onDel(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id ?? '')
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudGenTable.delete(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

const [registerImportMode, { openDialog: openImportMode }] = useDialog()
const [registerPreviewMode, { openDialog: openPreviewMode }] = useDialog()
const btnDisabled = ref(false)

async function downCommand(template: 'WEB_PLUS' | 'BACKEND') {
  const ids = data.value.batch.selectionDataList.map(item => item.id ?? '')
  btnDisabled.value = true
  try {
    const res = await downloadZip(ids, template)
    if (res) {
      downloadFile(res)
      ElMessage.success('下载成功')
    }
    else {
      ElMessage.error('下载失败，请认真检查【生成信息】是否填写完整并保存成功！')
    }
  }
  catch (e) {
    console.error(e)
    // if (t.response.data) { console.log(e) }
  }
  finally {
    btnDisabled.value = false
  }
}

async function genCommand(template: 'WEB_PLUS' | 'BACKEND') {
  btnDisabled.value = true
  const ids = data.value.batch.selectionDataList.map(item => item.id ?? '')

  try {
    await generatorCode({ ids, template })
    ElMessage.success('代码生成成功，请在[生成路径]查看')
  }
  finally {
    btnDisabled.value = false
  }
}

function onSync(row?: any) {
  crudGenTable.syncField(row.id).then(() => {
    getDataList()
    ElMessage.success({
      message: '同步成功',
      center: true,
    })
  })
}

async function onDownload(row: any, template: 'WEB_PLUS' | 'BACKEND') {
  const ids = [row.id]
  if (row.genType === 'ZIP') {
    const res = await downloadZip(ids, template)
    downloadFile(res)
    ElMessage.success('下载成功')
  }
  else {
    await generatorCode({ ids, template })
    template === 'BACKEND'
      ? ElMessage.success(`后端代码生成成功，请在${row.outputDir}查看`)
      : ElMessage.success(`前端代码生成成功，请在${row.frontOutputDir}查看`)
  }
}

function onPreview(template: 'WEB_PLUS' | 'BACKEND', row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id ?? '')
  }
  openPreviewMode(undefined, { ids, template })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <page-header title="代码生成器" />
    <page-main>
      <search-bar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <el-form
            :model="data.search" class="search-form" inline-message label-suffix="：" label-width="100px"
            size="default"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="表名称">
                  <el-input
                    v-model="data.search.name" clearable placeholder="请输入，支持模糊查询"
                    @clear="currentChange()" @keydown.enter="currentChange()"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item v-show="!fold" label="表描述">
                  <el-input
                    v-model="data.search.comment" clearable placeholder="请输入，支持模糊查询"
                    @clear="currentChange()" @keydown.enter="currentChange()"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item v-show="!fold" label="作者">
                  <el-input
                    v-model="data.search.author" clearable placeholder="请输入，支持模糊查询"
                    @clear="currentChange()" @keydown.enter="currentChange()"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item v-show="!fold" label="创建时间">
                  <el-date-picker
                    v-model="data.search.daterange"
                    :default-time="[
                      new Date(2000, 1, 1, 0, 0, 0),
                      new Date(2000, 2, 1, 23, 59, 59),
                    ]"
                    end-placeholder="结束时间"
                    range-separator=":"
                    start-placeholder="开始时间"
                    style="width: 250px;"
                    type="daterange"
                    value-format="YYYY-MM-DD HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item>
                  <el-button type="primary" @click="currentChange()">
                    <template #icon>
                      <svg-icon name="ep:search" />
                    </template>
                    筛选
                  </el-button>
                  <el-button type="primary" @click="resetQuery(defaultQuery)">
                    重置
                  </el-button>
                  <el-button link type="primary" @click="data.searchFold = !fold">
                    <template #icon>
                      <svg-icon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                    </template>
                    {{ fold ? '展开' : '收起' }}
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </search-bar>
      <el-divider border-style="dashed" />
      <el-space wrap>
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" type="danger" @click="onDel()">
          <template #icon>
            <svg-icon name="ep:delete" />
          </template>
          删除
        </el-button>
        <el-button size="default" type="primary" @click="() => openImportMode()">
          <template #icon>
            <svg-icon name="ri:upload-cloud-2-line" />
          </template>
          导入
        </el-button>
        <el-button :disabled="!data.batch.selectionDataList.length" size="default" type="primary" @click="onEdit()">
          <template #icon>
            <svg-icon name="ri:upload-cloud-2-line" />
          </template>
          编辑
        </el-button>
        <el-button
          :disabled="!data.batch.selectionDataList.length" size="default" type="primary"
          @click="() => onPreview('BACKEND')"
        >
          <template #icon>
            <svg-icon name="ri:upload-cloud-2-line" />
          </template>
          预览
        </el-button>
        <el-dropdown
          trigger="click"
          @command="downCommand"
        >
          <el-button :disabled="btnDisabled || !data.batch.selectionDataList.length" size="default" type="primary">
            <template #icon>
              <svg-icon name="ri:upload-cloud-2-line" />
            </template>
            下载
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="WEB_PLUS">
                前端
              </el-dropdown-item>
              <el-dropdown-item command="BACKEND">
                后端
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown
          trigger="click"
          @command="genCommand"
        >
          <el-button :disabled="btnDisabled || !data.batch.selectionDataList.length" size="default" type="primary">
            <template #icon>
              <svg-icon name="ri:upload-cloud-2-line" />
            </template>
            生成
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="WEB_PLUS">
                前端
              </el-dropdown-item>
              <el-dropdown-item command="BACKEND">
                后端
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%" highlight-current-row
        stripe @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" align="center" fixed type="selection" />
        <el-table-column align="center" label="序号" width="100">
          <template #default="{ $index }">
            {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="表名称" prop="name" />
        <el-table-column label="表描述" prop="comment" />
        <el-table-column label="实体类名称" prop="entityName" />
        <el-table-column label="作者" prop="author" />
        <el-table-column align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <el-table-column align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button plain size="default" text title="修改" type="primary" @click="onEdit(scope.row)">
              <svg-icon name="ep:edit" />
            </el-button>
            <el-button plain size="default" text title="删除" type="danger" @click="onDel(scope.row)">
              <svg-icon name="ep:delete" />
            </el-button>
            <el-popconfirm title="确定同步该表的字段吗？" @confirm="onSync(scope.row)">
              <template #reference>
                <el-button plain size="default" text title="同步" type="primary">
                  <svg-icon name="ant-design:cloud-sync-outlined" />
                </el-button>
              </template>
            </el-popconfirm>
            <el-dropdown>
              <el-button size="default" text type="primary">
                <svg-icon name="ep:more-filled" />
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="BACKEND" @click="() => onPreview('BACKEND', scope.row)">
                    <svg-icon name="ant-design:search-outlined" />
                    预览后端
                  </el-dropdown-item>
                  <el-dropdown-item command="WEB_PLUS" @click="() => onPreview('WEB_PLUS', scope.row)">
                    <svg-icon name="ant-design:search-outlined" />
                    预览前端
                  </el-dropdown-item>
                  <el-dropdown-item @click="onDownload(scope.row, 'BACKEND')">
                    <svg-icon name="ri:download-2-line" />
                    覆盖生成后端
                  </el-dropdown-item>
                  <el-dropdown-item @click="onDownload(scope.row, 'WEB_PLUS')">
                    <svg-icon name="ri:download-2-line" />
                    覆盖生成前端
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </ElTable>
      <el-pagination
        :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
        :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
        background class="pagination" @size-change="sizeChange" @current-change="currentChange"
      />
    </page-main>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList"
    />
    <ImportMode @register="registerImportMode" />
    <PreviewMode @register="registerPreviewMode" />
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .search-container {
      margin-bottom: 0;
    }
  }
}

.page-main {
  .search-form {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -18px;

    :deep(.el-form-item) {
      flex: 1 1 300px;

      &:last-child {
        margin-left: auto;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }

  }

  .el-divider {
    margin-inline: -20px;
    width: calc(100% + 40px);
  }
}
</style>
