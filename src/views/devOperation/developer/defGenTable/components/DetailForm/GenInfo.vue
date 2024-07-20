<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { camelCase } from 'lodash-es'
import yesOrNoEnum from '@/enums/common/yesOrNoEnum'
import type { FormConfig } from '#/global'
import type { DefGenTableUpdateVO } from '@/api/modules/devOperation/developer/model/defGenTableModel.ts'
import { query as getListDatasourceConfigQuery } from '@/api/modules/devOperation/tenant/datasourceConfig'
import { tree } from '@/api/modules/devOperation/application/defResource.ts'
import crudGenerator from '@/api/modules/devOperation/developer/defGenTable'
import { findEnumListByType } from '@/api/modules/common/general.ts'

export interface Props {
  id?: string | string[]
}

defineOptions({
  name: 'GenInfo',
})
const props = withDefaults(defineProps<Props>(), {
  id: '',
})
const data = ref<FormConfig>({
  loading: false,
  form: {
    id: props.id,
    isDs: false,
    isTenantLine: false,
    isLombok: true,
    isChain: true,
    isColumnConstant: false,
    genType: 'GEN',
    popupType: 'MODAL',
    tplType: 'SIMPLE',
    addShow: true,
    editShow: true,
    deleteShow: true,
    copyShow: true,
    viewShow: true,
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    dsId: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    entityName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    author: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    comment: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    swaggerComment: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    // remark: [
    //   {
    //     required: true,
    //     message: '请输入',
    //     trigger: 'blur',
    //   },
    // ],
    serviceName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    parent: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    moduleName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    // childPackageName: [
    //   {
    //     required: true,
    //     message: '请输入',
    //     trigger: 'blur',
    //   },
    // ],
    entitySuperClass: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],

    superClass: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],

    isDs: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    isTenantLine: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    isLombok: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    isChain: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    isColumnConstant: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    genType: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    outputDir: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    frontOutputDir: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    plusApplicationName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    plusModuleName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    popupType: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    tplType: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    addShow: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    editShow: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    deleteShow: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    copyShow: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    viewShow: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    menuApplicationId: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    menuName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    treeName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
    subId: [
      {
        required: true,
        message: '请选择',
        trigger: ['blur', 'change'],
      },
    ],
    subJavaFieldName: [
      {
        required: true,
        message: '请输入',
        trigger: 'blur',
      },
    ],
  },
  dicts: new Map(),
})
data.value.dicts?.set('YesOrNoEnum', yesOrNoEnum.enum())
const form = ref<FormInstance>()
const isSingle = computed(() => {
  return !Array.isArray(props.id)
})
onMounted(() => {
  getDict()
  if (data.value.form.id !== '') {
    getInfo()
  }
})

async function getDict() {
  const options = await findEnumListByType([
    {
      type: 'EntitySuperClassEnum',
      extendFirst: true,
    },
    {
      type: 'SuperClassEnum',
      extendFirst: true,
    },
    {
      type: 'GenTypeEnum',
      extendFirst: true,
    },
    {
      type: 'PopupTypeEnum',
      extendFirst: true,
    },
    {
      type: 'TplEnum',
      extendFirst: true,
    },
    {
      type: 'FileOverrideStrategyEnum',
      extendFirst: true,
    },
  ])
  Object.entries(options).forEach(([key, value]) => {
    data.value.dicts?.set(key, value)
  })
  tree().then((res: any) => {
    data.value.dicts?.set('menuList', res)
  })
  getListDatasourceConfigQuery().then((records) => {
    data.value.dicts?.set('DsEnum', records.map(item => ({
      label: item.name,
      value: item.id,
    })))
  })
  crudGenerator.query({}).then((res) => {
    data.value.dicts?.set('genTableList', res)
  })
}

function getInfo() {
  data.value.loading = true
  let id
  if (Array.isArray(data.value.form.id)) {
    id = data.value.form.id[0]
  }
  else {
    id = data.value.form.id
  }
  crudGenerator.detail(id).then((res) => {
    data.value.loading = false
    data.value.form = res
  })
}

const { updateActiveStatus } = inject('activeStatus') as {
  activeStatus: {
    active: number
    processStatus: string
  }
  updateActiveStatus: (activeStatus: {
    active?: number
    processStatus?: string
  }) => void
}

function onOk(callback?: Function) {
  form.value?.validate((valid) => {
    if (valid) {
      updateActiveStatus(
        {
          processStatus: 'finish',
        },
      )
      const newData = toRaw(data.value.form)
      if (!isSingle.value) {
        newData.batch = true
        newData.tableIdList = props.id
        const delFile = ['id', 'createdBy', 'createdTime', 'updatedBy', 'updatedTime', 'echoMap']
        delFile.forEach((item) => {
          delete newData[item]
        })
      }
      crudGenerator.update(newData as DefGenTableUpdateVO).then(() => {
        ElMessage.success({
          message: '修改成功',
          center: true,
        })
      })
      callback && callback()
    }
    else {
      updateActiveStatus(
        {
          processStatus: 'error',
        },
      )
    }
  })
}

