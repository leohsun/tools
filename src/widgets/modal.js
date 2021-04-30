import { isUndefined } from "./base"
export const MODAL_DERECTION = {
  LEFT: "LEFT",
  TOP: "TOP",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
  CENTER: "CENTER",
}
export class Modal {
  constructor({
    direction = MODAL_DERECTION.CENTER,
    onClose,
    closeWhenClickMask = true,
    childHTML,
    childNode,
    duration = 0.4,
    layoutBackgroundColor = "white",
    removeStyleTagWhenColse = true,
    radius = 0,
  }) {
    this.direction = direction
    this.duration = duration
    this.onClose = onClose
    this.radius = radius
    this.removeStyleTagWhenColse = removeStyleTagWhenColse
    this.closeWhenClickMask = closeWhenClickMask
    this.childHTML = childHTML
    this.childNode = childNode
    this.layoutBackgroundColor = layoutBackgroundColor
    if (!isUndefined(this.childHTML) && !isUndefined(this.childNode)) {
      console.warn("property childHTML or childNode can only pass one")
      this.childNode = null
    }
  }

  removeStyleTagWhenColse

  closeWhenClickMask

  duration

  radius

  dom

  layoutBackgroundColor

  styleTag

  mask

  childHTML

  childNode

  generateStyle() {
    return `
    .modal {
      position: fixed;
    }
    .modal__mask {
      position: fixed;
      z-index: 10001;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0);
      transition: all ${this.duration / 2}s ease-in;
    }
    .modal__layout {
      position: fixed;
      z-index: 10001;
      background-color: ${this.layoutBackgroundColor};
    }
    .modal__layout--CENTER {
      left: 50%;
      top: 50%;
      min-width: 15em;
      min-height: 5em;
      max-width: 20em;
      transform: translate3d(-50%, -50%, 0) scale(0);
      transition: all ${this.duration / 2}s ease-in;
      border-radius: ${this.radius};
      overflow:hidden;
    }
    .modal__layout--BOTTOM {
      left: 0;
      right:0;
      bottom: 0;
      min-height: 5em;
      transform: translate3d(0, 100%, 0);
      border-top-left-radius: ${this.radius};
      border-top-right-radius: ${this.radius};
      overflow: hidden;
      transition: all ${this.duration / 2}s ease-in;
    }
    .modal__layout--TOP {
      left: 0;
      right:0;
      top: 0;
      min-height: 2em;
      transform: translate3d(0, -100%, 0);
      border-bottom-left-radius: ${this.radius};
      border-bottom-right-radius: ${this.radius};
      overflow: hidden;
      transition: all ${this.duration / 2}s ease-in;
    }
    .modal__layout--LEFT {
      left: 0;
      top: 0;
      bottom: 0;
      min-width: 2em;
      transform: translate3d(-100%, 0, 0);
      border-top-right-radius: ${this.radius};
      border-bottom-right-radius: ${this.radius};
      overflow: hidden;
      transition: all ${this.duration / 2}s ease-in;
    }
    .modal__layout--RIGHT {
      right: 0;
      top: 0;
      bottom: 0;
      min-width: 2em;
      transform: translate3d(100%, 0, 0);
      border-top-left-radius: ${this.radius};
      border-bottom-left-radius: ${this.radius};
      overflow: hidden;
      transition: all ${this.duration / 2}s ease-in;
    }
    .modal--show .modal__mask {
      background-color: rgba(0,0,0,0.4);
      transition: all ${this.duration}s;
    }
    .modal--show .modal__layout--CENTER {
      transition: all ${this.duration}s cubic-bezier(.62,1.91,.87,.64);;
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
    .modal--show .modal__layout--BOTTOM,.modal--show .modal__layout--TOP,.modal--show .modal__layout--LEFT,.modal--show .modal__layout--RIGHT {
      transition: all ${this.duration}s ease-in;
      transform: translate3d(0, 0, 0);
    }
    `
  }

  show() {
    this._createStyleTag()
    this._cteateDom()
    setTimeout(() => {
      this.dom.classList.add("modal--show")
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.dom.classList.remove("modal--show")
      setTimeout(() => {
        document.body.removeChild(this.dom)
        if (this.removeStyleTagWhenColse)
          document.head.removeChild(this.styleTag)
        this.onClose && this.onClose()
        resolve()
      }, this.duration * 1000)
    })
  }

  _handleMaskClick() {
    if (this.closeWhenClickMask) this.close()
  }

  _createStyleTag() {
    if (document.getElementById("leo-modal") && !this.removeStyleTagWhenColse)
      return
    const tag = document.createElement("style")
    tag.id = "leo-modal"
    tag.innerHTML = this.generateStyle()
    this.styleTag = tag
    document.head.appendChild(tag)
  }

  _cteateDom() {
    const tag = document.createElement("div")
    tag.className = "modal"

    const mask = document.createElement("div")
    mask.className = "modal__mask"
    mask.onclick = this._handleMaskClick.bind(this)

    const layout = document.createElement("div")
    layout.className = `modal__layout modal__layout--${this.direction}`
    if (this.childHTML) layout.innerHTML = this.childHTML
    else if (this.childNode) layout.appendChild(this.childNode)
    tag.appendChild(mask)
    tag.appendChild(layout)
    this.dom = tag
    document.body.appendChild(tag)
  }
}
