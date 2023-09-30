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

export function defineRef(context: any, refName: string, elRef = ref()) {
  if (isVue3 || !context.refs) {
    return {
      elRef,
      refBind: elRef
    }
  }

  const setRefValue = () => {
    const refValue = context.refs?.[refName]
    if (!refValue) {
      return
    }
    elRef.value = refValue
  }

  onUpdated(() => {
    setRefValue()
  })

  nextTick(() => {
    setRefValue()
  })

  // onBeforeUpdate(() => {
  //   elRef.value = context.refs[refName]
  // })

  return {
    elRef,
    refBind: refName
  }
}
