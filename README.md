# vue-virtual-layout


仿美团,饿了么订餐滚动,支持大量数据

1. 支持vue2, vue3
2. 滚动与左侧导航菜单相互联动
3. 滚动顶部收缩, 局部元素stick

<img alt="preview" src="https://cdn.jsdelivr.net/gh/leiyunkang7/vue-virtual-layout/preview-v1.gif" />

## 安装

```
# vue2
npm i @vue-virtual-layout/v2

# vue2.7
npm i @vue-virtual-layout/v2.7

# vue3
npm i @vue-virtual-layout/v3
```

## 示例
``` vue
<template>
  <div>
    <VueVirtualLayout
      :itemComponent="ItemComponent"
      :sidebarList="sidebarList"
      :tabList="tabList"
      :itemList="itemList"
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
// vue2
import VueVirtualLayout,{StickyWrapper } from '@vue-virtual-layout/v2'
import '@vue-virtual-layout/v2/dist/vue-virtual-layout.css'

// vue2.7
// import VueVirtualLayout,{StickyWrapper } from '@vue-virtual-layout/v2.7'
// import '@vue-virtual-layout/v2.7/dist/vue-virtual-layout.css'

// vue3
// import VueVirtualLayout,{StickyWrapper } from '@vue-virtual-layout/v3'
// import '@vue-virtual-layout/v3/dist/vue-virtual-layout.css'
import ItemComponent from './item-component.vue'

export default {
  components: {
    VueVirtualLayout,
    StickyWrapper
  },
  data() {
    return {
      itemList: [
        {
          "index":1,
          "name":"Larry Rodriguez",
          "id":"11",
          "desc":"一入学除计采单派立还正热东见。将之置所动员六土二图音心主约状度。"
        },
        {
          "index":2,
          "name":"Deborah Rodriguez",
          "id":"22",
          "desc":"收处收铁反参程问商必安青手。派参石公非律平快住年完青千成今基。"
        }
        // ...
      ],
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
      // ...
    ],
      tabActive: 1,
      ItemComponent
    }
  },
}
</script>
```

## Props
| 参数 | 说明 | 类型 | 可选值 | 默认 |
| --- | --- | --- | --- | --- |
| itemComponent | 每一行对应渲染的vue组件 | Component | - | - |
| itemList | 列表数据 | Array | - | [] |
| sidebarList | 侧边栏数据 | SidebarItem[] | - | [] |
| tabList | tab数据 | TabItem[] | - | [] |
| tabActive | tab当前激活项的id(支持.sync修饰符,在vue3为v-model:tabActive) | String,Number | - | - |


## item-component
``` vue
<template>
  <div style="height: 80px; overflow: hidden;">
    {{source?.index}}.{{ source?.desc }}
  </div>
</template>

<script>

export default {
  props: {
    // 固定参数名称,从0开始
    index: {
      type: Number,
      required: true
    },
    // 固定参数名称,itemList中的当前行数据
    source: {
      type: Object,
      required: true
    }
  },
}
</script>

```

## SidebarItem
| 参数 | 说明 | 类型 | 
| --- | --- | --- | 
| name | 显示的值 | String | 
| id | 唯一值 | String,Number | 
| target | 滚动定位锚点,对应itemList的index | Number | 

## TabItem
| 参数 | 说明 | 类型 | 
| --- | --- | --- | 
| name | 显示的值 | String | 
| id | 唯一值 | String,Number | 

## Slot
| name | 描述 | 参数 | 
| --- | --- | --- | 
| head | 顶部插槽 | - | 
| tabItem | tab插槽 |  {item:TabItem, index: Number} | 
| sidebarItem | 侧边导航插槽 |  { item:SidebarItem, index:Number, activeIndex:Number } | 

## StickyWrapper
StickyWrapper包裹的元素会自动stick顶部, 需要绑定唯一key

## 回到顶部
```
window.scrollTo({ top: 0 })
```