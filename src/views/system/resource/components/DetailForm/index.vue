<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import crudResource from '@/api/modules/system/resource'
import { ActionEnum, DictEnum } from '@/enums/commonEnum.ts'
import type { FormConfig } from '#/global'
import type { ResourceResultVO } from '@/api/modules/system/model/ResourceModel.ts'
import { dictComponentProps } from '@/util/common.ts'
import { DataScopeEnum, ResourceTypeEnum } from '@/enums/common/tenant.ts'
import ResourceApi from '@/views/system/resource/components/DetailForm/ResourceApi.vue'

export interface Props {
  id?: string
  type?: ActionEnum
  currentData: { [key: string]: any }
  parent: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {
  type: ActionEnum.ADD,
  currentData: () => ({
    id: '',
    label: '',
    type: '02',
    state: true,
  }),
  parent: () => ({
    id: '',
    name: '',
    applicationId: '',
  }),
})
const emits = defineEmits<{
  'update:type': [
    value?: ActionEnum,
  ]
}>()

const { t } = useI18n()

const current = computed(() => props.currentData)
const defaultForm = {
  id: props.id,
  parentName: props.parent?.name as string ?? '',
  parentId: props.parent?.id as string ?? '',
  sortValue: props.currentData.sort as unknown as number ?? 0,
  path: '',
  redirect: '',
  name: '',
  component: '',
  resourceType: ResourceTypeEnum.MENU,
  title: '',
  icon: '',
  activeIcon: '',
  meta: {
    defaultOpened: false,
    permanent: false,
    auth: [],
    sidebar: true,
    breadcrumb: true,
    activeMenu: '',
    cache: [],
    noCache: [],
    badge: '',
    link: '',
    iframe: '',
    copyright: false,
    paddingBottom: '0px',
  },
  auths: [],
}
const data = ref<FormConfig<ResourceResultVO>>({
  loading: false,
  form: {
    ...defaultForm,
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入菜单名称',
        trigger: 'blur',
      },
    ],
    // path: [
    //   { required: true, message: '请输入菜单路径', trigger: 'blur' },
    // ],
    sortValue: [
      {
        required: true,
        message: '请输入排序',
        trigger: 'blur',
      },
    ],
    title: [{
      required: true,
      message: '请输入显示名称',
      trigger: 'blur',
    }],
  },
  dicts: new Map<string, any>(),
})

const form = ref<FormInstance>()

onMounted(() => {
  if (data.value.form.id) {
    getInfo(data.value.form.id)
  }
})

watch(() => [props.id, props.type, props.currentData.id], () => {
  form.value?.resetFields()
  if (props.type === ActionEnum.ADD) {
    data.value.form = {
      ...defaultForm,
      parentId: props.parent?.id as string ?? '',
      parentName: props.parent?.name as string ?? '',
      applicationId: current.value.applicationId as string ?? '',
      sortValue: props.currentData.sort as unknown as number ?? 0,
    }
  }
  else {
    // data.value.form = deepClone(unref(current))
    data.value.form.parentName = props.parent?.name as string ?? ''

    if (props.id) {
      getInfo(props.id)
    }
  }
}, { immediate: true })

function getInfo(id: string) {
  data.value.loading = true
  crudResource.detail(id).then((res) => {
    data.value.loading = false
    Object.assign(data.value.form, res)
    data.value.form.parentName = props.parent?.title as string ?? ''
    data.value.auths = []
    data.value.form.meta = JSON.parse(res.metaJson ?? '')
    data.value.form.meta.auth = data.value.form.meta.auth ?? []
    data.value.form.meta.cache = data.value.form.meta.cache ?? []
    data.value.form.meta.noCache = data.value.form.meta.noCache ?? []
  })
}

const auth = ref('')
const authShow = ref(false)
const InputAuthRef = ref()

function handleRemoveAuth(value: string) {
  data.value.form.meta.auth.splice(data.value.form.meta.auth.indexOf(value), 1)
}

