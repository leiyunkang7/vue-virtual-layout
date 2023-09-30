import { defineRef } from '../../utils/compact'
import { computed, defineComponent, isVue2, nextTick, onMounted, ref, watch } from 'vue-demi'
import { useStore } from './store'
import { useWindowScroll } from '@vueuse/core'
import Big from 'big.js'

export default defineComponent({
  // props: {},
  name: 'StickyWrapper',
  props: {
    widthClass: {
      type: String,
      default: 'w-full'
    }
  },
  setup(props, context) {
    const { slots } = context
    const { stickyWrapperList } = useStore()

    const { elRef: wrapperRef, refBind } = defineRef(context, 'wrapperRef')

    const index = ref(0)

    watch(
      wrapperRef,
      () => {
        if (!wrapperRef.value) {
          return
        }
        index.value = stickyWrapperList.value.length
        const pre = stickyWrapperList.value[index.value - 1]
        // console.log(wrapperRef.value.getBoundingClientRect())
        const { y } = wrapperRef.value.getBoundingClientRect()

        const preHeight = new Big(pre?.ref?.getBoundingClientRect()?.height ?? 0)

        const preSum = (pre?.preSum ?? new Big(0)).plus(preHeight)

        const topThreshold = new Big(y).minus(preSum)

        // console.log(topThreshold)

        const top = new Big(pre?.top ?? 0).plus(preHeight)

        stickyWrapperList.value.push({
          ref: wrapperRef.value,
          pre,
          topThreshold,
          top,
          preSum
        })
        if (isVue2) {
          stickyWrapperList.value = stickyWrapperList.value.slice()
        }
      },
      { immediate: true }
    )

    const self = computed(() => stickyWrapperList.value[index.value])

    const { y } = useWindowScroll()

    const isThreshold = ref(false)

    watch(
      y,
      (y) => {
        const topThreshold = self.value?.topThreshold ?? new Big(0)
        // console.log(y, topThreshold)
        const topY = new Big(y).minus(topThreshold)
        isThreshold.value = topY.gt(0)
      },
      { immediate: true }
    )

    const top = computed(() => {
      return (self?.value?.top ?? 0) + 'px'
    })

    const placeholderStyle = computed(() => {
      const { height, width } = self.value?.ref?.getBoundingClientRect() ?? {}

      return {
        height: `${height ?? 0}px`,
        width: `${width ?? 0}px`,
        display: isThreshold.value ? 'block' : 'none'
      }
    })

    const updateflag = ref(true)

    return () =>
      updateflag.value ? (
        <div class={`bg-white z-40 ${props.widthClass}`} ref={refBind}>
          <div
            class={`bg-white  ${props.widthClass}`}
            style={{
              position: isThreshold.value ? 'fixed' : 'static',
              top: top.value
            }}
          >
            {slots.default?.()}
          </div>
          <div style={placeholderStyle.value}></div>
        </div>
      ) : (
        ''
      )
  }
})
