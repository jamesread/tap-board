const INITIAL_DELAY_MS = 400
const REPEAT_INTERVAL_MS = 100

function stopRepeat (el) {
  clearTimeout(el._repeatPressDelayId)
  clearInterval(el._repeatPressIntervalId)
  el._repeatPressDelayId = null
  el._repeatPressIntervalId = null
}

function startRepeat (el) {
  stopRepeat(el)
  el._repeatPressCallback?.()

  el._repeatPressDelayId = setTimeout(() => {
    el._repeatPressIntervalId = setInterval(() => {
      el._repeatPressCallback?.()
    }, REPEAT_INTERVAL_MS)
  }, INITIAL_DELAY_MS)
}

function onPointerDown (event) {
  if (event.button !== 0) {
    return
  }

  const el = event.currentTarget
  if (el.disabled) {
    return
  }

  event.preventDefault()
  startRepeat(el)
}

function onPointerEnd (event) {
  stopRepeat(event.currentTarget)
}

function onKeyDown (event) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return
  }

  const el = event.currentTarget
  if (el.disabled) {
    return
  }

  event.preventDefault()
  el._repeatPressCallback?.()
}

export const vRepeatPress = {
  mounted (el, binding) {
    el._repeatPressCallback = binding.value
    el._repeatPressOnPointerDown = onPointerDown
    el._repeatPressOnPointerEnd = onPointerEnd
    el._repeatPressOnKeyDown = onKeyDown

    el.addEventListener('pointerdown', el._repeatPressOnPointerDown)
    el.addEventListener('pointerup', el._repeatPressOnPointerEnd)
    el.addEventListener('pointerleave', el._repeatPressOnPointerEnd)
    el.addEventListener('pointercancel', el._repeatPressOnPointerEnd)
    el.addEventListener('keydown', el._repeatPressOnKeyDown)
  },

  updated (el, binding) {
    el._repeatPressCallback = binding.value
  },

  unmounted (el) {
    stopRepeat(el)
    el.removeEventListener('pointerdown', el._repeatPressOnPointerDown)
    el.removeEventListener('pointerup', el._repeatPressOnPointerEnd)
    el.removeEventListener('pointerleave', el._repeatPressOnPointerEnd)
    el.removeEventListener('pointercancel', el._repeatPressOnPointerEnd)
    el.removeEventListener('keydown', el._repeatPressOnKeyDown)
  },
}
