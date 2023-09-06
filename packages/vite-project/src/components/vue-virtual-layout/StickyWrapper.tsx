import { defineRef } from '../../utils/compact'
import { defineComponent, onMounted } from 'vue-demi'
import { useStore } from './store'

export default defineComponent({
  // props: {},
  setup(props, context) {
    const { slots } = context
    const store = useStore()

    const { elRef: wrapperRef, refBind } = defineRef(context, 'wrapperRef')

    onMounted(() => {
      store.stickyWrapperList.push(wrapperRef.value)
    })

    return () => <div ref={refBind}>{slots.default?.()}</div>
  }
})
