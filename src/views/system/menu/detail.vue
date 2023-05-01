<script setup lang="ts" name="menuDetail">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { uniqueId } from 'lodash-es'
import Sortable from 'sortablejs'
import useSettingsStore from '@/store/modules/settings'
import type { Menu } from '@/types/global'

const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()
const tabbar = useTabbar()
function handleBack() {
  if (settingsStore.settings.tabbar.enable && settingsStore.settings.tabbar.mergeTabsBy !== 'activeMenu') {
    tabbar.close({
      name: 'menuList',
    })
  }
  else {
    router.push({
      name: 'menuList',
    })
  }
}

const formRef = ref<FormInstance>()

const form = ref<Menu.raw>(
  {
    id: '',
    parentId: '',
    name: '',
    path: '',
    redirect: '',
    component: '',
    auths: [],
    meta: {
      title: '',
      icon: '',
      activeIcon: '',
      i18n: '',
      defaultOpened: false,
      permanent: false,
      auth: [],
      sidebar: true,
      breadcrumb: true,
      copyright: false,
      cache: [],
      noCache: [],
      badge: '',
      link: '',
      iframe: '',
      paddingBottom: '',
      activeMenu: '',
    },
  },
)
const rules = reactive({
  'name': [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
  ],
  'path': [
    { required: true, message: '请输入菜单路径', trigger: 'blur' },
  ],
  'sort': [
    { required: true, message: '请输入排序', trigger: 'blur' },
  ],
  'meta.title': [{
    required: true,
    message: '请输入显示名称',
    trigger: 'blur',
  }],
})

