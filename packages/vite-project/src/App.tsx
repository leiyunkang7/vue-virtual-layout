import { defineComponent, ref } from 'vue-demi'
import VueVirtualLayout, { StickyWrapper } from '@/components/vue-virtual-layout'
import Item from './components/item'

export default defineComponent({
  components: {
    VueVirtualLayout
  },
  setup(props) {
    const sidebarList = ref([
      {
        name: `aa`,
        id: 1
      },
      {
        name: `bb`,
        id: 2
      },
      {
        name: `cc`,
        id: 3
      }
    ])

    return () => (
      <div>
        <VueVirtualLayout
          itemComponent={Item}
          sidebarList={sidebarList.value}
          v-slots={{
            head: () => (
              <div>
                aaaa
                <StickyWrapper>wwwwwwwww</StickyWrapper>
                bbbbb
                <StickyWrapper>qqqqqqq</StickyWrapper>
                ccccccc
              </div>
            ),
            sidebarItem: (params: any) => {
              const { item, index } = params || {}
              return (
                <div>
                  sidebar-item {item?.name} {index}
                </div>
              )
            }
          }}
        ></VueVirtualLayout>
      </div>
    )
  }
})
