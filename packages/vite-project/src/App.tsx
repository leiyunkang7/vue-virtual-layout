import { defineComponent } from 'vue-demi'
import Demo1 from './demo1'

export default defineComponent({
  setup(props) {
    return () => <Demo1></Demo1>
  }
})
