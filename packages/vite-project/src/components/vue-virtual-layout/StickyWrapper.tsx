import { defineRef } from '../../utils/compact'
import { computed, defineComponent, onMounted, ref, watch } from 'vue-demi'
import { useStore } from './store'
import { useWindowScroll } from '@vueuse/core'

export default defineComponent({
  // props: {},
  name: 'StickyWrapper',
  setup(props, context) {
    const { slots } = context
    const store = useStore()

    const { elRef: wrapperRef, refBind } = defineRef(context, 'wrapperRef')

    const index = ref(0)

    onMounted(() => {
      index.value = store.stickyWrapperList.length
      const pre = store.stickyWrapperList[index.value - 1]
      const top = (pre?.top ?? 0) + (pre?.ref?.offsetHeight ?? 0)
      console.log(wrapperRef.value.getBoundingClientRect())
      store.stickyWrapperList.push({
        ref: wrapperRef.value,
        top
      })
    })

    const self = computed(() => store.stickyWrapperList[index.value])

    const { y } = useWindowScroll()

    const position = computed(() => {
      if (!self.value) {
        return 'static'
      }

      if (y.value > self.value.top) {
        return 'fixed'
      }
      return 'static'
    })

    return () => (
      <div
        class="w-full  bg-white z-10"
        ref={refBind}
        style={{ top: self.value?.top + 'px', position: position.value }}
      >
        {slots.default?.()}
        {index.value}
      </div>
    )
  }
})
