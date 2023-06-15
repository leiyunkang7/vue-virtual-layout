import { defineComponent } from 'vue-demi'
import HeaderComponent from './Header'
import Sidebar from './Sidebar'
import './style.css'

export default defineComponent({
  components: {
    HeaderComponent
  },
  props: {
    type: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => (
      <div>
        <HeaderComponent></HeaderComponent>
        <div>
          <Sidebar></Sidebar>
        </div>
        <button type={props.type as any}>{props.text}</button>
      </div>
    )
  }
})
