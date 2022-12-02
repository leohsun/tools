export function message(msg) {
  const el = document.createElement("div")
  el.className = "layer__message"
  el.innerText = msg
  el.style.position = "fixed"
  el.style.left = "50%"
  el.style.top = "10%"
  el.style.fontSize = "14px"
  el.style.height = "2.6em"
  el.style.lineHeight = "2.6em"
  el.style.minWidth = "6em"
  el.style.padding = "0 1em"
  el.style.textAlign = "center"
  el.style.borderRadius = "1em"
  el.style.whiteSpace = "nowrap"
  el.style.color = "#ffffff"
  el.style.zIndex = "999"
  el.style.transition = "all 0.3s"
  el.style.transform = "translate3d(-50%, 0, 0) scale(0)"
  el.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
  document.body.appendChild(el)
  setTimeout(() => {
    el.style.transform = "translate3d(-50%, 0, 0) scale(1)"
  }, 0)
  setTimeout(() => {
    document.body.removeChild(el)
  }, 2000)
}
