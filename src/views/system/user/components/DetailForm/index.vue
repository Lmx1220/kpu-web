<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

// import type { DictOption, Option } from '@/api/model/baseModel'
// import { asyncFindDictList } from '@/api/modules/common/dict'
import { treeOrg } from '@/api/modules/system/org'
import crudUser from '@/api/modules/system/user'
import stautsEnum from '@/enums/stautsEnum'
import { ActionEnum, DictEnum } from '@/enums/commonEnum.ts'
import { dictComponentProps } from '@/util/common.ts'

export interface Props {
  id?: string
  type?: ActionEnum
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
  // dicts: new Map<string, Option[]>(),
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
  // const options: DictOption = await asyncFindDictList([{
  //   type: 'SEX',
  //   extendFirst: true,
  // }, {
  //   type: 'POSITION_STATUS',
  //   extendFirst: true,
  // }, {
  //   type: 'NATION',
  //   extendFirst: true,
  // }, {
  //   type: 'EDUCATION',
  //   extendFirst: true,
  // }])
  // Object.entries(options).forEach(([key, value]) => {
  //   data.value.dicts.set(key, value)
  // })
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
        if (props.type === ActionEnum.ADD) {
          crudUser.save(data.value.form).then(() => {
            ElMessage.success({
              message: t('common.tips.addSuccess'),
              center: true,
            })
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudUser.update(data.value.form).then(() => {
            ElMessage.success({
              message: t('common.tips.editSuccess'),
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
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="120px">
      <ElDivider content-position="left">
        基本信息
      </ElDivider>
      <ElRow>
        <ElRow :gutter="30" style="padding: 20px;">
          <ElCol v-show="!(type === ActionEnum.EDIT)" :lg="24" :xl="12">
            <ElFormItem label="用户账号" prop="username">
              <ElInput v-model="data.form.username" :disabled="type === ActionEnum.VIEW" placeholder="请输入用户账号" />
            </ElFormItem>
          </ElCol>
          <ElCol :lg="24" :xl="12">
            <ElFormItem label="昵称" prop="nickName">
              <ElInput v-model="data.form.nickName" :disabled="type === ActionEnum.VIEW" placeholder="请输入用户昵称" />
            </ElFormItem>
          </ElCol>
          <ElCol :lg="24" :xl="12">
            <ElFormItem label="状态" prop="state">
              <ElRadioGroup v-model="data.form.state" :disabled="type === ActionEnum.VIEW">
                <ElRadioButton v-for="(item, index) in stautsEnum.dic" :key="index" :label="item.value">
                  {{ item.label }}
                </ElRadioButton>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElDivider content-position="left">
          用户信息
        </ElDivider>
        <ElFormItem label="手机号" prop="mobile">
          <ElInput v-model="data.form.mobile" :disabled="type === ActionEnum.VIEW" placeholder="请输入手机号" />
        </ElFormItem>
        <ElFormItem label="性别" prop="sex">
          <ApiRadioGroup
            v-model="data.form.sex" v-bind="dictComponentProps(DictEnum.GLOBAL_SEX)"
            :disabled="type === ActionEnum.VIEW"
          />
        </ElFormItem>
        <ElFormItem label="民族" prop="nation">
          <ApiSelect v-model="data.form.nation" v-bind="dictComponentProps(DictEnum.NATION)" clearable />
        </ElFormItem>
        <ElFormItem label="学历" prop="education">
          <ApiSelect v-model="data.form.education" v-bind="dictComponentProps(DictEnum.EDUCATION)" clearable />
        </ElFormItem>
        <ElDivider content-position="left">
          职位信息
        </ElDivider>
        <ElFormItem label="部门" prop="positionStatus">
          <ElTreeSelect
            v-model="data.form.orgIdList"
            :data="data.orgTree"
            :disabled="type === ActionEnum.VIEW"
            :max-collapse-tags="3"
            :props="{
              children: 'children',
              label: 'name',
            }"
            :render-after-expand="false"

            check-on-click-node check-strictly filterable show-checkbox collapse-tags collapse-tags-tooltip multiple
            style="width: 250px;"
            value-key="id"
          />
        </ElFormItem>
        <ElFormItem label="岗位" prop="positionId">
          <ApiSelect v-model="data.form.positionId" v-bind="dictComponentProps(DictEnum.POSITION_STATUS)" clearable />
        </ElFormItem>
        <ElFormItem label="职位状态" prop="positionStatus">
          <ApiSelect v-model="data.form.positionStatus" v-bind="dictComponentProps(DictEnum.POSITION_STATUS)" clearable />
        </ElFormItem>
      </ElRow>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
// scss
</style>
