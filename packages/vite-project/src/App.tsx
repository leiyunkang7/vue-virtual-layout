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

    const tabList = ref([
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

    const tabActive= ref<number|string>(1)

    return () => (
      <div>
        <VueVirtualLayout
          itemComponent={Item}
          sidebarList={sidebarList.value}
          tabList={tabList.value}
          v-model:tabActive={tabActive.value}
          v-slots={{
            head: () => (
              <div>
                aaaa
                {tabActive.value}
                <StickyWrapper>wwwwwwwww</StickyWrapper>
                bbbbb
                <StickyWrapper>qqqqqqq</StickyWrapper>
                ccccccc
              </div>
            ),
            tabItem: ({ item }: any) => <div>{item.name}</div>,
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
