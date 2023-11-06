<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'PersonalEditPassword',
})

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const form = ref({
  password: '',
  newpassword: '',
  checkpassword: '',
})
const formRef = ref<FormInstance>()

function validatePassword(rule: any, value: any, callback: any) {
  if (value !== form.value.newpassword) {
    callback(new Error('请确认新密码'))
  }
  else {
    callback()
  }
}
const rules = ref({
  password: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validatePassword },
  ],
})

function onSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      userStore.editPassword(form.value).then(() => {
        ElMessage({
          type: 'success',
          message: '模拟修改成功，请重新登录',
        })
        userStore.logout().then(() => {
          router.push({
            name: 'login',
            query: {
              redirect: route.fullPath,
            },
          })
        })
      }).catch(() => {})
    }
  })
}
</script>

<template>
  <div>
    <PageHeader title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
    <PageMain>
      <ElRow>
        <ElCol :md="24" :lg="12">
          <ElForm ref="formRef" :model="form" :rules="rules" label-width="120px">
            <ElFormItem label="原密码" prop="password">
              <ElInput v-model="form.password" type="password" placeholder="请输入原密码" />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newpassword">
              <ElInput v-model="form.newpassword" type="password" placeholder="请输入原密码" />
            </ElFormItem>
            <ElFormItem label="确认新密码" prop="checkpassword">
              <ElInput v-model="form.checkpassword" type="password" placeholder="请输入原密码" />
            </ElFormItem>
          </ElForm>
        </ElCol>
      </ElRow>
    </PageMain>
    <FixedActionBar>
      <ElButton type="primary" size="large" @click="onSubmit">
        提交
      </ElButton>
    </FixedActionBar>
  </div>
</template>
