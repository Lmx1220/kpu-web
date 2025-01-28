<script setup lang="ts">

</script>

<template>
  <div>
    <KpuPageHeader title="自定义字体" content="自定义字体需要下载字体文件，不建议在非英文环境中使用" footer="以下为框架预设字体" />
    <KpuPageMain title="Digital 7">
      <p class="digital-7">
        admin
      </p>
      <p class="digital-7">
        1234567890,.
      </p>
    </KpuPageMain>
    <KpuPageMain title="Digital 7（等宽）">
      <p class="digital-7_mono">
        admin
      </p>
      <p class="digital-7_mono">
        1234567890,.
      </p>
    </KpuPageMain>
  </div>
</template>

<style scoped>
@import "@/assets/fonts/digital-7/stylesheet.css";
@import "@/assets/fonts/digital-7_mono/stylesheet.css";

.digital-7,
.digital-7_mono {
  margin: 10px 0;
  font-size: 48px;
}

.digital-7 {
  font-family: "digital-7regular";
}

.digital-7_mono {
  font-family: "digital-7_monomono";
}
</style>