function handleAddAuth() {
  authShow.value = true

  nextTick(() => {
    InputAuthRef.value.input.focus()
  },
  )
}

function handleEnterAuth() {
  if (auth.value) {
    if (data.value.form.meta.auth.includes(auth.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      data.value.form.meta.auth.push(auth.value)
    }
  }
  authShow.value = false
  auth.value = ''
}

const cache = ref('')
const cacheShow = ref(false)
const InputCacheRef = ref()

function handleRemoveCache(value: string) {
  typeof data.value.form.meta.cache == 'object' && data.value.form.meta.cache.splice(data.value.form.meta.cache.indexOf(value), 1)
}

function handleEnterCache() {
  if (cache.value) {
    if (typeof data.value.form.meta.cache == 'object' && data.value.form.meta.cache.includes(cache.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      typeof data.value.form.meta.cache == 'object' && data.value.form.meta.cache.push(cache.value)
    }
  }
  cacheShow.value = false
  cache.value = ''
}

function handleAddCache() {
  cacheShow.value = true

  nextTick(() => {
    InputCacheRef.value.input.focus()
  },
  )
}

const noCache = ref('')
const noCacheShow = ref(false)
const InputNoCacheRef = ref()

function handleRemoveNoCache(value: string) {
  typeof data.value.form.meta.noCache == 'object' && data.value.form.meta.noCache.splice(data.value.form.meta.noCache.indexOf(value), 1)
}

function handleEnterNoCache() {
  if (noCache.value) {
    if (typeof data.value.form.meta.noCache == 'object' && data.value.form.meta.noCache.includes(noCache.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      typeof data.value.form.meta.noCache == 'object' && data.value.form.meta.noCache.push(noCache.value)
    }
  }
  noCacheShow.value = false
  noCache.value = ''
}

function handleAddNoCache() {
  noCacheShow.value = true

  nextTick(() => {
    InputNoCacheRef.value.input.focus()
  },
  )
}

defineExpose({
  reset() {
    form.value?.resetFields()
    Object.assign(data.value.form, props.currentData)
  },
  submit(callback: any) {
    form.value?.validate((valid) => {
      if (valid) {
        const dataFrom: any = cloneDeep(unref(data).form)
        dataFrom.auth = dataFrom.auth?.join(',')
        dataFrom.noCache = dataFrom.noCache?.join(',')
        dataFrom.cache = typeof dataFrom.cache === 'object' ? dataFrom.cache?.join(',') : dataFrom.cache
        dataFrom.metaJson = JSON.stringify(dataFrom.meta)
        dataFrom.auths = dataFrom.auths ?? []
        delete dataFrom.meta
        if (props.type === ActionEnum.ADD) {
          crudResource.save(dataFrom).then(() => {
            ElMessage.success({
              message: t('common.tips.addSuccess'),
              center: true,
            })
            emits('update:type', undefined)
            callback && callback()
          })
        }
        else if (props.type === ActionEnum.EDIT) {
          crudResource.update(dataFrom).then(() => {
            ElMessage.success({
              message: t('common.tips.editSuccess'),
              center: true,
            })
            emits('update:type', undefined)
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
  <ElForm ref="form" v-loading="data.loading" class="h-full w-full" :model="data.form" :rules="data.rules" label-position="top">
    <div class="form-left-side">
      <PageHeader v-if="data.form.parentId" title="基础配置" content="标准路由配置，包含 path/redirect/name/component" />
      <ElRow v-if="data.form.parentId" :gutter="30" style="padding: 20px;">
        <ElCol :xl="12" :lg="24">
          <ElFormItem label="目录" prop="resourceType">
            <ApiRadioGroup
              v-model="data.form.resourceType" v-bind="dictComponentProps(DictEnum.RESOURCE_TYPE)"
              :disabled="type === ActionEnum.VIEW"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :xl="12" :lg="24">
          <ElFormItem prop="parentName" :label="t('system.resource.parentName')">
            <ElInput v-model="data.form.parentName" disabled clearable />
          </ElFormItem>
        </ElCol>
        <ElCol :xl="12" :lg="24">
          <ElFormItem prop="code" :label="t('system.resource.code')">
            <template #label>
              {{ t('system.resource.code') }}
              <ElTooltip>
                <template #content>
                  编码规则：按层级结构编码，使用:作为分隔符 <br>
                  并且，建议以view、add、edit、delete、export、import、download、upload等关键词结尾<br>
                  如：authority:menu:add 只有菜单新增权限<br>
                  如：tenant:tenant:initConnect;tenant:datasourceConfig:view 租户初始化和数据源查询权限<br>
                  如：authority:resource:* 资源模块任意权限<br>
                  如：msg:sms:add,edit 短信功能的新增和修改权限<br>
                </template>
                <SvgIcon name="i-ri:question-line" />
              </ElTooltip>
            </template>
            <ElInput v-model="data.form.code" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入编码" />
          </ElFormItem>
        </ElCol>
        <ElCol :xl="12" :lg="24">
          <ElFormItem prop="title" :label="t('system.resource.title')">
            <ElInput v-model="data.form.title" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入显示名称" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="path" :label="t('system.resource.path')">
            <ElInput v-model="data.form.path" clearable :disabled="type === ActionEnum.VIEW" :placeholder="t('common.inputText')" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="redirect" :label="t('system.resource.redirect')">
            <ElInput v-model="data.form.redirect" clearable :disabled="type === ActionEnum.VIEW" placeholder="请输入重定向地址" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="!(data.form.resourceType !== ResourceTypeEnum.VIEW) && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) " :lg="24" :xl="12">
          <ElFormItem prop="name" label="路由命名">
            <template #label>
              {{ t('system.resource.name') }}
              <span class="label-tip"> 即 name ，系统唯一</span>
            </template>
            <ElInput v-model="data.form.name" clearable :disabled="type === ActionEnum.VIEW" placeholder="请输入路由命名" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="!(data.form.resourceType !== ResourceTypeEnum.VIEW) && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) " :lg="24" :xl="12">
          <ElFormItem :label="t('system.resource.component')" prop="component">
            <template #label>
              {{ t('system.resource.component') }}
              <span class="label-tip"> 顶级路由请设置“
                <ElLink
                  type="primary" :underline="true"
                  @click.prevent="() => data.form.component = 'LAYOUT'"
                >LAYOUT</ElLink>
                ”，中间层级路由无需设置
              </span>
            </template>
            <ElInput v-model="data.form.component" clearable :disabled="type === ActionEnum.VIEW">
              <template v-if="data.form.component !== 'LAYOUT'" #prepend>
                /src/views/
              </template>
            </ElInput>
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem :label="t('system.resource.state')" prop="state">
            <template #label>
              {{ t('system.resource.state') }}
              <span class="label-tip">禁用状态的资源不在可用</span>
            </template>
            <ElSwitch v-model="data.form.state" :disabled="type === ActionEnum.VIEW" active-text="启用" inactive-text="禁用" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol :lg="24" :xl="12">
          <ElFormItem :label="t('system.resource.isGeneral')" prop="isGeneral">
            <template #label>
              {{ t('system.resource.isGeneral') }}
              <span class="label-tip">公共资源无需分配权限即可访问</span>
            </template>
            <ElSwitch v-model="data.form.isGeneral" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :lg="24" :xl="12">
          <ElFormItem :label="t('system.resource.subGroup')" prop="subGroup">
            <template #label>
              {{ t('system.resource.subGroup') }}
              <span class="label-tip">
                用于区分不同位置的一组资源
              </span>
            </template>
            <ElInput v-model="data.form.subGroup" :disabled="type === ActionEnum.VIEW" clearable />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <PageHeader v-if="[ResourceTypeEnum.FIELD, ResourceTypeEnum.DATA].includes(data.form.resourceType as ResourceTypeEnum)" title="特性信息" content="每种类型拥有不同的字段" />
      <ElRow v-if="data.form.parentId && [ResourceTypeEnum.FIELD, ResourceTypeEnum.DATA].includes(data.form.resourceType as ResourceTypeEnum)" :gutter="30" style="padding: 20px;">
        <ElCol v-if="data.form.resourceType === ResourceTypeEnum.FIELD" :xl="12" :lg="24">
          <ElFormItem prop="fieldIsSecret" :label="t('system.resource.fieldIsSecret')">
            <ElSwitch v-model="data.form.fieldIsSecret" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.resourceType === ResourceTypeEnum.FIELD" :xl="12" :lg="24">
          <ElFormItem prop="fieldIsEdit" :label="t('system.resource.fieldIsEdit')">
            <ElSwitch v-model="data.form.fieldIsEdit" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.resourceType === ResourceTypeEnum.DATA" :xl="24" :lg="24">
          <ElFormItem prop="dataScope" :label="t('system.resource.dataScope')">
            <ApiRadioGroup
              v-model="data.form.dataScope" v-bind="dictComponentProps(DictEnum.RESOURCE_DATA_SCOPE)"
              :disabled="type === ActionEnum.VIEW"
            />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.resourceType === ResourceTypeEnum.DATA" :xl="12" :lg="24">
          <ElFormItem prop="isDef" :label="t('system.resource.isDef')">
            <ElSwitch v-model="data.form.isDef" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.resourceType === ResourceTypeEnum.DATA && data.form.dataScope === DataScopeEnum.CUSTOM" :xl="12" :lg="24">
          <ElFormItem prop="customClass" :label="t('system.resource.customClass')">
            <template #label>
              {{ t('system.resource.customClass') }}
              <ElTooltip>
                <template #content>
                  1. 自行创建一个类，并实现DataScopeProvider接口 <br>
                  2. 在实现类上标记注解：@Component("DATA_SCOPE_XXXX")<br>
                  3. 在此参数上配置：DATA_SCOPE_XXXX" placement="top
                </template>
                <SvgIcon name="i-ri:question-line" />
              </ElTooltip>
            </template>
            <ElInput v-model="data.form.customClass" :disabled="type === ActionEnum.VIEW" clearable placeholder="以&quot;DATA_SCOPE_&quot;为前缀的自定义实现类" />
          </ElFormItem>
        </ElCol>
      </ElRow>

      <PageHeader v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" title="扩展配置" content="框架扩展配置，详细配置介绍请查看" />
      <ElRow :gutter="30" style="padding: 20px;">
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="auth" :label="t('system.resource.auth')">
            <template #label>
              {{ t('system.resource.auth') }}
              <ElTooltip content="当设置多个标识时，只要命中其中一个则鉴权通过" placement="top">
                <SvgIcon name="i-ri:question-line" />
              </ElTooltip>
            </template>
            <ElSpace>
              <ElTag
                v-for="tag in data.form.meta.auth" :key="tag" :disable-transitions="false" class="mx-1" size="large"
                :closable="type !== ActionEnum.VIEW" @close="handleRemoveAuth(tag)"
              >
                {{ tag }}
              </ElTag>
              <ElInput
                v-if="authShow" ref="InputAuthRef" v-model="auth" :disabled="type === ActionEnum.VIEW" style=" width: 200px;" placeholder=""
                @keydown.enter="handleEnterAuth" @blur="handleEnterAuth"
              />
              <ElButton v-if="type !== ActionEnum.VIEW" @click="handleAddAuth">
                新增
              </ElButton>
            </ElSpace>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="icon" :label="t('system.resource.icon')">
            <IconPicker v-model="data.form.icon" :disabled="type === ActionEnum.VIEW" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="[ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="activeIcon" :label="t('system.resource.activeIcon')">
            <IconPicker v-model="data.form.activeIcon" :disabled="type === ActionEnum.VIEW" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="defaultOpened" :label="t('system.resource.meta.defaultOpened')">
            <ElSwitch v-model="data.form.meta.defaultOpened" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="permanent" :label="t('system.resource.meta.permanent')">
            <template #label>
              {{ t('system.resource.meta.permanent') }}
              <span class="label-tip"> 请勿在带有参数的路由地址上开启该设置</span>
            </template>
            <ElSwitch v-model="data.form.meta.permanent" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="sidebar" :label="t('system.resource.meta.sidebar')">
            <ElSwitch v-model="data.form.isHidden" :disabled="type === ActionEnum.VIEW" active-text="显示" inactive-text="隐藏" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum)" :xl="12" :lg="24">
          <ElFormItem prop="breadcrumb" :label="t('system.resource.meta.breadcrumb')">
            <ElSwitch v-model="data.form.meta.breadcrumb" :disabled="type === ActionEnum.VIEW" active-text="显示" inactive-text="隐藏" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="cache" :label="t('system.resource.meta.cache')">
            <template #label>
              {{ t('system.resource.meta.cache') }}
              <ElTooltip content="当跳转到设置的路由时，则会对当前路由进行缓存" placement="top">
                <SvgIcon name="i-ri:question-line" />
              </ElTooltip>
              <span v-if="type !== ActionEnum.VIEW" class="label-tip">切换为
                <ElLink v-show="typeof data.form.meta.cache === 'object'" type="primary" @click="data.form.meta.cache = true">
                  始终缓存
                </ElLink>
                <ElLink v-show="typeof data.form.meta.cache === 'boolean'" type="primary" @click="data.form.meta.cache = []">
                  规则模式
                </ElLink>
              </span>
            </template>

            <ElSpace v-show="typeof data.form.meta.cache === 'object'">
              <ElTag
                v-for="cache in data.form.meta.cache" :key="cache" class="mx-1" size="large"
                :disable-transitions="false" :closable="type !== ActionEnum.VIEW" @close="handleRemoveCache(cache as string)"
              >
                {{ cache }}
              </ElTag>
              <ElInput
                v-if="cacheShow" ref="InputCacheRef" v-model="cache" style=" width: 200px;"
                :disabled="type === ActionEnum.VIEW"
                @keydown.enter="handleEnterCache" @blur="handleEnterCache"
              />
              <ElButton v-show="type !== ActionEnum.VIEW" @click="handleAddCache">
                {{ t('common.title.add') }}
              </ElButton>
            </ElSpace>
            <div v-show="type !== ActionEnum.VIEW && typeof data.form.meta.cache === 'boolean' ">
              始终缓存
            </div>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="noCache" :label="t('system.resource.meta.noCache')">
            <template #label>
              {{ t('system.resource.meta.noCache') }}
              <ElTooltip content="当跳转到设置的路由时，则会对当前路由取消缓存" placement="top">
                <SvgIcon name="i-ri:question-line" />
              </ElTooltip>
              <span class="label-tip">当缓存规则为“始终缓存”时生效</span>
            </template>
            <ElSpace>
              <ElTag
                v-for="noCache in data.form.meta.noCache" :key="noCache" class="mx-1" size="large"
                :disable-transitions="false" :closable="type !== ActionEnum.VIEW" @close="handleRemoveNoCache(noCache)"
              >
                {{ noCache }}
              </ElTag>
              <ElInput
                v-if="noCacheShow" ref="InputNoCacheRef" v-model="noCache" style=" width: 200px;"
                placeholder="" @keydown.enter="handleEnterNoCache" @blur="handleEnterNoCache"
              />
              <ElButton v-show="type !== ActionEnum.VIEW" @click="handleAddNoCache">
                {{ t('common.title.add') }}
              </ElButton>
            </ElSpace>
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="activeMenu" :label="t('system.resource.meta.activeMenu')">
            <template #label>
              {{ t('system.resource.meta.activeMenu') }}
              <span class="label-tip">如果子路由不在导航显示，则需要设置高亮的上级路由地址</span>
            </template>
            <ElInput v-model="data.form.meta.activeMenu" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入高亮导航的完整路由地址" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) " :xl="12" :lg="24">
          <ElFormItem prop="badge" :label="t('system.resource.meta.badge')">
            <template #label>
              {{ t('system.resource.meta.badge') }}
              <span class="label-tip">不宜设置太长，建议控制在4个字符内</span>
            </template>
            <ElInput v-model="data.form.meta.badge" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入徽标显示内容" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="newWindow" :label="t('system.resource.meta.newWindow')">
            <template #label>
              {{ t('system.resource.meta.newWindow') }}
            </template>
            <ElSwitch v-model="data.form.meta.newWindow" :disabled="type === ActionEnum.VIEW" active-text="是" inactive-text="否" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="link" :label="t('system.resource.meta.link')">
            <template #label>
              {{ t('system.resource.meta.link') }}
              <span class="label-tip">请设置 http/https 开头的完整外链地址</span>
            </template>
            <ElInput v-model="data.form.meta.link" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入网址" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="iframe" :label="t('system.resource.meta.iframe')">
            <template #label>
              {{ t('system.resource.meta.iframe') }}
              <span class="label-tip">请勿与外链同时设置，同时设置时，本设置会失效</span>
            </template>
            <ElInput v-model="data.form.meta.iframe" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入网址" />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="copyright" :label="t('system.resource.meta.copyright')">
            <ElSwitch v-model="data.form.meta.copyright" :disabled="type === ActionEnum.VIEW" active-text="显示" inactive-text="隐藏" inline-prompt />
          </ElFormItem>
        </ElCol>
        <ElCol v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW].includes(data.form.resourceType as ResourceTypeEnum) && !(data.form.resourceType !== ResourceTypeEnum.VIEW)" :lg="24" :xl="12">
          <ElFormItem prop="paddingBottom" :label="t('system.resource.meta.paddingBottom')">
            <template #label>
              {{ t('system.resource.meta.paddingBottom') }}
              <span class="label-tip">请设置有效的长度单位，例如：px/em/rem等</span>
            </template>
            <ElInput v-model="data.form.meta.paddingBottom" :disabled="type === ActionEnum.VIEW" clearable placeholder="请输入底部填充高度" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow v-if="data.form.parentId && [ResourceTypeEnum.MENU, ResourceTypeEnum.VIEW, ResourceTypeEnum.FUNCTION].includes(data.form.resourceType as ResourceTypeEnum)">
        <ElCol :lg="24" :xl="24">
          <ElFormItem prop="paddingBottom" :label="t('system.resource.meta.paddingBottom')">
            <ResourceApi v-model="data.form.resourceApiList" :type="type" />
          </ElFormItem>
        </ElCol>
      </ElRow>
    </div>
  </ElForm>
</template>

<style lang="scss" scoped>
// scss
.el-form {
  display: flex;
  flex: 1
}

.page-header {
  margin-bottom: 0;
  background-color: var(--el-disabled-bg-color)
}
.form-left-side {
  flex: 1;
  padding: var(--container-padding);
  overflow: auto;
  background-color: var(--g-container-bg);
  transition: background-color .3s;
  .label-tip {
    display: inline-flex;
    margin-left: 10px;
    color: var(--el-text-color-disabled);
  }
  .el-scrollbar__view {
    overflow-x: hidden;
  }
}

.form-right-side {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: var(--container-padding);
  background-color: var(--g-container-bg);
  border-left: 1px dashed var(--el-disabled-border-color);
  transition: background-color .3s;

}
</style>
