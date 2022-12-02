import { Modal, MODAL_DERECTION } from "./modal"
import { Picker } from "./picker"
import { generateNode, isUndefined } from "./base"

export class Selector {
  constructor({
    dataList = [],
    onChange,
    defaultValue,
    columnNumber,
    lineHeight,
    confirmText = "确定",
    cancelText = "取消",
    title = "",
  }) {
    this.dataList = dataList
    this.onChange = onChange
    this.confirmText = confirmText
    this.cancelText = cancelText
    this.defaultValue = defaultValue
    this.columnNumber = columnNumber
    this.lineHeight = lineHeight
    this.title = title
    this.init()
  }

  dataList

  title

  confirmText

  cancelText

  slection

  onChange

  defaultValue

  columnNumber

  pickerNode

  modal

  selectorNode

  handleCancle() {
    this.modal.close()
  }

  handleConfrim() {
    this.handleCancle()
    this.onChange && this.onChange(this.slection)
  }

  createHeaderDom() {
    const header = generateNode("leo-selector__header")
    const cancleNode = generateNode("leo-selector__button")
    cancleNode.innerText = this.cancelText
    cancleNode.onclick = this.handleCancle.bind(this)
    header.appendChild(cancleNode)

    const titleNode = generateNode("leo-selector__title")
    titleNode.innerText = this.title
    header.appendChild(titleNode)

    const confirmNode = generateNode(
      "leo-selector__button leo-selector__button--confirm"
    )
    confirmNode.innerText = this.confirmText
    confirmNode.onclick = this.handleConfrim.bind(this)
    header.appendChild(confirmNode)
    return header
  }

  createPickerDom() {
    const { node } = new Picker({
      lineHeight: this.lineHeight,
      defaultValue: this.defaultValue,
      dataList: this.dataList,
      columnNumber: this.columnNumber,
      onChange: data => {
        this.slection = data
      },
    })
    this.pickerNode = node
    return node
  }

  createStyle() {
    if (document.querySelector(".leo-selector")) return
    const style = generateNode("leo-selector", "style")
    style.innerHTML = `
    .leo-selector__header {
      display: flex;
      justify-content: space-around;
      align-content: center;
      font-size: 20px;
    }
    .leo-selector__header div {
      height: 3em;
      line-height: 3em;
      text-align: center;
    }
    .leo-selector__button {
      font-weight: 600;
      color: #666f83;
      flex: 1;
      cursor: pointer;
      transition: opacity 0.3s;
      opacity: 1;
    }
    .leo-selector__button:active {
      opacity: 0.6;
    }
    .leo-selector__title {
      flex: 2;
      color: #111a34;
    }
    .leo-selector__button--confirm {
      color: #2f86f6;
    }
  `
    document.head.appendChild(style)
  }

  createModalInstance() {
    this.modal = new Modal({
      direction: MODAL_DERECTION.BOTTOM,
      childNode: this.selectorNode,
      radius: "1em",
    })
  }

  createDom() {
    const selectorNode = generateNode("leo-selector")
    const headerNode = this.createHeaderDom()
    const pickerNode = this.createPickerDom()
    selectorNode.appendChild(headerNode)
    selectorNode.appendChild(pickerNode)
    this.selectorNode = selectorNode
  }

  init() {
    this.createStyle()
    this.createDom()
    this.createModalInstance()
  }

  show() {
    if (!this.modal) return console.warn("modal is null")
    this.modal.show()
  }
}
