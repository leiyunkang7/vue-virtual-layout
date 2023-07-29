import { defineComponent } from 'vue-demi'
import VueVirtualLayout from '@/components/vue-virtual-layout'
import Item from './components/item'

export default defineComponent({
  components: {
    VueVirtualLayout
  },
  setup(props) {
    return () => (
      <div>
        <VueVirtualLayout type="button" text="我是按钮" itemComponent={Item}></VueVirtualLayout>
      </div>
    )
  }
})
