<script setup lang="ts">
defineOptions({
  name: 'Iconpicker',
})
const icon = ref('')
const icon1 = ref('ep:success-filled')
const icon2 = ref('')
</script>

<template>
  <div>
    <KpuPageHeader title="图标选择器" content="KpuIconPicker" />
    <KpuPageMain>
      <div mb4>
        <KpuIconPicker v-model="icon" />
      </div>
      <div>
        <KpuIconPicker v-model="icon1" />
      </div>
    </KpuPageMain>
    <KpuPageMain title="尺寸">
      <!--        <KpuIconPicker v-model="icon2" size="small" /> -->
      <KpuIconPicker v-model="icon2">
        <template #default="{ icon: icon3 }">
          <div class="flex-center-start inline-flex cursor-pointer gap-2 border rounded-full px-3 py-1">
            <KpuIcon v-if="icon" :name="icon3" />
            <div v-else class="text-sm">
              {{ icon || '请选择图标' }}
            </div>
          </div>
        </template>
      </KpuIconPicker>
    </KpuPageMain>
  </div>
</template>
