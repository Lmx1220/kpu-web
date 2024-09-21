<script setup lang="ts">
import crud from '@/api/modules/standardModuleExample.ts'
import { ActionEnum } from '@/enums/commonEnum.ts'
import useSettingsStore from '@/store/modules/settings.ts'
import eventBus from '@/utils/eventBus.ts'
import usePagination from '@/utils/usePagination.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { get } from 'lodash-es'
import FormMode from './components/FormMode/index.vue'

const router = useRouter()
const tabbar = useTabbar()
const settingsStore = useSettingsStore()
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination()
const { t } = useI18n()
const data = ref(
  {
    loading: false,
    tableAutoHeight: false,
    formMode: 'router',
    formModeProps: {
      visible: false,
      id: '',
      type: undefined as any,
    },
    search: {
      title: '',
      title2: '',
      title3: '',
      title4: '',
    },
    batch: {
      enable: true,
      selectionDataList: [],
    },
    dataList: [],
  },
)
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
  const params = getParams({ ...data.value.search })
  const res = await crud.page(params)
  data.value.dataList = get(res, 'records', []) as any
  pagination.value.total = Number(res.total)
  pagination.value.page = Number(get(res, 'current', 1))
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

function onAdd() {
  if (data.value.formMode === 'router') {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
      tabbar.open({
        name: 'standardModuleExampleCreate',
        params: {
          type: 'add',
        },
      },
      )
    }
    else {
      router.push({
        name: 'standardModuleExampleCreate',
        params: {
          type: 'add',
        },
      })
    }
  }
  else {
    data.value.formModeProps.id = ''
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.ADD
  }
}
function onEdit(row: any) {
  if (data.value.formMode === 'router') {
    if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
      tabbar.open({
        name: 'standardModuleExampleEdit',
        params: {
          id: row.id,
          type: 'edit',
        },
      },
      )
    }
    else {
      router.push({
        name: 'standardModuleExampleEdit',
        params: {
          id: row.id,
          type: 'edit',
        },
      })
    }
  }
  else {
    data.value.formModeProps.id = row.id
    data.value.formModeProps.visible = true
    data.value.formModeProps.type = ActionEnum.EDIT
  }
}
function onDel(row: any) {
  let ids: string[] = []
  if (row) {
    ids.push(row.id)
  }
  else {
    ids = data.value.batch.selectionDataList.map((item: { id: string }) => item.id)
  }
  ElMessageBox.confirm(`确认删除数量「${ids.length}」吗？`, '确认信息').then(() => {
    crud.remove(ids).then(() => {
      getDataList()
      ElMessage.success({
        message: '删除成功',
        center: true,
      })
    })
  }).catch(() => {
  })
}
</script>

