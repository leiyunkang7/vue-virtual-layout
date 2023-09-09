import { defineComponent } from 'vue-demi'
import { defineRef } from '../../utils/compact'
import { useStore } from './store'

export default defineComponent({
  // props: {},
  setup(props, context) {
    const { emit, slots } = context

    const { headerRef } = useStore()

    const { refBind } = defineRef(context, 'headerRef', headerRef)

    return () => (
      <div ref={refBind} class="text-3xl font-bold  bg-green-50 relative z-50">
        {slots.default?.()}
      </div>
    )
  }
})
