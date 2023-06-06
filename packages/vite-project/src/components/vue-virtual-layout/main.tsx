import { defineComponent, h } from "vue-demi"

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    return () => (
      <button type={props.type as any}>{props.text}</button>
    )
  }
})
