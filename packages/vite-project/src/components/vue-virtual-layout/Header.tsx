import { defineComponent, watch } from 'vue-demi'
import { defineRef } from '../../utils/compact'
import { useStore } from './store'
import { useElementSize } from '@vueuse/core'

export default defineComponent({
  // props: {},
  setup(props, context) {
    const { emit, slots } = context

    const { headerRef, headerHeight } = useStore()

    const { refBind } = defineRef(context, 'headerRef', headerRef)

    const { height } = useElementSize(headerRef)

    watch(
      height,
      (height) => {
        headerHeight.value = height
      },
      { immediate: true }
    )

    return () => (
      <div ref={refBind} class="relative z-50">
        {slots.default?.()}
      </div>
    )
  }
})
