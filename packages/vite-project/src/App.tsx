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
        <VueVirtualLayout
          itemComponent={Item}
          v-slots={{
            head: () => <div>head</div>
          }}
        ></VueVirtualLayout>
      </div>
    )
  }
})