<template>
  <div :class="{ 'absolute-container': data.tableAutoHeight }">
    <PageHeader title="标准模块">
      <template #content>
        <p>标准模块即包含 CRUD (增查改删) 操作的基础模块，开发者可通过 <ElTag>pnpm run new</ElTag> 命令快速生成一个标准模块，并在此基础上完善业务模块所需要的功能。</p>
        <p>
          同时，标准模块还提供了两个优秀的特性：
        </p>
        <p style="display: flex; align-items: center;">
          <span style="margin-inline-end: 20px;">特性1：列表展示模式</span>
          <el-radio-group v-model="data.tableAutoHeight" size="large">
            <el-radio-button :value="false">
              默认
            </el-radio-button>
            <el-radio-button :value="true">
              列表高度自适应
            </el-radio-button>
          </el-radio-group>
        </p>
        <p style="display: flex; align-items: center;">
          <span style="margin-inline-end: 20px;">特性2：表单展示模式</span>
          <el-radio-group v-model="data.formMode" size="large">
            <el-radio-button value="router">
              路由跳转
            </el-radio-button>
            <el-radio-button value="dialog">
              对话框
            </el-radio-button>
            <el-radio-button value="drawer">
              抽屉
            </el-radio-button>
          </el-radio-group>
        </p>
      </template>
    </PageHeader>
    <PageMain>
      <SearchBar class="relative" :show-toggle="false">
        <template #default="{ fold, toggle }">
          <ElForm
            :model="data.search"
            size="default"
            label-width="100px"
            inline-message
            inline
            class="search-form"
          >
            <ElFormItem label="标题">
              <ElInput v-model="data.search.title" placeholder="请输入标题，支持模糊查询" clearable />
            </ElFormItem>
            <ElFormItem v-show="fold" label="标题2">
              <ElInput v-model="data.search.title2" placeholder="请输入标题，支持模糊查询" clearable />
            </ElFormItem>
            <ElFormItem v-show="fold" label="标题3">
              <ElInput v-model="data.search.title3" placeholder="请输入标题，支持模糊查询" clearable />
            </ElFormItem>
            <ElFormItem v-show="fold" label="标题4">
              <ElInput v-model="data.search.title4" placeholder="请输入标题，支持模糊查询" clearable />
            </ElFormItem>
            <ElFormItem>
              <ElButton type="primary" @click="getDataList()">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <ElButton link @click="toggle">
                <template #icon>
                  <SvgIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
                </template>
                {{ fold ? '展开' : '收起' }}
              </ElButton>
            </ElFormItem>
          </ElForm>
        </template>
      </SearchBar>
      <ElDivider />
      <ElSpace>
        <ElButton type="primary" @click="onAdd()">
          <template #icon>
            <SvgIcon name="ep:plus" />
          </template>
          {{ t('common.title.addRoot') }}
        </ElButton>

        <ElButton :disabled="!data.batch.selectionDataList.length">
          单个批量操作按钮
        </ElButton>

        <ElButtonGroup v-if="data.batch.enable">
          <ElButton :disabled="!data.batch.selectionDataList.length">
            单个批量操作按钮1
          </ElButton>
          <ElButton :disabled="!data.batch.selectionDataList.length">
            单个批量操作按钮2
          </ElButton>
        </ElButtonGroup>
      </ElSpace>
      <ElTable
        v-loading="data.loading" class="list-table" :data="data.dataList"
        stripe highlight-current-row border @selection-change="data.batch.selectionDataList = $event"
      >
        <el-table-column v-if="data.batch.enable" type="selection" align="center" fixed />
        <ElTableColumn prop="title" :label="t('system.resource.title')" min-width="200" fixed="left" />
        <ElTableColumn
          align="center" fixed="right" label="操作" width="350"
        >
          <template #default="scope">
            <ElButton link size="small" type="primary" @click="onEdit(scope.row)">
              编辑
            </ElButton>
            <ElPopconfirm :title="t('common.tips.confirmDelete')" @confirm="onDel(scope.row)">
              <template #reference>
                <ElButton link size="small" type="danger">
                  刪除
                </ElButton>
              </template>
            </ElPopconfirm>
          </template>
        </ElTableColumn>
      </ElTable>
      <el-pagination :current-page="pagination.page" :total="pagination.total" :page-size="pagination.size" :page-sizes="pagination.sizes" :layout="pagination.layout" :hide-on-single-page="false" class="pagination" background @size-change="sizeChange" @current-change="currentChange" />
    </PageMain>
    <FormMode v-if="['dialog', 'drawer'].includes(data.formMode)" :id="data.formModeProps.id" v-model="data.formModeProps.visible" :type="data.formModeProps.type" :mode="data.formMode" @success="getDataList" />
  </div>
</template>

<style scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-main {
    flex: 1;
    overflow: auto;

    :deep(.main-container) {
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: auto;
    }

    .page-header {
      margin-bottom: 0;
    }
  }
}

.page-main {
  :deep(.search-form) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    margin-bottom: -18px;

    .el-form-item {
      grid-column: auto/span 1;

      &:last-child {
        grid-column-end: -1;

        .el-form-item__content {
          justify-content: flex-end;
        }
      }
    }
  }

  .el-divider {
    width: calc(100% + 40px);
    margin-inline: -20px;
  }
}
</style>
