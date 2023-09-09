import { isVue2, isVue3, nextTick, onUpdated, ref } from 'vue-demi'

export function getProps(props: any) {
  let mergedProps = props

  if (isVue2) {
    mergedProps = {
      props: props
    }
  }

  return mergedProps
}

export function defineRef(context: any, refName: string) {
  const elRef = ref()
  if (isVue3) {
    return {
      elRef,
      refBind: elRef
    }
  }

  onUpdated(() => {
    elRef.value = context.refs[refName]
  })

  nextTick(() => {
    elRef.value = context.refs[refName]
  })

  // onBeforeUpdate(() => {
  //   elRef.value = context.refs[refName]
  // })

  return {
    elRef,
    refBind: refName
  }
}
