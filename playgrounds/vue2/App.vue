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
    <VueVirtualLayout type="button" text="我是按钮" :itemComponent="ItemComponent"></VueVirtualLayout>
  </div>
</template>
