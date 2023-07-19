<script lang="ts" setup>
import { ElMessage, ElTable } from 'element-plus'
import { get } from 'lodash-es'
import usePagination from '@/util/usePagination'
import crudUser from '@/api/modules/system/user'
import { getListRole } from '@/api/modules/system/role'
import { getCategoryColor } from '@/enums/colorEnum'
import type { RoleParams } from '@/api/modules/system/model/roleModel'

export interface Props {
  id: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(),
  {
    modelValue: false,
  })

const emits = defineEmits<{
  'update:modelValue': [
    value: boolean,
  ]
  success: []
}>()
const {
  pagination,
  getParams,
  onSizeChange,
  onCurrentChange,
  onSortChange,
} = usePagination()

const data = ref({
  loading: false,
  tableAutoHeight: true,
  /**
   * 详情展示模式
   * router 路由跳转
   * dialog 对话框
   * drawer 抽屉
   */
  formMode: 'dialog',
  // 详情
  formModeProps: {
    visible: false,
    id: '',
  },
  // 搜索
  search: {
    code: '',
    name: '',
    scope: '-1',
  },
  searchFold: false,
  // 批量操作
  batch: {
    enable: true,
    selectionData: {} as {},
    selectionDataList: [] as { id: string }[],
  },
  // 列表数据
  dataList: [],
  bindRoles: [] as string[],
})
const table = ref<InstanceType<typeof ElTable>>()
const myVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const title = computed(() => props.id === '' ? '绑定角色' : '绑定角色')

function onSubmit() {
  // submit() 为组件内部方法
  emits('success')
  onCancel()
}

function onCancel() {
  myVisible.value = false
  data.value.batch.selectionDataList = []
  data.value.bindRoles = []
  data.value.dataList = []
  data.value.search = {
    code: '',
    name: '',
    scope: '-1',
  }
}

function handleOpen() {
  // handleOpen() 为组件内部方法
  getDataList(1)
  getBindRoles(props.id)
}

function getDataList(current?: number) {
  if (current && current === 1) {
    pagination.value.page = current
  }
  data.value.loading = true
  const params = getParams<RoleParams>({
    ...data.value.search,
    userId: props.id,
  })
  getListRole(params).then((res) => {
    data.value.dataList = get(res, 'records', [])
    pagination.value.total = Number(res.total)
    pagination.value.page = Number(get(res, 'current', 1))
    // pagination.value.size = res.size
  }).finally(() => {
    setTimeout(() => {
      data.value.loading = false
    }, 100)
  })
}

async function getBindRoles(id: string) {
  const dataList = await crudUser.roleList(id)
  data.value.bindRoles = dataList
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

async function onBindUser(flag: boolean, id?: string) {
  const roleIdList = id ? [id] : data.value.batch.selectionDataList.map(item => item.id)
  const res = await crudUser.saveUserRole({
    userId: props.id,
    roleIdList,
    flag,
  })
  data.value.bindRoles = res
  ElMessage.success('操作成功')
}
</script>

<template>
  <el-dialog
    v-model="myVisible" :close-on-click-modal="false" :title="title" append-to-body destroy-on-close
    width="70%" @open="handleOpen"
  >
    <search-bar :fold="data.searchFold" :show-toggle="false">
      <template #default="{ fold }">
        <el-form
          :model="data.search" class="search-form" inline inline-message label-suffix="：" label-width="100px"
          size="default"
        >
          <el-form-item label="编码">
            <el-input
              v-model="data.search.code" clearable placeholder="请输入编码，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              v-model="data.search.name" clearable placeholder="请输入名称，支持模糊查询"
              @clear="currentChange()" @keydown.enter="currentChange()"
            />
          </el-form-item>
          <el-form-item v-show="!fold" label="范围">
            <el-radio-group v-model="data.search.scope" size="large" @change="currentChange()">
              <el-radio-button :label="-1">
                全部
              </el-radio-button>
              <el-radio-button :label="1">
                已绑定
              </el-radio-button>
              <el-radio-button :label="2">
                未绑定
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="currentChange()">
              <template #icon>
                <svg-icon name="ep:search" />
              </template>
              筛选
            </el-button>
            <el-button link type="primary" @click="data.searchFold = !fold">
              <template #icon>
                <svg-icon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
              </template>
              {{ fold ? '展开' : '收起' }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </search-bar>
    <el-divider border-style="dashed" />
    <el-space wrap>
      <el-button
        :disabled="!data.batch.selectionDataList.length" size="default" type="danger"
        @click="onBindUser(true)"
      >
        批量绑定
      </el-button>
      <el-button
        :disabled="!data.batch.selectionDataList.length" size="default" type="primary"
        @click="onBindUser(false)"
      >
        批量取消
      </el-button>
    </el-space>
    <ElTable
      ref="table" v-loading="data.loading" :data="data.dataList" border class="list-table" height="100%"
      row-key="id" stripe

      @sort-change="sortChange"
      @current-change="data.batch.selectionData = $event"
      @selection-change="data.batch.selectionDataList = $event"
    >
      <el-table-column v-if="data.batch.enable" align="center" reserve-selection type="selection" />
      <el-table-column align="center" label="序号" width="100">
        <template #default="{ $index }">
          {{ (pagination.size * (pagination.page - 1)) + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="编码" prop="code" />
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="角色类别" prop="category">
        <template #default="scope">
          <el-tag :type="getCategoryColor(scope.row.category)">
            {{ scope.row.echoMap.category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="state" width="80">
        <template #default="{ row }">
          <el-tag :type="row.state ? 'success' : 'danger'">
            {{ row.state ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            bg plain size="small" text type="primary"
            @click="onBindUser(!data.bindRoles.find(item => item === scope.row.id), scope.row.id)"
          >
            {{ data.bindRoles.find(item => item === scope.row.id) ? '取消绑定' : '绑定' }}
          </el-button>
        </template>
      </el-table-column>
    </ElTable>
    <el-pagination
      :current-page="pagination.page" :hide-on-single-page="false" :layout="pagination.layout"
      :page-size="pagination.size" :page-sizes="pagination.sizes" :total="pagination.total" background
      class="pagination" @size-change="sizeChange" @current-change="currentChange"
    />
    <template #footer>
      <el-button size="large" @click="onCancel">
        取 消
      </el-button>
      <el-button size="large" type="primary" @click="onSubmit">
        确 定
      </el-button>
    </template>
  </el-dialog>
</template>
