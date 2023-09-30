import type Big from 'big.js'
import type { Ref } from 'vue-demi'
import { inject, provide, ref } from 'vue-demi'

export function createStore({
  tabActive,
  vslRef,
  estimateSize,
  itemList
}: {
  tabActive: Ref<string | number>
  vslRef: Ref<any>
  estimateSize: Ref<number>
  itemList: Ref<any[]>
}) {
  const stickyWrapperList = ref<StickyWrapper[]>([])

  const headerRef = ref()

  const vslExposes = ref()

  const headerHeight = ref(0)

  const store = {
    stickyWrapperList,
    tabActive,
    vslRef,
    headerRef,
    estimateSize,
    itemList,
    vslExposes,
    headerHeight
  }

  provide('store', store)

  return store
}

export function useStore() {
  const store = inject<Store>('store')

  if (!store) {
    throw new Error('useStore() is called without provider.')
  }

  return store
}

export type Store = ReturnType<typeof createStore>

export type StickyWrapper = {
  ref: any
  pre: any
  topThreshold: Big
  top: Big
  preSum: Big
}
