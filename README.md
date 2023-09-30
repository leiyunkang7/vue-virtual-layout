# vue-virtual-layout


仿美团,饿了么订餐滚动,支持大量数据

1. 支持vue2, vue3
2. 滚动与左侧导航菜单相互联动
3. 滚动顶部收缩, 局部元素stick

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
import { Random } from 'mockjs'

function genUniqueId(index) {
  return `id_${index}_${Date.now()}`
}
function getSentences() {
  return Random.cparagraph(1, 3)
}

const TOTAL_COUNT = 1000

function generateMockData(count) {
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

export default {
  components: {
    VueVirtualLayout,
    StickyWrapper
  },
  data() {
    return {
      itemList: generateMockData(1000),
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