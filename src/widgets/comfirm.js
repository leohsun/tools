import { Modal } from "./modal"
class Confirm {
  constructor({
    title,
    content,
    confirmText,
    onConfirm,
    cancelText,
    onCancel,
  }) {
    this.title = title || "确认"
    this.content = content || "请确认是否进行操作?"
    this.confirmText = typeof confirmText == "undefined" ? "确认" : confirmText
    this.onConfirm = onConfirm
    this.cancelText = typeof cancelText == "undefined" ? "取消" : cancelText
    this.onCancel = onCancel
  }

  _style = `
  .confirm{
    color: #666f83;
   
  }
  .confirm__title {
    color: #111a34;
    text-align: center;
    font-size: 18px;
    font-weight: 550;
    line-height: 1.2;
    margin-bottom: 0.5em;
    margin: 0;
  }
  .confirm__content {
    color: #666f83;
    text-align: center;
    margin: 0;
  }
  .confirm__body {
    border-bottom: 1px solid #e2e4ea;
    padding: 2em;
  }
  .confirm__footer {
    display: flex;
    justify-content: space-between;
  }
  .confirm__button {
    border: none;
    flex: 1;
    height: 3em;
    background-color: #fff;
  }
  .confirm__button--confirm {
    color: #2f86f6;
  }
  .confirm__button:active {
    background-color: #f9fafb;
  }
  .confirm__divider {
    height: 3em;
    background-color: #e2e4ea;
    width: 1px;
  }
  `

  styleTag = null

  confirmTag = null

  cancelButton = null

  confirmButton = null

  init() {
    this._createStyleTag()
    return this._cteateDom()
  }

  _createStyleTag() {
    if (document.head.querySelector("#confirm-style")) return
    const tag = document.createElement("style")
    tag.innerHTML = this._style
    tag.id = "confirm-style"
    this.styleTag = tag
    document.head.appendChild(tag)
  }

  _cteateDom() {
    const confirm = document.createElement("div")
    confirm.className = "confirm"
    const body = document.createElement("div")
    body.className = "confirm__body"
    body.innerHTML = `<h4 class="confirm__title">${this.title}</h4><p class="confirm__content">${this.content}</p>`

    const footer = document.createElement("div")
    footer.className = "confirm__footer"

    if (this.confirmText == null) {
      this.cancelButton = document.createElement("button")
      this.cancelButton.className = "confirm__button"
      this.cancelButton.innerText = this.cancelText
      footer.appendChild(this.cancelButton)
    } else if (this.cancelText == null) {
      this.confirmButton = document.createElement("button")
      this.confirmButton.className = "confirm__button confirm__button--confirm"
      this.confirmButton.innerText = this.confirmText
      footer.appendChild(this.confirmButton)
    } else {
      this.cancelButton = document.createElement("button")
      this.cancelButton.className = "confirm__button"
      this.cancelButton.innerText = this.cancelText

      const divider = document.createElement("div")
      divider.className = "confirm__divider"

      this.confirmButton = document.createElement("button")
      this.confirmButton.className = "confirm__button confirm__button--confirm"
      this.confirmButton.innerText = this.confirmText

      footer.appendChild(this.cancelButton)
      footer.appendChild(divider)
      footer.appendChild(this.confirmButton)
    }
    confirm.appendChild(body)
    confirm.appendChild(footer)
    this.confirmTag = confirm
    return confirm
  }

  _removeTag() {
    document.head.removeChild(this.styleTag)
    document.body.removeChild(this.confirmTag)
  }
}

export function confirm({
  title,
  content,
  confirmText,
  onConfirm,
  cancelText,
  onCancel,
}) {
  const confirmInstance = new Confirm(arguments[0])

  const confirmNode = confirmInstance.init()

  const modal = new Modal({
    childNode: confirmNode,
    closeWhenClickMask: false,
    radius: "0.5em",
  })

  if (cancelText !== null) {
    confirmInstance.cancelButton.onclick = function () {
      onCancel && onCancel()
      modal.close(function () {
        document.head.removeChild(confirmInstance.styleTag)
      })
    }
  }

  if (confirmText !== null)
    confirmInstance.confirmButton.onclick = function () {
      onConfirm && onConfirm()
      modal.close(function () {
        document.head.removeChild(confirmInstance.styleTag)
      })
    }

  modal.show()
}
