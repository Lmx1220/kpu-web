<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { cloneDeep } from 'lodash-es'

import crudResource from '@/api/modules/system/resource'
import useSettingsStore from '@/store/modules/settings'
import type { ResourceResultVO } from '@/api/modules/system/model/ResourceModel.ts'
import eventBus from '@/util/eventBus.ts'
import { ActionEnum } from '@/enums/commonEnum'

defineOptions({
  name: 'ResourceDetail',
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const tabbar = useTabbar()

function handleBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({
      name: 'SystemResourceList',
    })
  }
  else {
    router.push({
      name: 'SystemResourceList',
    })
  }
}

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref<ResourceResultVO>({
  id: route.params.id as any ?? '',
  parentId: route.query.parentId as string ?? '',
  sortValue: route.query.sort as unknown as number ?? 0,
  path: '',
  redirect: '',
  name: '',
  component: '',
  resourceType: '10',
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
},
)
const rules = reactive({
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
})
onMounted(() => {
  if (form.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  if (!form.value.id) {
    return
  }
  loading.value = true
  crudResource.detail(form.value.id).then((res) => {
    loading.value = false
    form.value = res
    form.value.meta = JSON.parse(res.metaJson ?? '')
  }).catch(() => {
    loading.value = false
  })
}
function handleSubmit() {
  formRef.value && formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const data: any = cloneDeep(unref(form))
        data.auth = data.auth?.join(',')
        data.noCache = data.noCache?.join(',')
        data.cache = typeof data.cache === 'object' ? data.cache?.join(',') : data.cache
        data.metaJson = JSON.stringify(data.meta)
        data.auths = data.auths ?? []
        delete data.meta
        if (form.value.id === '') {
          await crudResource.save(data)
          ElMessage.success({
            message: t(`common.tips.${ActionEnum.ADD}Success`),
            center: true,
          })
          eventBus.emit('get-data-list')
          handleBack()
        }
        else {
          await crudResource.update(data)
          ElMessage.success({
            message: t(`common.tips.${ActionEnum.EDIT}Success`),
            center: true,
          })
          eventBus.emit('get-data-list')
          handleBack()
        }
      }
      catch (error: any) {
        console.error(error)
        if (error && error.msg) {
          console.error(error.msg)
          ElMessage.error({
            message: error.msg,
            center: true,
          })
        }
      }
    }
  })
}

const auth = ref('')
const authShow = ref(false)
const InputAuthRef = ref()

function handleRemoveAuth(value: string) {
  form.value.meta.auth.splice(form.value.meta.auth.indexOf(value), 1)
}

