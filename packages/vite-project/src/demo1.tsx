import { defineComponent, ref } from 'vue-demi'
import VueVirtualLayout, { StickyWrapper } from '@/components/vue-virtual-layout'
import Item from './components/item'
import { Random } from 'mockjs'

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
    VueVirtualLayout
  },
  setup(props) {
    const sidebarList = ref([
      {
        name: `aa`,
        id: 1,
        target: 0
      },
      {
        name: `bb`,
        id: 2,
        target: 1
      },
      {
        name: `cc`,
        id: 3,
        target: 2
      },
      {
        name: `dd`,
        id: 4,
        target: 4
      },
      {
        name: `ee`,
        id: 5,
        target: 30
      },
      {
        name: `ff`,
        id: 6,
        target: 50
      },
      {
        name: `gg`,
        id: 7,
        target: 300
      },
      {
        name: `hhh`,
        id: 8,
        target: 350
      },
      {
        name: `iii`,
        id: 9,
        target: 400
      },
      {
        name: `jjj`,
        id: 10,
        target: 450
      },
      {
        name: `kkk`,
        id: 11,
        target: 500
      },
      {
        name: `lll`,
        id: 12,
        target: 550
      },
      {
        name: `mmm`,
        id: 13,
        target: 600
      },
      {
        name: `nnn`,
        id: 14,
        target: 650
      },
      {
        name: `ooo`,
        id: 15,
        target: 999
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

    const tabActive = ref<number | string>(1)

    const backTop = () => {
      window.scrollTo({ top: 0 })
    }

    const data = ref(generateMockData(TOTAL_COUNT))

    return () => (
      <div>
        <VueVirtualLayout
          itemComponent={Item}
          sidebarList={sidebarList.value}
          itemList={data.value}
          tabList={tabList.value}
          v-model:tabActive={tabActive.value}
          v-slots={{
            head: () => (
              <div>
                <div>aaaa</div>
                <div>{tabActive.value}</div>
                sssss
                <StickyWrapper key="1">wwwwwwwww</StickyWrapper>
                <div>bbbbb</div>
                <StickyWrapper key="2">qqqqqqq</StickyWrapper>
                <div>ccccccc</div>
              </div>
            ),
            tabItem: ({ item }: any) => (
              <div>
                {item.name}
                {item.id === 1 && <span onClick={backTop}>回到顶部</span>}
              </div>
            ),
            sidebarItem: (params: any) => {
              const { item, index, activeIndex } = params || {}
              return (
                <div class={{ 'text-green-600': activeIndex === index }}>
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
