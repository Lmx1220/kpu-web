<route lang="yaml">
meta:
enabled: false
</route>

<script setup lang="ts">
</script>

<template>
  <div>
    <KPageHeader title="头像" description="KAvatar" />
    <KPageMain>
      <div class="flex gap-4">
        <KAvatar src="https://fantastic-admin.hurui.me/logo.png" />
        <KAvatar src="https://fantastic-admin.hurui.me/logo.png" shape="square" />
        <KAvatar src="" fallback="Hooray" />
      </div>
    </KPageMain>
  </div>
</template>