function handleEnterAuth() {
  if (auth.value) {
    if (form.value.meta.auth.includes(auth.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      form.value.meta.auth.push(auth.value)
    }
  }
  authShow.value = false
  auth.value = ''
}

function handleAddAuth() {
  authShow.value = true

  nextTick(() => {
    InputAuthRef.value.input.focus()
  },
  )
}

function handleAddAuths() {
  form.value.auths.push({
    id: undefined,
    sortValue: form.value.auths.length + 1,
    name: '',
    code: '',
  })
}

function handleDelAuths(index: number) {
  form.value.auths.splice(index, 1)
}

const cache = ref('')
const cacheShow = ref(false)
const InputCacheRef = ref()

function handleRemoveCache(value: string) {
  typeof form.value.meta.cache == 'object' && form.value.meta.cache.splice(form.value.meta.cache.indexOf(value), 1)
}

function handleEnterCache() {
  if (cache.value) {
    if (typeof form.value.meta.cache == 'object' && form.value.meta.cache.includes(cache.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      typeof form.value.meta.cache == 'object' && form.value.meta.cache.push(cache.value)
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
  typeof form.value.meta.noCache == 'object' && form.value.meta.noCache.splice(form.value.meta.noCache.indexOf(value), 1)
}

function handleEnterNoCache() {
  if (noCache.value) {
    if (typeof form.value.meta.noCache == 'object' && form.value.meta.noCache.includes(noCache.value)) {
      ElMessage.warning('标识已存在')
    }
    else {
      typeof form.value.meta.noCache == 'object' && form.value.meta.noCache.push(noCache.value)
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

const authsTableRef = ref()
const authsTableKey = ref(0)
onMounted(() => {
  TableSortable()
})

function TableSortable() {
  const tbody = authsTableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    handle: '.sortable',
    animation: 300,
    ghostClass: 'ghost',
    onEnd: ({
      newIndex,
      oldIndex,
    }) => {
      if (newIndex === undefined || oldIndex === undefined) {
        return
      }
      const row = form.value.auths.splice(oldIndex, 1)[0]
      form.value.auths.splice(newIndex, 0, row)
      form.value.auths.map((item, index) => ({
        ...item,
        sortValue: item.sortValue = index + 1,
      }))
      authsTableKey.value += 1
      nextTick(() => {
        TableSortable()
      })
    },
  })
}
</script>

<template>
  <div class="absolute-container">
    <PageHeader :title="(route.name === 'SystemResourceCreate' ? `${t('common.title.add')}` : `${t('common.title.edit')}`) + t('system.resource.object')">
      <ElButton round @click="handleBack">
        <template #icon>
          <SvgIcon name="i-ep:arrow-left" />
        </template>
        {{ t('common.back') }}
      </ElButton>
    </PageHeader>
    <div class="page-main">
      <ElForm ref="formRef" :model="form" :rules="rules" label-position="top">
        <LayoutContainer right-side-width="500px">
          <template #rightSide>
            <PageHeader title="权限池">
              <template #content>
                <p>设置导航所具备的所有权限，权限池内的权限会用于角色管理</p>
                <p style="margin-bottom: 0;">
                  通常只在最子级导航上进行设置
                </p>
              </template>
            </PageHeader>
            <ElTable ref="authsTableRef" :key="authsTableKey" :data="form.auths" stripe highlight-current-row border>
              <ElTableColumn align="center" fixed :label="t('system.resource.sortValue')" prop="sortValue" width="60">
                <template #header>
                  <ElButton type="primary" size="small" circle plain @click="handleAddAuths">
                    <SvgIcon name="i-ep:plus" />
                  </ElButton>
                </template>
                <template #default="{ $index }">
                  <span class="index">{{ $index + 1 }}</span>
                  <ElButton class="delete" type="danger" size="small" plain circle @click="handleDelAuths($index)">
                    <SvgIcon name="i-ep:delete" />
                  </ElButton>
                </template>
              </ElTableColumn>
              <ElTableColumn align="center" fixed :label="t('system.resource.sortValue')" prop="sortValue" width="80">
                <ElTag type="info" class="sortable">
                  <SvgIcon name="i-ep:d-caret" />
                </ElTag>
              </ElTableColumn>
              <ElTableColumn prop="name" :label="t('system.resource.name')">
                <template #default="{ row }">
                  <ElInput v-model="row.name" clearable placeholder="请输入名称" />
                </template>
              </ElTableColumn>
              <ElTableColumn prop="value" label="标识">
                <template #default="{ row }">
                  <ElInput v-model="row.code" clearable placeholder="请输入标识" />
                </template>
              </ElTableColumn>
            </ElTable>
          </template>
          <PageHeader v-if="form.parentId" title="基础配置" content="标准路由配置，包含 path/redirect/name/component" />
          <ElRow v-if="form.parentId" :gutter="30" style="padding: 20px;">
            <ElCol :xl="12" :lg="24">
              <ElFormItem label="目录" prop="resourceType">
                <ElSwitch
                  v-model="form.resourceType" :active-text="t('kpu.common.yes')" active-value="10" :inactive-text="t('kpu.common.no')"
                  inactive-value="20" inline-prompt
                />
              </ElFormItem>
            </ElCol>
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="path" :label="t('system.resource.path')">
                <ElInput v-model="form.path" clearable :placeholder="t('common.inputText')" />
              </ElFormItem>
            </ElCol>
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="redirect" :label="t('system.resource.path')">
                <ElInput v-model="form.redirect" clearable placeholder="请输入重定向地址" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="name" label="路由命名">
                <template #label>
                  {{ t('system.resource.path') }}
                  <span class="label-tip"> 即 name ，系统唯一</span>
                </template>
                <ElInput v-model="form.name" clearable placeholder="请输入路由命名" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem label="组件路径" prop="component">
                <template #label>
                  {{ t('system.resource.path') }}
                  <span class="label-tip"> 顶级路由请设置 <ElLink
                    type="primary" :underline="true"
                    @click.prevent="() => form.component = 'LAYOUT'"
                  >Layout</ElLink>”，中间层级路由无需设置</span>
                </template>
                <ElInput v-model="form.component" clearable>
                  <template v-if="form.component !== 'LAYOUT'" #prepend>
                    /src/views/
                  </template>
                </ElInput>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <PageHeader title="扩展配置" content="标准路由配置，包含 path/redirect/name/component">
            <template #content>
              框架扩展配置，详细配置介绍请查看
            </template>
          </PageHeader>
          <ElRow :gutter="30" style="padding: 20px;">
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="title" :label="t('system.resource.title')">
                <ElInput v-model="form.title" clearable placeholder="请输入显示名称" />
              </ElFormItem>
            </ElCol>
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="auth" :label="t('system.resource.auth')">
                <template #label>
                  {{ t('system.resource.auth') }}
                  <ElTooltip content="当设置多个标识时，只要命中其中一个则鉴权通过" placement="top">
                    <SvgIcon name="i-ri:question-line" />
                  </ElTooltip>
                </template>
                <ElSpace>
                  <ElTag
                    v-for="tag in form.meta.auth" :key="tag" :disable-transitions="false" class="mx-1" size="large"
                    closable @close="handleRemoveAuth(tag)"
                  >
                    {{ tag }}
                  </ElTag>
                  <ElInput
                    v-if="authShow" ref="InputAuthRef" v-model="auth" style=" width: 200px;" placeholder=""
                    @keydown.enter="handleEnterAuth" @blur="handleEnterAuth"
                  />
                  <ElButton @click="handleAddAuth">
                    新增
                  </ElButton>
                </ElSpace>
              </ElFormItem>
            </ElCol>
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="icon" :label="t('system.resource.sortValue')">
                <IconPicker v-model="form.icon" />
              </ElFormItem>
            </ElCol>
            <ElCol :xl="12" :lg="24">
              <ElFormItem prop="activeIcon" :label="t('system.resource.sortValue')">
                <IconPicker v-model="form.activeIcon" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId" :xl="12" :lg="24">
              <ElFormItem prop="defaultOpened" :label="t('system.resource.meta.defaultOpened')">
                <ElSwitch v-model="form.meta.defaultOpened" active-text="是" inactive-text="否" inline-prompt />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId" :xl="12" :lg="24">
              <ElFormItem prop="permanent" :label="t('system.resource.meta.permanent')">
                <template #label>
                  {{ t('system.resource.meta.permanent') }}
                  <span class="label-tip"> 请勿在带有参数的路由地址上开启该设置</span>
                </template>
                <ElSwitch v-model="form.meta.permanent" active-text="是" inactive-text="否" inline-prompt />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId" :xl="12" :lg="24">
              <ElFormItem prop="sidebar" :label="t('system.resource.meta.sidebar')">
                <ElSwitch v-model="form.meta.sidebar" active-text="显示" inactive-text="隐藏" inline-prompt />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId" :xl="12" :lg="24">
              <ElFormItem prop="breadcrumb" :label="t('system.resource.meta.breadcrumb')">
                <ElSwitch v-model="form.meta.breadcrumb" active-text="显示" inactive-text="隐藏" inline-prompt />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="cache" :label="t('system.resource.meta.cache')">
                <template #label>
                  {{ t('system.resource.meta.cache') }}
                  <ElTooltip content="当跳转到设置的路由时，则会对当前路由进行缓存" placement="top">
                    <SvgIcon name="i-ri:question-line" />
                  </ElTooltip>
                  <span class="label-tip">切换为
                    <ElLink v-show="typeof form.meta.cache === 'object'" type="primary" @click="form.meta.cache = true">
                      始终缓存
                    </ElLink>
                    <ElLink v-show="typeof form.meta.cache === 'boolean'" type="primary" @click="form.meta.cache = []">
                      规则模式
                    </ElLink>
                  </span>
                </template>

                <ElSpace v-show="typeof form.meta.cache === 'object'">
                  <ElTag
                    v-for="cache in form.meta.cache" :key="cache" class="mx-1" size="large"
                    :disable-transitions="false" closable @close="handleRemoveCache(cache as string)"
                  >
                    {{ cache }}
                  </ElTag>
                  <ElInput
                    v-if="cacheShow" ref="InputCacheRef" v-model="cache" style=" width: 200px;"
                    @keydown.enter="handleEnterCache" @blur="handleEnterCache"
                  />
                  <ElButton @click="handleAddCache">
                    {{ t('common.title.add') }}
                  </ElButton>
                </ElSpace>
                <div v-show="typeof form.meta.cache === 'boolean'">
                  始终缓存
                </div>
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
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
                    v-for="noCache in form.meta.noCache" :key="noCache" class="mx-1" size="large"
                    :disable-transitions="false" closable @close="handleRemoveNoCache(noCache)"
                  >
                    {{ noCache }}
                  </ElTag>
                  <ElInput
                    v-if="noCacheShow" ref="InputNoCacheRef" v-model="noCache" style=" width: 200px;"
                    placeholder="" @keydown.enter="handleEnterNoCache" @blur="handleEnterNoCache"
                  />
                  <ElButton @click="handleAddNoCache">
                    {{ t('common.title.add') }}
                  </ElButton>
                </ElSpace>
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="activeMenu" :label="t('system.resource.meta.activeMenu')">
                <template #label>
                  {{ t('system.resource.meta.activeMenu') }}
                  <span class="label-tip">如果子路由不在导航显示，则需要设置高亮的上级路由地址</span>
                </template>
                <ElInput v-model="form.meta.activeMenu" clearable placeholder="请输入高亮导航的完整路由地址" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId" :xl="12" :lg="24">
              <ElFormItem prop="badge" :label="t('system.resource.meta.badge')">
                <template #label>
                  {{ t('system.resource.meta.badge') }}
                  <span class="label-tip">不宜设置太长，建议控制在4个字符内</span>
                </template>
                <ElInput v-model="form.meta.badge" clearable placeholder="请输入徽标显示内容" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="link" :label="t('system.resource.meta.link')">
                <template #label>
                  {{ t('system.resource.meta.link') }}
                  <span class="label-tip">请设置 http/https 开头的完整外链地址</span>
                </template>
                <ElInput v-model="form.meta.link" clearable placeholder="请输入网址" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="iframe" :label="t('system.resource.meta.iframe')">
                <template #label>
                  {{ t('system.resource.meta.iframe') }}
                  <span class="label-tip">请勿与外链同时设置，同时设置时，本设置会失效</span>
                </template>
                <ElInput v-model="form.meta.iframe" clearable placeholder="请输入网址" />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="copyright" :label="t('system.resource.meta.copyright')">
                <ElSwitch v-model="form.meta.copyright" active-text="显示" inactive-text="隐藏" inline-prompt />
              </ElFormItem>
            </ElCol>
            <ElCol v-if="form.parentId && form.resourceType === '20'" :lg="24" :xl="12">
              <ElFormItem prop="paddingBottom" :label="t('system.resource.meta.paddingBottom')">
                <template #label>
                  {{ t('system.resource.meta.paddingBottom') }}
                  <span class="label-tip">请设置有效的长度单位，例如：px/em/rem等</span>
                </template>
                <ElInput v-model="form.meta.paddingBottom" clearable placeholder="请输入底部填充高度" />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </LayoutContainer>
      </ElForm>
    </div>
    <FixedActionBar>
      <ElButton type="primary" size="large" @click="handleSubmit">
        {{ t('common.okText') }}
      </ElButton>
      <ElButton size="large" @click="handleBack">
        {{ t('common.cancelText') }}
      </ElButton>
    </FixedActionBar>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-header {
    margin-bottom: 0;
  }

  .page-main,
  .el-form {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: auto;
  }

  .page-main {
    .flex-container {
      position: static;

      .page-header {
        margin-inline: -15px;
        margin-top: -15px;
        background-color: var(--el-disabled-bg-color);
      }

      :deep(.main .label-tip) {
        display: inline-flex;
        margin-left: 10px;
        color: var(--el-text-color-disabled);
      }

      :deep(.right-side) {
        display: flex;
        flex-direction: column;

        .el-table {
          height: 100%;
          margin-top: 15px;

          .el-table__row {
            .index {
              display: inline-block;
            }

            .delete,
            &:hover .index {
              display: none;
            }

            &:hover {
              .delete {
                display: inline-block;
              }
            }

            .el-tag.sortable,
            .el-tag.sortable .el-icon {
              cursor: s-resize;
            }
          }
        }
      }
    }
  }
}
</style>
