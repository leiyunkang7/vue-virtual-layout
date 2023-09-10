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
  const stickyWrapperList = ref<any[]>([])

  const headerRef = ref()

  const store = {
    stickyWrapperList,
    tabActive,
    vslRef,
    headerRef,
    estimateSize,
    itemList
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
