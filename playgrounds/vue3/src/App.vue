<script setup lang="ts">
import VueVirtualLayout from '@vue-virtual-layout/v3'
import ItemComponent from './item'
</script>

<template>
  <div>
    <VueVirtualLayout text="按钮" :item-component="ItemComponent" ></VueVirtualLayout>
  </div>
</template>

<style scoped>
</style>