function onGen(type: string) {
  if (data.value.form[`${type}Auth`]) {
    ElMessage.warning('无法生成！若您仍要采用系统规则生成，请先删除已输入的内容')
  }
  else {
    const { plusApplicationName, plusModuleName } = data.value.form

    const entityName = camelCase(data.value.form.entityName)
    if (!plusApplicationName || !plusModuleName || !entityName) {
      ElMessage.warning('请先输入前端应用名、前端模块名、实体类名')
      return
    }
    data.value.form[`${type}Auth`] = `${plusApplicationName}/${plusModuleName.replaceAll('/', ':')}:${entityName}:${type}`
  }
}

function getResourceTagColor(resourceType: string) {
  switch (resourceType) {
    case '10':
      return 'success'
    case '20':
      return 'info'
    case '30':
      return 'warning'
    case '40':
      return 'danger'
    case '50':
      return 'danger'
    default:
      return 'success'
  }
}

defineExpose({
  submit(callback: any) {
    onOk(callback)
  },
  validate() {
    return new Promise((resolve) => {
      form.value?.validate((valid) => {
        resolve(valid)
      })
    })
  },
})
</script>

<template>
  <div class="page-main gen-info">
    <ElForm ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="138" scroll-to-error>
      <PageHeader title="基础信息" />
      <ElRow :gutter="30" style="padding: 20px;">
        <ElCol v-if="isSingle" :lg="24" :xl="12">
          <ElFormItem label="表名" prop="name">
            <ElInput v-model="data.form.name" disabled />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="isSingle" :lg="24" :xl="12">
          <ElFormItem label="数据源名" prop="dsId">
            <ElSelect
              v-model="data.form.dsId" disabled placeholder="请选择"
            >
              <ElOption
                v-for="item in data.dicts?.get('DsEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="isSingle" :lg="24" :xl="12">
          <ElFormItem label="实体类名" prop="entityName">
            <ElInput v-model="data.form.entityName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="作者" prop="author">
            <ElInput v-model="data.form.author" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="isSingle" :lg="24" :xl="12">
          <ElFormItem label="表注释" prop="comment">
            <ElInput v-model="data.form.comment" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="isSingle" :lg="24" :xl="12">
          <ElFormItem label="swagger注释" prop="swaggerComment">
            <ElInput v-model="data.form.swaggerComment" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="24">
          <ElFormItem label="备注" prop="remark">
            <ElInput v-model="data.form.remark" clearable type="textarea" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <PageHeader title="生成信息" />
      <ElRow :gutter="30" style="padding: 20px;">
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="服务名" prop="serviceName">
            <ElInput v-model="data.form.serviceName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="父包名" prop="parent">
            <ElInput v-model="data.form.parent" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="模块名" prop="moduleName">
            <ElInput v-model="data.form.moduleName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="子包名" prop="childPackageName">
            <ElInput v-model="data.form.childPackageName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="实体父类" prop="entitySuperClass">
            <ElSelect
              v-model="data.form.entitySuperClass" clearable
              placeholder="请选择"
            >
              <ElOption
                v-for="item in data.dicts?.get('EntitySuperClassEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="父类" prop="superClass">
            <ElSelect
              v-model="data.form.superClass" clearable
              placeholder="请选择"
            >
              <ElOption
                v-for="item in data.dicts?.get('SuperClassEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="24">
          <ElFormItem label="@DS" prop="isDs">
            <ElRadioGroup v-model="data.form.isDs">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="@TenantLine" prop="isTenantLine">
            <ElRadioGroup v-model="data.form.isTenantLine">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="lombok" prop="isLombok">
            <ElRadioGroup v-model="data.form.isLombok">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="链式模型" prop="isChain">
            <ElRadioGroup v-model="data.form.isChain">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="生成字段常量" prop="isColumnConstant">
            <ElRadioGroup v-model="data.form.isColumnConstant">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="生成方式" prop="genType">
            <ElRadioGroup v-model="data.form.genType">
              <ElRadio v-for="(item, index) in data.dicts?.get('GenTypeEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="24">
          <ElFormItem label="后端生成路径" prop="outputDir">
            <ElInput v-model="data.form.outputDir" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="24">
          <ElFormItem label="前端生成路径" prop="frontOutputDir">
            <ElInput v-model="data.form.frontOutputDir" clearable />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <PageHeader title="前端信息" />
      <ElRow :gutter="30" style="padding: 20px;">
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="前端应用名" prop="plusApplicationName">
            <ElInput v-model="data.form.plusApplicationName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="前端模块名" prop="plusModuleName">
            <ElInput v-model="data.form.plusModuleName" clearable>
              <template #prepend>
                /
              </template>
              <template #append>
                /
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="弹窗方式" prop="popupType">
            <ElRadioGroup v-model="data.form.popupType">
              <ElRadio v-for="(item, index) in data.dicts?.get('PopupTypeEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="生成模板" prop="tplType">
            <ElRadioGroup v-model="data.form.tplType">
              <ElRadio v-for="(item, index) in data.dicts?.get('TplEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="显示新增按钮" prop="addShow">
            <ElRadioGroup v-model="data.form.addShow">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="显示编辑按钮" prop="editShow">
            <ElRadioGroup v-model="data.form.editShow">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="显示删除按钮" prop="deleteShow">
            <ElRadioGroup v-model="data.form.deleteShow">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="显示复制按钮" prop="copyShow">
            <ElRadioGroup v-model="data.form.copyShow">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="显示详情按钮" prop="viewShow">
            <ElRadioGroup v-model="data.form.viewShow">
              <ElRadio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :value="item?.value">
                {{ item?.label }}
              </ElRadio>
            </ElRadioGroup>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.addShow" :lg="24" :xl="12">
          <ElFormItem label="新增按钮权限" prop="addAuth">
            <ElInput v-model="data.form.addAuth" clearable>
              <template #append>
                <ElButton type="primary" @click="onGen('add')">
                  生成
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.editShow" :lg="24" :xl="12">
          <ElFormItem label="编辑按钮权限" prop="editAuth">
            <ElInput v-model="data.form.editAuth" clearable>
              <template #append>
                <ElButton type="primary" @click="onGen('edit')">
                  生成
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.deleteShow" :lg="24" :xl="12">
          <ElFormItem label="删除按钮权限" prop="deleteAuth">
            <ElInput v-model="data.form.deleteAuth" clearable>
              <template #append>
                <ElButton type="primary" @click="onGen('delete')">
                  生成
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.copyShow" :lg="24" :xl="12">
          <ElFormItem label="复制按钮权限" prop="copyAuth">
            <ElInput v-model="data.form.copyAuth" clearable @click="onGen('copy')">
              <template #append>
                <ElButton type="primary">
                  生成
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.viewShow" :lg="24" :xl="12">
          <ElFormItem label="详情按钮权限" prop="viewAuth">
            <ElInput v-model="data.form.viewAuth" clearable>
              <template #append>
                <ElButton type="primary" @click="onGen('view')">
                  生成
                </ElButton>
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <PageHeader title="SQL信息" />
      <ElRow :gutter="30" style="padding: 20px;">
        <!--        <el-col :xl="12" :lg="24"> -->
        <!--          <el-form-item label="菜单所属应用" prop="menuApplicationId"> -->
        <!--            <el-select -->
        <!--              v-model="data.form.menuApplicationId" placeholder="请选择" -->
        <!--            > -->
        <!--              <el-option -->
        <!--                v-for="item in data.dicts?.get('LogType') || []" :key="item.value" :label="item.label" -->
        <!--                :value="item.value" -->
        <!--              /> -->
        <!--            </el-select> -->
        <!--          </el-form-item> -->
        <!--        </el-col> -->
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="上级菜单" prop="menuParentId">
            <ElTreeSelect
              v-model="data.form.menuParentId"
              :check-strictly="true"
              :data="data.dicts?.get('menuList') || []"
              :render-after-expand="false"
              :default-expanded-keys="['10']"
              :props="{ label: 'title' }"
              node-key="id"

              highlight-current show-checkbox
            >
              <template #default="{ data: item }">
                <SvgIcon v-if="item.icon" :name="item.icon" class="ml-1 mr-1" size="16" />
                <ElTag :type="getResourceTagColor(item.resourceType)" class="mr-1">
                  {{ item?.echoMap?.resourceType }}
                </ElTag>
                {{ item.title }}
              </template>
            </ElTreeSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem clearable label="当前菜单名" prop="menuName">
            <ElInput v-model="data.form.menuName" clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem label="菜单图标" prop="menuIcon">
            <IconPicker v-model="data.form.menuIcon" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <template v-if="['TREE', 'MAIN_SUB'].includes(data.form.tplType)">
        <PageHeader title="其他信息" />
        <ElRow>
          <ElCol v-if="data.form.tplType === 'TREE'" :lg="24" :xl="12">
            <ElFormItem clearable label="树名称字段" prop="treeName">
              <ElInput v-model="data.form.treeName" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol v-if="data.form.tplType === 'MAIN_SUB'" :lg="24" :xl="12">
            <ElFormItem clearable label="从表" prop="subId">
              <ElSelect
                v-model="data.form.subId" placeholder="请选择"
              >
                <ElOption
                  v-for="item in data.dicts?.get('genTableList') || []" :key="item.id" :label="item.name"
                  :value="item.id"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol v-if="data.form.tplType === 'MAIN_SUB'" :lg="24" :xl="12">
            <ElFormItem clearable label="从表实体字段名" prop="subJavaFieldName">
              <ElInput v-model="data.form.subJavaFieldName" clearable />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </template>
      <ElRow class="justify-center">
        <div>
          <ElButton @click="() => (form?.resetFields())">
            重置
          </ElButton>
          <ElButton @click="onOk()">
            提交
          </ElButton>
        </div>
      </ElRow>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.page-main {
  .page-header {
    padding: 0;
    margin-bottom: 0;
  }

  &.gen-info {
    .el-select {
      width: 100%;
    }
  }

  .flex-container {
    position: static;

    .page-header {
      margin-inline: -15px;
      margin-top: -15px;
      background-color: var(--el-disabled-bg-color);
    }
  }
}
</style>
@/api/modules/system/resource
