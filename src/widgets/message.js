export function message(msg) {
  const el = document.createElement("div")
  el.className = "layer__message"
  el.innerText = msg
  el.style =
    "position: fixed;" +
    "left: 50%;" +
    "top: 10%;" +
    "font-size: 14px;" +
    "height: 2.6em;" +
    "line-height: 2.6em;" +
    "min-width: 6em;" +
    "padding: 0 1em;" +
    "text-align: center;" +
    "border-radius: 1em;" +
    "white-space: nowrap;" +
    "color: #ffffff;" +
    "z-index: 999;" +
    "transition: all 0.3s;" +
    "transform :translate3d(-50%, 0, 0) scale(0);" +
    "background-color: rgba(0, 0, 0, 0.7);"
  document.body.appendChild(el)
  setTimeout(() => {
    el.style.transform = "translate3d(-50%, 0, 0) scale(1)"
  }, 0)
  setTimeout(() => {
    document.body.removeChild(el)
  }, 2000)
}
