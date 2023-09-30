<template>
  <div style="height: 80px; overflow: hidden;">
    {{source?.index}}.{{ source?.desc }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true
    },
    source: {
      type: Object,
      required: true
    }
  },
})
</script>
