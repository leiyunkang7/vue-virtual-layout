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
    const store = useStore()
    function handleClick(e: MouseEvent, item: any) {
      store.tabActive = item.id
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
