export function fullscreen () {
  document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen

  if (!document.fullscreenEnabled) {
    alert('It seems that going fullscreen is not allowed by your device.')
    return
  }

  const element = document.body.parentElement

  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
  }
}
