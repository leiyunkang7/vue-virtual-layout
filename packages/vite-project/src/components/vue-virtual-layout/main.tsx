import { computed, defineComponent, ref, toRefs } from 'vue-demi'
import HeaderComponent from './Header'
import Sidebar from './Sidebar'
import './style.css'
import VirtualScrollList from '../virtual-scroll-list'
import Tabs from './Tabs'
import { createStore } from './store'
import { useVModel } from '@vueuse/core'
import StickyWrapper from './StickyWrapper'
import { defineRef } from '../../utils/compact'
import Big from 'big.js'

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
    },
    dataKey: {
      type: String,
      default: 'id'
    },
    itemList: {
      type: Array,
      default() {
        return []
      }
    },
    estimateSize: {
      type: Number,
      default: 80
    }
  },
  emits: ['update:tabActive'],
  setup(props, context) {
    const { itemList, estimateSize } = toRefs(props)

    function totop() {}

    function tobottom() {}

    const { slots, emit } = context

    const tabActive = useVModel(props, 'tabActive', emit)

    const { elRef: vslRef, refBind: vslRefBind } = defineRef(context, 'vslRef')

    const { stickyWrapperList, vslExposes } = createStore({
      tabActive,
      vslRef,
      estimateSize,
      itemList
    })

    const lastWrapper = computed(() => stickyWrapperList.value[stickyWrapperList.value.length - 1])

    const footerHeight = computed(
      () =>
        `calc(100vh - ${(lastWrapper.value?.preSum ?? new Big(0))
          .plus(props.estimateSize)
          .toNumber()}px)`
    )

    const scopedSlots = {
      footer: () => <div class="w-full" style={{ height: footerHeight.value }}></div>
    }

    return () => (
      <div>
        <HeaderComponent>
          {slots.head?.()}
          <StickyWrapper key="tab">
            <Tabs tabList={props.tabList}>{(...args: any) => slots.tabItem?.(...args)}</Tabs>
          </StickyWrapper>
        </HeaderComponent>
        <div class="flex ">
          <StickyWrapper key="sidebar" widthClass="auto">
            <Sidebar class="flex-1 grow-0 shrink-0 w-20" sidebar-list={props.sidebarList}>
              {(...args: any) => slots.sidebarItem?.(...args)}
            </Sidebar>
          </StickyWrapper>
          <VirtualScrollList
            class="list-page scroll-touch z-30"
            ref={vslRefBind}
            data-key={props.dataKey}
            data-sources={itemList.value}
            data-component={props.itemComponent}
            estimate-size={props.estimateSize}
            item-class="list-item-page"
            page-mode={true}
            onTotop={totop}
            onTobottom={tobottom}
            handleSetExpose={(expose: any) => (vslExposes.value = expose)}
            scopedSlots={scopedSlots}
          >
            {scopedSlots}
          </VirtualScrollList>
        </div>
      </div>
    )
  }
})
