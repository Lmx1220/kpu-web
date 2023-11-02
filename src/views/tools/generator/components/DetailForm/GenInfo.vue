<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { camelCase } from 'lodash-es'
import yesOrNoEnum from '@/enums/common/yesOrNoEnum'
import type { FormConfig } from '#/global'
import type { GenTableUpdateVO } from '@/api/modules/tools/model/genTableModel'
import { query as getListDatasourceConfigQuery } from '@/api/modules/tools/datasourceConfig'
import type { DictOption } from '@/api/model/baseModel'
import { findEnumListByType } from '@/api/modules/common/dict'
import { resourceAuthTree } from '@/api/modules/system/menu'
import crudGenerator from '@/api/modules/tools/genTable'

export interface Props {
  id?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
})
defineOptions({
  name: 'GenInfo',
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
  const options: DictOption = await findEnumListByType([
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
  resourceAuthTree().then((res) => {
    data.value.dicts?.set('menuList', res)
  })
  getListDatasourceConfigQuery({}).then((records) => {
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
      crudGenerator.edit(newData as GenTableUpdateVO).then(() => {
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
    data.value.form[`${type}Auth`] = `${plusApplicationName}/${plusModuleName.replaceAll('/',':')}:${entityName}:${type}`
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
    <el-form ref="form" :model="data.form" :rules="data.rules" label-suffix="：" label-width="138" scroll-to-error>
      <page-header title="基础信息" />
      <el-row :gutter="30" style="padding: 20px;">
        <el-col v-if="isSingle" :lg="24" :xl="12">
          <el-form-item label="表名" prop="name">
            <el-input v-model="data.form.name" disabled />
          </el-form-item>
        </el-col>
        <el-col v-if="isSingle" :lg="24" :xl="12">
          <el-form-item label="数据源名" prop="dsId">
            <el-select
              v-model="data.form.dsId" disabled placeholder="请选择"
            >
              <el-option
                v-for="item in data.dicts?.get('DsEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="isSingle" :lg="24" :xl="12">
          <el-form-item label="实体类名" prop="entityName">
            <el-input v-model="data.form.entityName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="作者" prop="author">
            <el-input v-model="data.form.author" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="isSingle" :lg="24" :xl="12">
          <el-form-item label="表注释" prop="comment">
            <el-input v-model="data.form.comment" clearable />
          </el-form-item>
        </el-col>
        <el-col v-if="isSingle" :lg="24" :xl="12">
          <el-form-item label="swagger注释" prop="swaggerComment">
            <el-input v-model="data.form.swaggerComment" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="data.form.remark" clearable type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <page-header title="生成信息" />
      <el-row :gutter="30" style="padding: 20px;">
        <el-col :lg="24" :xl="12">
          <el-form-item label="服务名" prop="serviceName">
            <el-input v-model="data.form.serviceName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="父包名" prop="parent">
            <el-input v-model="data.form.parent" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="模块名" prop="moduleName">
            <el-input v-model="data.form.moduleName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="子包名" prop="childPackageName">
            <el-input v-model="data.form.childPackageName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="实体父类" prop="entitySuperClass">
            <el-select
              v-model="data.form.entitySuperClass" clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in data.dicts?.get('EntitySuperClassEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="父类" prop="superClass">
            <el-select
              v-model="data.form.superClass" clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in data.dicts?.get('SuperClassEnum') || []" :key="item.value" :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="24">
          <el-form-item label="@DS" prop="isDs">
            <el-radio-group v-model="data.form.isDs">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="@TenantLine" prop="isTenantLine">
            <el-radio-group v-model="data.form.isTenantLine">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="lombok" prop="isLombok">
            <el-radio-group v-model="data.form.isLombok">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="链式模型" prop="isChain">
            <el-radio-group v-model="data.form.isChain">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="生成字段常量" prop="isColumnConstant">
            <el-radio-group v-model="data.form.isColumnConstant">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="生成方式" prop="genType">
            <el-radio-group v-model="data.form.genType">
              <el-radio v-for="(item, index) in data.dicts?.get('GenTypeEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="24">
          <el-form-item label="后端生成路径" prop="outputDir">
            <el-input v-model="data.form.outputDir" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="24">
          <el-form-item label="前端生成路径" prop="frontOutputDir">
            <el-input v-model="data.form.frontOutputDir" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <page-header title="前端信息" />
      <el-row :gutter="30" style="padding: 20px;">
        <el-col :lg="24" :xl="12">
          <el-form-item label="前端应用名" prop="plusApplicationName">
            <el-input v-model="data.form.plusApplicationName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="前端模块名" prop="plusModuleName">
            <el-input v-model="data.form.plusModuleName" clearable >
              <template #prepend>/</template>
              <template #append>/</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="弹窗方式" prop="popupType">
            <el-radio-group v-model="data.form.popupType">
              <el-radio v-for="(item, index) in data.dicts?.get('PopupTypeEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="生成模板" prop="tplType">
            <el-radio-group v-model="data.form.tplType">
              <el-radio v-for="(item, index) in data.dicts?.get('TplEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示新增按钮" prop="addShow">
            <el-radio-group v-model="data.form.addShow">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示编辑按钮" prop="editShow">
            <el-radio-group v-model="data.form.editShow">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示删除按钮" prop="deleteShow">
            <el-radio-group v-model="data.form.deleteShow">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示复制按钮" prop="copyShow">
            <el-radio-group v-model="data.form.copyShow">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="显示详情按钮" prop="viewShow">
            <el-radio-group v-model="data.form.viewShow">
              <el-radio v-for="(item, index) in data.dicts?.get('YesOrNoEnum')" :key="index" :label="item?.value">
                {{ item?.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="data.form.addShow" :lg="24" :xl="12">
          <el-form-item label="新增按钮权限" prop="addAuth">
            <el-input v-model="data.form.addAuth" clearable>
              <template #append>
                <el-button type="primary" @click="onGen('add')">
                  生成
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="data.form.editShow" :lg="24" :xl="12">
          <el-form-item label="编辑按钮权限" prop="editAuth">
            <el-input v-model="data.form.editAuth" clearable>
              <template #append>
                <el-button type="primary" @click="onGen('edit')">
                  生成
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="data.form.deleteShow" :lg="24" :xl="12">
          <el-form-item label="删除按钮权限" prop="deleteAuth">
            <el-input v-model="data.form.deleteAuth" clearable>
              <template #append>
                <el-button type="primary" @click="onGen('delete')">
                  生成
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="data.form.copyShow" :lg="24" :xl="12">
          <el-form-item label="复制按钮权限" prop="copyAuth">
            <el-input v-model="data.form.copyAuth" clearable @click="onGen('copy')">
              <template #append>
                <el-button type="primary">
                  生成
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="data.form.viewShow" :lg="24" :xl="12">
          <el-form-item label="详情按钮权限" prop="viewAuth">
            <el-input v-model="data.form.viewAuth" clearable>
              <template #append>
                <el-button type="primary" @click="onGen('view')">
                  生成
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <page-header title="SQL信息" />
      <el-row :gutter="30" style="padding: 20px;">
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
        <el-col :lg="24" :xl="12">
          <el-form-item label="上级菜单" prop="menuParentId">
            <el-tree-select
              v-model="data.form.menuParentId"
              :check-strictly="true"
              :data="data.dicts?.get('menuList') || []"
              :render-after-expand="false"
              :default-expanded-keys="['10']"
              highlight-current
              node-key="id"
              show-checkbox
            >
              <template #default="{ data }">
                <svg-icon :name="data.icon" class="mr-1 ml-1" size="16" />
                <el-tag :type="getResourceTagColor(data.resourceType)" class="mr-1">
                  {{ data?.echoMap?.resourceType }}
                </el-tag>
                {{ data.label }}
              </template>
            </el-tree-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item clearable label="当前菜单名" prop="menuName">
            <el-input v-model="data.form.menuName" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :xl="12">
          <el-form-item label="菜单图标" prop="menuIcon">
            <IconPicker v-model="data.form.menuIcon" />
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="['TREE', 'MAIN_SUB'].includes(data.form.tplType)">
        <page-header title="其他信息" />
        <el-row>
          <el-col v-if="data.form.tplType === 'TREE'" :lg="24" :xl="12">
            <el-form-item clearable label="树名称字段" prop="treeName">
              <el-input v-model="data.form.treeName" clearable />
            </el-form-item>
          </el-col>
          <el-col v-if="data.form.tplType === 'MAIN_SUB'" :lg="24" :xl="12">
            <el-form-item clearable label="从表" prop="subId">
              <el-select
                v-model="data.form.subId" placeholder="请选择"
              >
                <el-option
                  v-for="item in data.dicts?.get('genTableList') || []" :key="item.id" :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="data.form.tplType === 'MAIN_SUB'" :lg="24" :xl="12">
            <el-form-item clearable label="从表实体字段名" prop="subJavaFieldName">
              <el-input v-model="data.form.subJavaFieldName" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-row class="justify-center">
        <div>
          <el-button @click="() => (form?.resetFields())">
            重置
          </el-button>
          <el-button @click="onOk()">
            提交
          </el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.page-main {
  .page-header {
    margin-bottom: 0;
    padding: 0;
  }

  &.gen-info {
    .el-select {
      width: 100%;
    }
  }

  .flex-container {
    position: static;

    .page-header {
      background-color: var(--el-disabled-bg-color);
      margin-inline: -15px;
      margin-top: -15px;
    }
  }
}
</style>
