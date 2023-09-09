import type { Ref } from 'vue-demi'
import { inject, provide, ref } from 'vue-demi'

export function createStore({ tabActive }: { tabActive: Ref<string | number> }) {
  const stickyWrapperList = ref<any[]>([])

  const store = {
    stickyWrapperList,
    tabActive
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