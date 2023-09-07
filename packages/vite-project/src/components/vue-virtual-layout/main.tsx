import { defineComponent, ref } from 'vue-demi'
import HeaderComponent from './Header'
import Sidebar from './Sidebar'
import './style.css'
import VirtualScrollList from '../virtual-scroll-list'
import { Random } from 'mockjs'
import Tabs from './Tabs'
import { createStore } from './store'
import { useVModel, useWindowScroll } from '@vueuse/core'

interface DataItem {
  index: number
  name: string
  id: string
  desc: string
}

function genUniqueId(index: number): string {
  return `id_${index}_${Date.now()}`
}

function getSentences(): string {
  return Random.cparagraph(1, 3)
}

const TOTAL_COUNT = 1000

function generateMockData(count: number): DataItem[] {
  const DataItems = []
  let i = count
  while (i--) {
    const index = count - i
    DataItems.push({
      index,
      name: Random.name(),
      id: genUniqueId(index),
      desc: getSentences()
    })
  }
  return DataItems
}
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
    },
    itemComponent: {
      type: Object,
      required: true
    },
    sidebarList: {
      type: Array,
      default: () => []
    },
    tabList: {
      type: Array,
      default: () => []
    },
    tabActive: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['update:tabActive'],
  setup(props, context) {
    const vsl = ref()

    const items = ref(generateMockData(TOTAL_COUNT))

    function totop() {}

    function tobottom() {}

    const { slots, emit } = context

    const tabActive = useVModel(props, 'tabActive', emit)

    const store = createStore({
      tabActive
    })

    const { y } = useWindowScroll()

    return () => (
      <div>
        <HeaderComponent>
          {slots.head?.()}
          <Tabs
            tabList={props.tabList}
            v-slots={{
              default: slots.tabItem
            }}
          ></Tabs>
        </HeaderComponent>
        <div class="flex ">
          <Sidebar
            class="flex-1 grow-0 shrink-0 w-20"
            sidebar-list={props.sidebarList}
            v-slots={{ default: slots.sidebarItem }}
          ></Sidebar>
          <VirtualScrollList
            class="list-page scroll-touch"
            ref={vsl}
            data-key={'id'}
            data-sources={items.value}
            data-component={props.itemComponent}
            estimate-size={80}
            item-class="list-item-page"
            page-mode={true}
            onTotop={totop}
            onTobottom={tobottom}
          />
        </div>
      </div>
    )
  }
})
