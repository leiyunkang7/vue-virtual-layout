import { computed, isVue2, isVue3, ref } from 'vue-demi'

export function getProps(props: any) {
  let mergedProps = props

  if (isVue2) {
    mergedProps = {
      props: props
    }
  }

  return mergedProps
}

export function defineRef({ refs, refName }: { refs: any; refName: string }) {
  const elRef = ref()
  if (isVue3) {
    return {
      elRef,
      refBind: elRef
    }
  }

  return {
    elRef: computed(() => refs[refName]),
    refBind: refName
  }
}