function hanleSubmit() {
  if (form.value.id === '') {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        ElMessage.success({
          message: '模拟新增成功',
          center: true,
        })
        handleBack()
      }
    })
  }
  else {
    formRef.value && formRef.value.validate((valid) => {
      if (valid) {
        ElMessage.success({
          message: '模拟编辑成功',
          center: true,
        })
        handleBack()
      }
    },
    )
  }
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
    id: uniqueId(),
    sort: form.value.auths.length + 1,
    name: '',
    value: '',
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
    InputCacheRef.value.input.focus()
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
    onEnd: ({ newIndex, oldIndex }) => {
      if (!newIndex || !oldIndex) {
        return
      }
      const row = form.value.auths.splice(oldIndex, 1)[0]
      form.value.auths.splice(newIndex, 0, row)
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
    <page-header :title="route.name === 'menuCreate' ? '新增导航' : '编辑导航'">
      <el-button round @click="handleBack">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:arrow-left" />
          </el-icon>
        </template>
        返回
      </el-button>
    </page-header>
    <div class="page-main">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
        <LayoutContainer right-side-width="500px">
          <template #rightSide>
            <page-header title="权限池">
              <template #content>
                <p>设置导航所具备的所有权限，权限池内的权限会用于角色管理</p>
                <p style="margin-bottom: 0;">
                  通常只在最子级导航上进行设置
                </p>
              </template>
            </page-header>
            <ElTable ref="authsTableRef" :key="authsTableKey" :data="form.auths" border stripe highlight-current-row>
              <el-table-column prop="sort" label="排序" fixed align="center" width="60">
                <template #header>
                  <el-button type="primary" size="small" plain circle @click="handleAddAuths">
                    <el-icon>
                      <svg-icon name="i-ep:plus" />
                    </el-icon>
                  </el-button>
                </template>
                <template #default="{ $index }">
                  <span class="index">{{ $index + 1 }}</span>
                  <el-button class="delete" type="danger" size="small" plain circle @click="handleDelAuths($index)">
                    <el-icon>
                      <svg-icon name="i-ep:delete" />
                    </el-icon>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="排序" fixed align="center" width="80">
                <ElTag type="info" class="sortable">
                  <el-icon>
                    <svg-icon name="i-ep:d-caret" />
                  </el-icon>
                </ElTag>
              </el-table-column>
              <el-table-column prop="name" label="名称">
                <template #default="{ row }">
                  <el-input v-model="row.name" clearable placeholder="请输入名称" />
                </template>
              </el-table-column>
              <el-table-column prop="value" label="标识">
                <template #default="{ row }">
                  <el-input v-model="row.value" clearable placeholder="请输入标识" />
                </template>
              </el-table-column>
            </ElTable>
          </template>
          <page-header title="基础配置" content="标准路由配置，包含 path/redirect/name/component" />
          <el-row :gutter="30" style="padding: 20px;">
            <el-col :xl="12" :lg="24">
              <el-form-item prop="path" label="路由地址">
                <el-input v-model="form.path" clearable placeholder="请输入路由地址" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="redirect" label="重定向">
                <el-input v-model="form.redirect" clearable placeholder="请输入重定向地址" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="redirect" label="路由命名">
                <template #label>
                  路由命名
                  <span class="label-tip"> 即 name ，系统唯一</span>
                </template>
                <el-input v-model="form.name" clearable placeholder="请输入路由命名" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="redirect" label="组件路径">
                <template #label>
                  组件路径
                  <span class="label-tip"> 顶级路由请设置 <ElLink
                    type="primary" :underline="true"
                    @click.prevent="() => form.component = 'Layout'"
                  >Layout</ElLink>”，中间层级路由无需设置</span>
                </template>
                <el-input v-model="form.component" clearable>
                  <template v-if="form.component !== 'Layout'" #prepend>
                    /src/views/
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <page-header title="扩展配置" content="标准路由配置，包含 path/redirect/name/component">
            <template #content>
              框架扩展配置，详细配置介绍请查看 <ElLink
                type="primary"
                href="https://hooray.gitee.io/fantastic-admin/guide/router.html#%E5%AF%BC%E8%88%AA%E9%85%8D%E7%BD%AE"
                target="_blank"
              >
                框架文档
              </ElLink>
            </template>
          </page-header>
          <el-row :gutter="30" style="padding: 20px;">
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.title" label="显示名称">
                <el-input v-model="form.meta.title" clearable placeholder="请输入显示名称" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.auth" label="鉴权标识">
                <template #label>
                  鉴权标识
                  <el-tooltip content="当设置多个标识时，只要命中其中一个则鉴权通过" placement="top">
                    <el-icon>
                      <svg-icon name="i-ri:question-line" />
                    </el-icon>
                  </el-tooltip>
                </template>
                <el-space>
                  <ElTag
                    v-for="tag in form.meta.auth" :key="tag" class="mx-1" type="large" :disable-transitions="false"
                    closable @close="handleRemoveAuth(tag)"
                  >
                    {{ tag }}
                  </ElTag>
                  <el-input
                    v-if="authShow" ref="InputAuthRef" v-model="auth" style=" width: 200px;" placeholder=""
                    @keydown.enter="handleEnterAuth" @blur="handleEnterAuth"
                  />
                  <el-button @click="handleAddAuth">
                    新增
                  </el-button>
                </el-space>
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.icon" label="默认图标">
                <IconPicker v-model="form.meta.icon" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.activeIcon" label="激活图标">
                <IconPicker v-model="form.meta.activeIcon" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.defaultOpened" label="默认展开">
                <el-switch v-model="form.meta.defaultOpened" inline-prompt active-text="是" inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.permanent" label="常驻标签页">
                <template #label>
                  常驻标签页
                  <span class="label-tip"> 请勿在带有参数的路由地址上开启该设置</span>
                </template>
                <el-switch v-model="form.meta.permanent" inline-prompt active-text="是" inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.sidebar" label="在导航显示">
                <el-switch v-model="form.meta.sidebar" inline-prompt active-text="显示" inactive-text="隐藏" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.breadcrumb" label="在面包屑显示">
                <el-switch v-model="form.meta.breadcrumb" inline-prompt active-text="显示" inactive-text="隐藏" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.cache" label="缓存规则">
                <template #label>
                  缓存规则
                  <el-tooltip content="当跳转到设置的路由时，则会对当前路由进行缓存" placement="top">
                    <el-icon>
                      <svg-icon name="i-ri:question-line" />
                    </el-icon>
                  </el-tooltip>
                  <span class="label-tip">切换为
                    <ElLink v-show="typeof form.meta.cache === 'object'" type="primary" @click="form.meta.cache = true">
                      始终缓存
                    </ElLink>
                    <ElLink v-show="typeof form.meta.cache === 'boolean'" type="primary" @click="form.meta.cache = []">
                      规则模式
                    </ElLink>
                  </span>
                </template>

                <el-space v-show="typeof form.meta.cache === 'object'">
                  <ElTag
                    v-for="cache in form.meta.cache" :key="cache" class="mx-1" type="large"
                    :disable-transitions="false" closable @close="handleRemoveCache(cache as string)"
                  >
                    {{ cache }}
                  </ElTag>
                  <el-input
                    v-if="cacheShow" ref="InputCacheRef" v-model="cache" style=" width: 200px;"
                    @keydown.enter="handleEnterCache" @blur="handleEnterCache"
                  />
                  <el-button @click="handleAddCache">
                    新增
                  </el-button>
                </el-space>
                <div v-show="typeof form.meta.cache === 'boolean'">
                  始终缓存
                </div>
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.noCache" label="不缓存规则">
                <template #label>
                  不缓存规则
                  <el-tooltip content="当跳转到设置的路由时，则会对当前路由取消缓存" placement="top">
                    <el-icon>
                      <svg-icon name="i-ri:question-line" />
                    </el-icon>
                  </el-tooltip>
                  <span class="label-tip">当缓存规则为“始终缓存”时生效</span>
                </template>
                <el-space>
                  <ElTag
                    v-for="noCache in form.meta.noCache" :key="noCache" class="mx-1" type="large"
                    :disable-transitions="false" closable @close="handleRemoveNoCache(noCache)"
                  >
                    {{ noCache }}
                  </ElTag>
                  <el-input
                    v-if="noCacheShow" ref="InputNoCacheRef" v-model="noCache" style=" width: 200px;"
                    placeholder="" @keydown.enter="handleEnterNoCache" @blur="handleEnterNoCache"
                  />
                  <el-button @click="handleAddNoCache">
                    新增
                  </el-button>
                </el-space>
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.activeMenu" label="高亮导航">
                <template #label>
                  高亮导航
                  <span class="label-tip">如果子路由不在导航显示，则需要设置高亮的上级路由地址</span>
                </template>
                <el-input v-model="form.meta.activeMenu" clearable placeholder="请输入高亮导航的完整路由地址" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.badge" label="徽标">
                <template #label>
                  徽标
                  <span class="label-tip">不宜设置太长，建议控制在4个字符内</span>
                </template>
                <el-input v-model="form.meta.badge" clearable placeholder="请输入徽标显示内容" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.link" label="访问外链">
                <template #label>
                  访问外链
                  <span class="label-tip">请设置 http/https 开头的完整外链地址</span>
                </template>
                <el-input v-model="form.meta.link" clearable placeholder="请输入网址" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.iframe" label="内嵌网页">
                <template #label>
                  内嵌网页
                  <span class="label-tip">请勿与外链同时设置，同时设置时，本设置会失效</span>
                </template>
                <el-input v-model="form.meta.iframe" clearable placeholder="请输入网址" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.copyright" label="底部版权">
                <el-switch v-model="form.meta.copyright" inline-prompt active-text="显示" inactive-text="隐藏" />
              </el-form-item>
            </el-col>
            <el-col :xl="12" :lg="24">
              <el-form-item prop="meta.paddingBottom" label="底部填充高度">
                <template #label>
                  底部填充高度
                  <span class="label-tip">请设置有效的长度单位，例如：px/em/rem等</span>
                </template>
                <el-input v-model="form.meta.paddingBottom" clearable placeholder="请输入底部填充高度" />
              </el-form-item>
            </el-col>
          </el-row>
        </LayoutContainer>
      </el-form>
    </div>
    <FixedActionBar>
      <el-button type="primary" size="large" @click="hanleSubmit">
        提交
      </el-button>
      <el-button size="large" @click="handleBack">
        取消
      </el-button>
    </FixedActionBar>
  </div>
</template>

<style lang="scss" scoped>
.absolute-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .page-header {
    margin-bottom: 0;
  }

  .page-main,
  .el-form {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .page-main {
    .flex-container {
      position: static;

      .page-header {
        background-color: var(--el-disabled-bg-color);
        margin-inline: -15px;
        margin-top: -15px;
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
              cursor: s-resize
            }

          }
        }
      }
    }
  }

}
</style>
