import { defineComponent } from 'vue-demi'
import VueVirtualLayout from '@/components/vue-virtual-layout'

export default defineComponent({
  components: {
    VueVirtualLayout
  },
  setup(props) {
    return () => (
      <div>
        <VueVirtualLayout type="button" text="我是按钮"></VueVirtualLayout>
      </div>
    )
  }
})
