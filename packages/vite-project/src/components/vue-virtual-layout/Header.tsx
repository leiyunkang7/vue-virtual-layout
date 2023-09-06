import { defineComponent, onUpdated } from 'vue-demi'

export default defineComponent({
  // props: {},
  setup(props, context) {
    const { emit, slots } = context

    return () => <div class="text-3xl font-bold  bg-green-50">{slots.default?.()}</div>
  }
})
