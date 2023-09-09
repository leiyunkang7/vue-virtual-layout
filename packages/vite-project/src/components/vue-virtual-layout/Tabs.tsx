import { defineComponent } from 'vue-demi'
import { useStore } from './store'

export default defineComponent({
  props: {
    tabList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const { slots } = context
    const { tabActive } = useStore()
    function handleClick(e: MouseEvent, item: any) {
      tabActive.value = item.id
    }
    return () => (
      <div class="flex">
        {props.tabList.map((item, index) => {
          return <div onClick={(e) => handleClick(e, item)}>{slots.default?.({ item, index })}</div>
        })}
      </div>
    )
  }
})
