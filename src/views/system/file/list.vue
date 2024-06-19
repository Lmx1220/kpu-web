<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'
import crudFile from '@/api/modules/system/file'
import type { FilePageQuery, FileResultVO } from '@/api/modules/system/model/fileModel'
import { downloadIds, uploadApi } from '@/api/modules/system/upload'
import type { DataConfig } from '@/types/global'
import { downloadFile } from '@/util'
import eventBus from '@/util/eventBus'
import usePagination from '@/util/usePagination.js'
import { findEnumListByType } from '@/api/modules/common/general.ts'

defineOptions({
  name: 'SystemFileList',
})
const {
  pagination,
  search,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
  resetQuery,
} = usePagination()
// const router = useRouter()
// const route = useRoute()

const data = ref<DataConfig>({
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
  dicts: new Map(),
})

const table = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  getDict()
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
  const params = getParams<FilePageQuery>({
    ...data.value.search,
  }, {
    type: 'daterange',
    name: 'daterange',
    prop: 'createdTime',
  })
  const res = await crudFile.page(params)
  data.value.dataList = get(res, 'records', [])
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
  // pagination.value.size = res.size
  setTimeout(() => {
    data.value.loading = false
  }, 100)
}
async function getDict() {
  const options = await findEnumListByType([{
    type: 'FileStorageType',
    extendFirst: true,
  }, {
    type: 'FileType',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
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
function sortChange({
  prop,
  order,
}: any) {
  onSortChange(prop, order).then(() => getDataList())
}

function onDel(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id)
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crudFile.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}

async function onDownload(row?: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map(item => item.id)
  }
  const res = await downloadIds(ids)
  downloadFile(res)
}

function handleChange(list: FileResultVO[]) {
  ElMessage.info(`已上传文件${JSON.stringify(list.length)}`)
  getDataList()
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="文件管理" />
    <PageMain>
      <SearchBar
        :fold="data.searchFold"
        :show-toggle="false"
      >
        <template #default="{ fold }">
          <ElForm
            :model="data.search" class="search-form" inline-message inline label-suffix="：" label-width="100px"
            size="default"
          >
            <ElFormItem label="原始文件名">
              <ElInput
                v-model="data.search.originalFileName" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem label="桶">
              <ElInput
                v-model="data.search.bucket" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem label="存储类型">
              <ElSelect
                v-model="data.search.storageType" clearable placeholder="请选择" size="default"
                @change="currentChange()"
              >
                <ElOption
                  v-for="item in data.dicts.get('FileStorageType') || []" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="文件类型">
              <ElSelect
                v-model="data.search.fileType" clearable placeholder="请选择" size="default"
                @change="currentChange()"
              >
                <ElOption
                  v-for="item in data.dicts.get('FileType') || []" :key="item.value" :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>
            <ElFormItem
              v-show="!fold" label="文件类型"
            >
              <ElInput
                v-model="data.search.contentType" clearable placeholder="请输入，支持模糊查询"
                @clear="currentChange()" @keydown.enter="currentChange()"
              />
            </ElFormItem>
            <ElFormItem v-show="!fold" label="创建时间">
              <ElDatePicker
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
                @change="currentChange()"
              />
            </ElFormItem>

            <ElFormItem>
              <ElButton type="primary" @click="currentChange()">
                <template #icon>
                  <SvgIcon name="ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton type="primary" @click="resetQuery()">
                重置
              </ElButton>
              <ElButton link type="primary" @click="data.searchFold = !fold">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider border-style="dashed" class="my-4" />
      <ElSpace wrap>
        <BasicUpload
          :api="uploadApi"
          :max-number="10"
          :max-size="20"
          :show-preview-button="false"
          :upload-params="{ bizType: 'BASE_FILE' }"
          @change="handleChange"
        />
        <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDel()">
          <template #icon>
            <SvgIcon name="ep:delete" />
          </template>
          删除
        </ElButton>
        <ElButton :disabled="!data.batch.selectionDataList.length" size="default" @click="onDownload()">
          <template #icon>
            <SvgIcon name="ep:" />
          </template>
          下载
        </ElButton>
      </ElSpace>
      <ElTable
        ref="table" v-loading="data.loading" :data="data.dataList" class="my-4" height="100%"
        highlight-current-row stripe border @sort-change="sortChange" @selection-change="data.batch.selectionDataList = $event"
      >
        <ElTableColumn v-if="data.batch.enable" align="center" fixed type="selection" />
        <ElTableColumn align="center" label="文件预览" prop="path">
          <template #default="{ row }">
            <ThumbUrl :file-id="row.id" :file-type="row.fileType" :original-file-name="row.originalFileName" />
          </template>
        </ElTableColumn>
        <ElTableColumn align="center" label="原始文件名" prop="originalFileName" />
        <ElTableColumn align="center" label="桶" prop="bucket" width="100" />
        <ElTableColumn align="center" label="业务类型" prop="bizType" />
        <ElTableColumn align="center" label="存储类型" prop="echoMap.storageType" width="100" />
        <ElTableColumn align="center" label="文件类型" prop="echoMap.fileType" width="100" />
        <ElTableColumn align="center" label="文件类型" prop="contentType" />
        <ElTableColumn align="center" label="大小" prop="size" width="100" />
        <ElTableColumn align="center" label="创建时间" prop="createdTime" sortable="custom" width="180" />
        <ElTableColumn align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <ElButton plain size="small" text @click="onDownload(scope.row)">
              下载
            </ElButton>
            <ElButton plain size="small" text type="danger" @click="onDel(scope.row)">
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <ElPagination
        :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
        :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total"
        background class="pagination" @size-change="sizeChange" @current-change="currentChange"
      />
    </PageMain>
    <FormMode
      v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id"
      v-model="data.formModeProps.visible" :mode="data.formMode" @success="getDataList"
    />
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

    :deep(.main-container) {
      flex: 1;
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

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
