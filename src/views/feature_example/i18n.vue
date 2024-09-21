<script setup lang="ts">
import type { LocaleType } from '#/config'
import { useLocale } from '@/locales/useLocale.ts'
import Message from 'vue-m-message'

const { t } = useI18n()
const currentPage = ref(1)
const pageSize = ref(100)
const data = ref({
  name: '',
  age: '',
})
const rulesData = ref({
  name: [{
    required: true,
    message: () => t('formRules.name'),
    trigger: 'blur',
  }],
  age: [{
    required: true,
    message: () => t('formRules.age'),
    trigger: 'blur',
  }],
})
const { changeLocale } = useLocale()
function setI18n(lang: LocaleType) {
  if (lang === 'zh-cn') {
    changeLocale(lang, {
      hello: {
        world: '你好，世界！',
      },
    })
  }
  else {
    changeLocale(lang, {
      hello: {
        world: 'Hello World !',
      },
    })

    Message.success('载入成功，你可以切换语言查看效果')
  }
}
</script>

<template>
  <div>
    <PageHeader title="国际化" content="除了支持全局多语言切换，还支持 Vue 单文件模式语言切换，你可以尝试在这个页面点击右上角的语言切换试试" />
    <PageMain title="Element 组件">
      <ElPagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="() => {}" @current-change="() => {}" />
    </PageMain>
    <PageMain title="表单验证(待优化)">
      <ElForm v-model="data" :rules="rulesData" label-width="100px">
        <ElFormItem :label="t('form.name')" prop="name">
          <ElInput v-model="data.name" />
        </ElFormItem>
        <ElFormItem :label="t('form.age')" prop="age">
          <ElInput v-model="data.age" />
        </ElFormItem>
      </ElForm>
    </PageMain>
    <PageMain title="延迟加载">
      <ElButton @click="setI18n('zh-cn')">
        载入中文
      </ElButton>
      <ElButton @click="setI18n('en')">
        载入英文
      </ElButton>
      <p>{{ t('hello.world') }}</p>
    </PageMain>
  </div>
</template>
