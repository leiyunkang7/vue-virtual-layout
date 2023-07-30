import { defineComponent } from 'vue'

export type Source = {
  index: number
  name: string
  id: string
  desc: string
}

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
  setup(props) {
    return () => {
      const { source } = props
      const { index, name, id, desc } = source
      return (
        <div class="h-20 overflow-hidden" style="height:80px;overflow:hidden;">
          {index}.{desc}
        </div>
      )
    }
  }
})
