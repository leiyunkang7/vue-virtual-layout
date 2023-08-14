<script >
import VueVirtualLayout from '@vue-virtual-layout/v2'
import ItemComponent from './item-component.vue'

export default {
  components: {
    VueVirtualLayout
  },
  data() {
    return {
      ItemComponent
    }
  },
}

</script>

<template>
  <div>
    <VueVirtualLayout :itemComponent="ItemComponent">
    <template #head>
      <div>我是头部</div>
    </template>
    </VueVirtualLayout>
  </div>
</template>
