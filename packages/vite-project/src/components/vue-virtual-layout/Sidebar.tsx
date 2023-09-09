import { computed, defineComponent } from 'vue-demi'
import { useStore } from './store'

export default defineComponent({
  props: {
    sidebarList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const { slots } = context

    const { vslRef, stickyWrapperList } = useStore()

    const lastWrapper = computed(() => stickyWrapperList.value[stickyWrapperList.value.length - 1])

    const handleClick = (item: any, index: number) => {
      if (!vslRef?.value) {
        return
      }
      const height = lastWrapper.value?.preSum ?? 0
      // debugger
      vslRef.value.scrollToIndex(item.target, { offset: -height, judgeLast: false })
    }

    const styles = computed(() => {
      if (!lastWrapper.value) return {}

      const height = `calc(100vh - ${lastWrapper.value.preSum ?? 0}px)`

      const paddingBottom = `calc((100vh - ${lastWrapper.value.preSum ?? 0}px) / 2)`
      return {
        height,
        paddingBottom
      }
    })

    return () => (
      <div class="overflow-y-scroll box-border" style={styles.value}>
        {props.sidebarList.map((item, index) => {
          return (
            <div onClick={() => handleClick(item, index)}>{slots.default?.({ item, index })}</div>
          )
        })}
      </div>
    )
  }
})
