/* eslint-disable vue/one-component-per-file */
import {
  computed,
  defineComponent,
  isVue2,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  type Ref
} from 'vue-demi'
import { ItemProps, SlotProps } from './props'

const useResizeChange = (props: any, rootRef: Ref<HTMLElement | null>, emit: any) => {
  let resizeObserver: ResizeObserver | null = null
  const shapeKey = computed(() => (props.horizontal ? 'offsetWidth' : 'offsetHeight'))

  const getCurrentSize = () => {
    return rootRef.value ? rootRef.value[shapeKey.value] : 0
  }

  // tell parent current size identify by unqiue key
  const dispatchSizeChange = () => {
    const { event, uniqueKey, hasInitial } = props
    emit(event, uniqueKey, getCurrentSize(), hasInitial)
  }

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        dispatchSizeChange()
      })
      rootRef.value && resizeObserver.observe(rootRef.value)
    }
  })

  onUpdated(() => {
    dispatchSizeChange()
  })

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })
}

export const Item = defineComponent({
  name: 'VirtualListItem',
  props: ItemProps,
  emits: ['itemResize'],
  setup(props, { emit, slots }) {
    const rootRef = ref<HTMLElement | null>(null)
    useResizeChange(props, rootRef, emit)

    return () => {
      const { tag, component, extraProps = {}, index, source, scopedSlots = {}, uniqueKey } = props

      const Tag = tag as any
      const Comp = component as any

      const vue2Props = {
        ...extraProps,
        source,
        index
      }

      let mergedProps: any = vue2Props

      if (isVue2) {
        mergedProps = {
          props: vue2Props
        }
      }

      return (
        <Tag key={uniqueKey} ref={rootRef}>
          <Comp {...mergedProps} scopedSlots={scopedSlots} />
        </Tag>
      )
    }
  }
})

export const Slot = defineComponent({
  name: 'VirtualListSlot',
  props: SlotProps,
  emits: ['slotResize'],
  setup(props, { slots, emit }) {
    const rootRef = ref<HTMLElement | null>(null)
    useResizeChange(props, rootRef, emit)

    return () => {
      const { tag, uniqueKey } = props

      const Tag = tag as any

      return (
        <Tag ref={rootRef} key={uniqueKey}>
          {slots.default?.()}
        </Tag>
      )
    }
  }
})
