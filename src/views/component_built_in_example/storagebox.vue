<script setup lang="ts">
import Message from 'vue-m-message'

defineOptions({
  name: 'StorageBox',
})
const data = ref([])
const search = ref({
  name: '',
  department_id: '',
  department_job_id: '',
  role_id: '',
  check1: true,
  check2: false,
})
function E() {
  Message.info('模拟触发搜索')
}
function takeOut(val: any) {
  search.value = val
  E()
}
</script>

<template>
  <div>
    <KPageHeader title="储存箱" content="KStorageBox" />
    <KPageMain title="你可以将页面中的数据（object/array）储存到该组件内，并在需要的时候取出来">
      <ElAlert show-icon title="该组件需要搭配业务场景使用。" :closable="false" />
      <KStorageBox :data="data" name="box1" />
    </KPageMain>
    <kPageMain title="推荐场景：具有复杂筛选项的页面，并记录常用的筛选条件">
      <KSearchBar :show-toggle="false">
        <ElForm :model="search" size="default" label-width="120px">
          <ElRow>
            <ElCol :span="24">
              <ElFormItem label="姓名 / 手机号" class="search-form-item-name">
                <ElInput v-model="search.name" placeholder="请输入姓名或者手机号，支持模糊查询" clearable />
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElCol :span="6">
              <ElFormItem label="部门">
                <ElSelect v-model="search.department_id" clearable placeholder="请选择部门">
                  <ElOption label="技术部" :value="1" />
                  <ElOption label="设计部" :value="2" />
                  <ElOption label="行政部" :value="3" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem label="职位">
                <ElSelect v-model="search.department_job_id" clearable placeholder="请选择职位">
                  <ElOption label="程序员" :value="1" />
                  <ElOption label="设计师" :value="2" />
                  <ElOption label="人事" :value="3" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
            <ElCol :span="6">
              <ElFormItem label="角色">
                <ElSelect v-model="search.role_id" clearable placeholder="请选择角色">
                  <ElOption label="主管" :value="1" />
                  <ElOption label="普通职员" :value="2" />
                </ElSelect>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElRow>
            <ElCol :span="24">
              <ElFormItem label="角色">
                <ElCheckbox v-model="search.check1">
                  备选项
                </ElCheckbox>
                <ElCheckbox v-model="search.check2">
                  备选项
                </ElCheckbox>
              </ElFormItem>
            </ElCol>
          </ElRow>
          <ElFormItem>
            <ElSpace>
              <ElButton type="primary" @click="E">
                <template #icon>
                  <SvgIcon name="i-ep:search" />
                </template>
                筛选
              </ElButton>
              <KStorageBox :data="search" name="box2" title="我的快捷筛选" @take-out="takeOut">
                <ElButton link>
                  保存当前筛选
                </ElButton>
              </KStorageBox>
            </ElSpace>
          </ElFormItem>
        </ElForm>
      </KSearchBar>
    </kPageMain>
  </div>
</template>
