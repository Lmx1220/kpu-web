<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { DictOption, Option } from '@/api/model/baseModel'
import { findDictMapItemListByKey } from '@/api/modules/common/dict'
import { treeOrg } from '@/api/modules/system/org'
import crudUser from '@/api/modules/system/user'
import stautsEnum from '@/enums/stautsEnum'

export interface Props {
  id?: string
  type?: 'add' | 'edit' | 'view'
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
})

const data = ref({
  loading: false,
  form: {
    id: props.id,
    username: '',
    nickName: '',
    state: true,
    mobile: '',
    sex: '',
    orgIdList: [] as string[],
    positionId: '',
    nation: '',
    education: '',
    positionStatus: '',
  },
  dicts: new Map<string, Option[]>(),
  orgTree: [] as any[],
  rules: {
    username: [
      {
        required: true,
        message: '请输入用户账号',
        trigger: 'blur',
      },
    ],
    nickName: [
      {
        required: true,
        message: '请输入用户昵称',
        trigger: 'blur',
      },
    ],
    mobile: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },
      // { type: 'phone', message: '手机号规则不正确', trigger: 'blur' },
    ],
  },
})

async function getDict() {
  const options: DictOption = await findDictMapItemListByKey([{
    type: 'SEX',
    extendFirst: true,
  }, {
    type: 'POSITION_STATUS',
    extendFirst: true,
  }, {
    type: 'NATION',
    extendFirst: true,
  }, {
    type: 'EDUCATION',
    extendFirst: true,
  }])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts.set(key, value)
  })
}

const form = ref<FormInstance>()

onMounted(() => {
  getDict()
  getTreeList()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

async function getTreeList() {
  data.value.orgTree = await treeOrg()
}

function getInfo() {
  data.value.loading = true
  crudUser.detail(data.value.form.id).then((res) => {
    data.value.loading = false
    data.value.form = res as any
  })
}

defineExpose({
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        if (props.type === 'add') {
          crudUser.create(data.value.form).then(() => {
            ElMessage.success({
              message: '新增成功',
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === 'edit') {
          crudUser.edit(data.value.form).then(() => {
            ElMessage.success({
              message: '编辑成功',
              center: true,
            })
            callback && callback()
          })
        }
        else {
          callback && callback(false)
        }
      }
    })
  },
})
</script>

<template>
  <div v-loading="data.loading">
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <el-divider content-position="left">
        基本信息
      </el-divider>
      <el-row>
        <el-row :gutter="30" style="padding: 20px;">
          <el-col v-show="!(type === 'edit')" :lg="24" :xl="12">
            <el-form-item label="用户账号" prop="username">
              <el-input v-model="data.form.username" :disabled="type === 'view'" placeholder="请输入用户账号" />
            </el-form-item>
          </el-col>
          <el-col :lg="24" :xl="12">
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="data.form.nickName" :disabled="type === 'view'" placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col>
          <el-col :lg="24" :xl="12">
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="data.form.state" :disabled="type === 'view'">
                <el-radio-button v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
                  {{ item.label }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider content-position="left">
          用户信息
        </el-divider>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="data.form.mobile" :disabled="type === 'view'" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="data.form.sex" :disabled="type === 'view'">
            <el-radio v-for="(item, index) in data.dicts.get('SEX')" :key="index" :label="item?.value">
              {{ item?.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-select
            v-model="data.form.nation" :disabled="type === 'view'" clearable placeholder="请选择"
            size="default"
          >
            <el-option
              v-for="item in data.dicts.get('NATION') || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select
            v-model="data.form.education" :disabled="type === 'view'" clearable placeholder="请选择"
            size="default"
          >
            <el-option
              v-for="item in data.dicts.get('EDUCATION') || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-divider content-position="left">
          职位信息
        </el-divider>
        <el-form-item label="部门" prop="positionStatus">
          <el-tree-select
            v-model="data.form.orgIdList"
            :data="data.orgTree"
            :disabled="type === 'view'"
            :max-collapse-tags="3"
            :props="{
              children: 'children',
              label: 'name',
            }"
            :render-after-expand="false"
            check-on-click-node
            check-strictly
            collapse-tags
            collapse-tags-tooltip
            filterable
            multiple
            show-checkbox
            style="width: 250px"
            value-key="id"
          />
        </el-form-item>
        <el-form-item label="岗位" prop="org">
          <el-select
            v-model="data.form.positionId" :disabled="type === 'view'" clearable placeholder="请选择"
            size="default"
          >
            <el-option
              v-for="item in data.dicts.get('POSITION_STATUS') || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="职位状态" prop="positionStatus">
          <el-select
            v-model="data.form.positionStatus" :disabled="type === 'view'" clearable placeholder="请选择"
            size="default"
          >
            <el-option
              v-for="item in data.dicts.get('POSITION_STATUS') || []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
