import { computed, defineComponent, ref, toRefs, watch } from 'vue-demi'
import { useStore } from './store'
import { useWindowScroll } from '@vueuse/core'
import { defineRef } from '../../utils/compact'
import { debounce } from 'lodash'
import Big from 'big.js'

export default defineComponent({
  props: {
    sidebarList: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const { slots } = context

    const { elRef: sidebarWapperRef, refBind } = defineRef(context, 'sidebarWapperRef')

    const {
      vslRef,
      stickyWrapperList,
      headerRef,
      estimateSize,
      itemList,
      vslExposes,
      headerHeight
    } = useStore()

    const { sidebarList } = toRefs(props)

    const lastWrapper = computed(() => stickyWrapperList.value[stickyWrapperList.value.length - 1])

    const handleClick = (item: any, index: number) => {
      if (!vslRef?.value) {
        return
      }
      const height = lastWrapper.value?.preSum ?? new Big(0)
      // debugger
      // console.log('item.target', item.target, 'offset', -height.toNumber())
      vslExposes.value.scrollToIndex?.(item.target, {
        offset: -height.toNumber(),
        judgeLast: false
      })
    }

    const styles = computed(() => {
      if (!lastWrapper.value) return {}

      const lastSum = lastWrapper.value?.preSum.toNumber() ?? 0

      const height = `calc(100vh - ${lastSum}px)`

      const paddingBottom = `calc((100vh - ${lastSum}px) / 2)`
      return {
        height,
        paddingBottom
      }
    })

    const { y } = useWindowScroll()

    const activeIndex = ref(0)

    const activeItem = ref()

    watch(y, () => {
      if (!headerRef.value) {
        return
      }
      if (!lastWrapper.value) {
        return
      }

      const scrollTop = new Big(y.value)
        .minus(headerHeight.value)
        .plus(lastWrapper.value.topThreshold)

      let target = scrollTop.div(estimateSize.value).toNumber()

      const itemLength = itemList.value.length - 1

      if (target > itemLength) {
        target = itemLength
      }

      const result = getSiderItemByTarget({ sidebarList: sidebarList.value, target })

      // console.log(
      //   'y.value',
      //   y.value,
      //   'scrollTop',
      //   scrollTop.toNumber(),
      //   'result',
      //   result,
      //   'target',
      //   target
      // )

      if (!result) {
        return
      }

      const { item, index } = result

      activeIndex.value = index

      activeItem.value = item

      debounceScrollToMiddle(sidebarWapperRef.value, lastWrapper.value.ref, index)

      // console.log(index, y.value, scrollTop, target)
    })

    return () => (
      <div class="overflow-y-scroll box-border sidebar" style={styles.value} ref={refBind}>
        {props.sidebarList.map((item, index) => {
          return (
            <div onClick={() => handleClick(item, index)}>
              {slots.default?.({
                item,
                index,
                activeIndex: activeIndex.value,
                activeItem: activeItem.value
              })}
            </div>
          )
        })}
      </div>
    )
  }
})

function getSiderItemByTarget({ sidebarList, target }: { sidebarList: any[]; target: number }) {
  let index = 0
  let nextIndex = index + 1
  while (index < sidebarList.length) {
    const item = sidebarList[index]
    const nextItem = sidebarList[nextIndex]
    const isLast = nextIndex === sidebarList.length
    if (item.target <= target && (nextItem?.target > target || isLast)) {
      return {
        item,
        index
      }
    }
    index++
    nextIndex++
  }
}

function scrollToMiddle(menuContainer: any, parentContainer: any, index: number) {
  const container = menuContainer
  const menuItems = container.children // 菜单项列表
  const menuItem = menuItems[index] // 当前菜单项
  const parentContainerHeight = parentContainer.clientHeight // 父容器高度
  // const containerHeight = container.clientHeight // 容器高度
  const menuItemHeight = menuItem.getBoundingClientRect().height // 当前菜单项高度
  const parentContainerTop = parentContainer.getBoundingClientRect().top // 父容器顶部距离视口顶部的距离
  const menuTop = menuItem.getBoundingClientRect().top - parentContainerTop // 当前菜单项顶部距离父容器顶部的距离
  let menuMiddle = menuTop - (parentContainerHeight - menuItemHeight) / 2 // 当前菜单项中间位置
  if (menuMiddle < 0) {
    menuMiddle = 0 // 如果滚动区域不够高，将滚动位置设置为0
  }
  container.scrollTo({
    top: menuMiddle
    // behavior: 'smooth'
  })
  // console.log(menuMiddle, index)
  if (index === 0 && menuMiddle !== 0) {
    // debugger
  }
}

const debounceScrollToMiddle = debounce(scrollToMiddle, 0)
