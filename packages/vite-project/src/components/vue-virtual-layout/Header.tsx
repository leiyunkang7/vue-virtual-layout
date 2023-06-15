import { defineComponent } from 'vue-demi'

export default defineComponent({
  // props: {},
  setup(props) {
    return () => <div class="text-3xl font-bold underline bg-green-50">头部</div>
  }
})
