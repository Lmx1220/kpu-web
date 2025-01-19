<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <KPageHeader title="内容块" description="KPageMain" />
    <KPageMain>
      PageMain 是最常用的页面组件，几乎所有页面都会使用到
    </KPageMain>
    <KPageMain title="你可以设置一个自定义的标题">
      这里放页面内容
    </KPageMain>
    <KPageMain>
      <template #title>
        <div class="flex-center-between">
          通过 slot 设置标题
          <KButton variant="outline" size="sm">
            还可以放置自定义按钮
          </KButton>
        </div>
      </template>
      这里放页面内容
    </KPageMain>
    <KPageMain title="带展开/收起功能" collaspe height="100px">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold">
          Kpu-admin
        </h1>
        <img src="../../assets/images/logo.png">
        <p>用过的人都说好！！！</p>
      </div>
    </KPageMain>
  </div>
</template>
