import { defineComponent } from 'vue-demi'

export default defineComponent({
  // props: {},
  setup(props, context) {
    const { slots } = context
    return () => <div>{slots.default?.()}</div>
  }
})
