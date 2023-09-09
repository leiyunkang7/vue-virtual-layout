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
      <template #sidebarItem="{ item, index }">
        <div>
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