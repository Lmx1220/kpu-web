<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
import _ from 'lodash'
import ActiveUsersBar from './components/active-users-bar.vue'
import PageHeader from './components/page-header.vue'
import Pending from './components/pending.vue'
import Recommendation from './components/recommendation.vue'
import TopCard from './components/top-card.vue'

defineOptions({
  name: 'Home',
})
const countConfig = ref({
  startValue: 0,
  endValue: _.random(1000, 20000),
  decimals: 2,
  prefix: '￥',
  suffix: '',
  separator: ',',
  duration: 8000,
})
</script>

<template>
  <div class="m-4">
    <ElRow :gutter="20">
      <ElCol>
        <PageHeader mb-5 />
      </ElCol>
      <ElCol :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <TopCard
          background="blue"
          :count-config="countConfig"
          icon="ri:money-cny-circle-line"
          percentage="10%"
          title="总销量"
        />
      </ElCol>
      <ElCol :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <TopCard background="white" percentage="30%" title="活跃用户">
          <template #tag>
            <ElTag type="danger">
              日
            </ElTag>
          </template>
          <template #chart>
            <ActiveUsersBar />
          </template>
        </TopCard>
      </ElCol>
      <ElCol :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <TopCard background="white" percentage="44%" title="总成交" icon="ri:money-cny-box-line" />
      </ElCol>
      <ElCol :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <TopCard background="white" percentage="10%" title="订单" icon="ri:passport-line" />
      </ElCol>
      <ElCol :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <Pending />
      </ElCol>
      <ElCol :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <Recommendation />
      </elcol>
    </ElRow>
  </div>
</template>
