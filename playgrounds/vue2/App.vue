<template>
  <div>
    <VueVirtualLayout
      :itemComponent="ItemComponent"
      :sidebarList="sidebarList"
      :tabList="tabList"
      :tabActive.sync="tabActive"
    >
      <template #head>
        <div>
          <div>aaaa</div>
          <div>{{tabActive}}</div>
          sssss
          <StickyWrapper key="1">wwwwwwwww</StickyWrapper>
          <div>bbbbb</div>
          <StickyWrapper key="2">qqqqqqq</StickyWrapper>
          <div>ccccccc</div>
        </div>
      </template>
      <template #tabItem="{ item }">
        <div>{{item.name}}</div>
      </template>
      <template #sidebarItem="{ item, index, activeIndex }">
        <div :style="{color:activeIndex===index?'green':'black' }">
          sidebar-item {{item?.name}} {{index}}
        </div>
      </template>
    </VueVirtualLayout>
  </div>
</template>

<script>
import VueVirtualLayout,{StickyWrapper } from '@vue-virtual-layout/v2'
import '@vue-virtual-layout/v2/dist/vue-virtual-layout.css'
import ItemComponent from './item-component.vue'

export default {
  components: {
    VueVirtualLayout,
    StickyWrapper
  },
  data() {
    return {
      sidebarList: [
      {
        name: `aa`,
        id: 1,
        target: 0
      },
      {
        name: `bb`,
        id: 2,
        target: 50
      },
      {
        name: `cc`,
        id: 3,
        target: 100
      },
      {
        name: `dd`,
        id: 4,
        target: 150
      },
      {
        name: `ee`,
        id: 5,
        target: 200
      },
      {
        name: `ff`,
        id: 6,
        target: 250
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
    ],
      tabList: [
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
    ],
      tabActive: 1,
      ItemComponent
    }
  },
}
</script>