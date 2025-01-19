<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KPageHeader title="趋势符号">
      <template #content>
        <p>Trend</p>
        <p style="margin-bottom: 0;">
          标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外
        </p>
      </template>
    </KPageHeader>
    <ElRow :gutter="20" style="margin: 0 10px;">
      <ElCol :md="8">
        <KPageMain title="基础用法" style="margin: 0;">
          <p>
            <KTrend value="12.3" />
          </p>
          <p>
            <KTrend value="12.3" type="down" />
          </p>
        </KPageMain>
      </ElCol>
      <ElCol :md="8">
        <KPageMain title="颜色反转" style="margin: 0;">
          <p>
            <KTrend value="12.3" reverse />
          </p>
          <p>
            <KTrend value="12.3" type="down" reverse />
          </p>
        </KPageMain>
      </ElCol>
      <ElCol :md="8">
        <KPageMain title="前缀后缀" style="margin: 0;">
          <p>
            <KTrend value="12.3" prefix="$" />
          </p>
          <p>
            <KTrend value="12.3" suffix="%" />
          </p>
        </KPageMain>
      </ElCol>
    </ElRow>
  </div>
</template>
