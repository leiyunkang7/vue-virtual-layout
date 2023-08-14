import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    sidebarList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const { slots } = context
    return () => (
      <div>
        {props.sidebarList.map((item, index) => {
          return <div>{slots.default?.({ item, index })}</div>
        })}
      </div>
    )
  }
})
