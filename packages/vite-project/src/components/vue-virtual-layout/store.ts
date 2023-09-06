import type { Ref } from 'vue-demi'
import { inject, provide, reactive } from 'vue-demi'

export function createStore({ tabActive }: { tabActive: Ref<string | number> }) {
  const store = reactive({
    tabActive,
    stickyWrapperList: [] as any[]
  })

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
