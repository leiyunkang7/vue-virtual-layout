<template>
  <div>
    {{index}}.{{ source?.desc }}
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

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
