import { copy, isUndefined, isFunction, findIndex, find } from "./base"
class Column {
  constructor({ dataList, defaultValue, onChange, freeze, lineHeight = 45 }) {
    this.freeze = freeze || false
    if (isUndefined(dataList))
      return console.warn("property [ dataList ] is required...")
    this.dataList = dataList
    if (!isUndefined(onChange) && !isFunction(onChange))
      console.warn("the type of property onChange must be function")
    else this.onChange = onChange
    if (isUndefined(defaultValue)) this.defaultValue = this.dataList[0]
    else this.defaultValue = defaultValue
    if (!isUndefined(lineHeight)) {
      if (typeof lineHeight != "number")
        console.log("property number must be a number")
      else {
        this.height = lineHeight
        this.maxMoveY = lineHeight * 0.6
      }
    }

    return this.init()
  }

  onChange = null

  touchStartSwitch = false

  defaultValue = null
  activeValue = null

  colWrapper = null
  colContent = null

  startX = 0
  startY = 0
  endX = 0
  endY = 0

  activeCellDom = null

  height

  freeze = false

  maxMoveY

  touchStartPostion = {
    x: 0,
    y: 0,
  }

  touchMoveData = {
    x: 0,
    y: 0,
    delta: 1,
  }

  generateNode(className, tag) {
    const node = document.createElement(tag || "div")
    if (typeof className != undefined) node.className = className
    return node
  }

  createDom() {
    const colWrapper = this.generateNode("leo-picker__column-wrapper")
    colWrapper.innerHTML = `<div class="leo-picker__mask leo-picker__mask--top"></div>
     <div class="leo-picker__mask leo-picker__mask--bottom"></div>`
    this.colContent = this.generateNode("leo-picker__column", "ul")
    this.colContent.appendChild(this.generateCells())
    colWrapper.appendChild(this.colContent)
    this.colWrapper = colWrapper
  }

  generateCells() {
    const fragMent = document.createDocumentFragment()
    this.dataList.forEach(col => {
      const cell = this.generateNode("leo-picker__cell", "li")
      cell.innerHTML = col.label || ""
      cell.setAttribute("data-value", col.value)
      fragMent.appendChild(cell)
    })
    return fragMent
  }

  getElementTransformData(target) {
    const style = getComputedStyle(target)
    const transform = style.transform
    let x = 0
    let y = 0
    if ('DOMMatrix' in window) {
      const translate = new DOMMatrix(transform)
      y = translate.m42
      x = translate.m41
    } else if (transform.indexOf('matrix3d') > -1) {
      const dataArrary = transform.split(',')
      x = +dataArrary[12]
      y = +dataArrary[13]
    }

    return {
      x,
      y,
    }
  }

  setCssToDom(_offsetY) {
    let offsetY
    if (typeof _offsetY !== "undefined") offsetY = _offsetY
    else offsetY = this.startY + this.touchMoveData.y
    this.endY = offsetY
    this.colContent.style.transform = `translate3d(0,${offsetY}px,0)`
  }

  bindTouchEvent() {
    if (!this.colWrapper) return console.warn("plz createDom first!!")
    this.colWrapper.addEventListener(
      "touchstart",
      evt => {
        evt.preventDefault()
        this.touchStartSwitch = true
        this.touchStartPostion.x = evt.touches[0].pageX
        this.touchStartPostion.y = evt.touches[0].pageY

        const { x, y } = this.getElementTransformData(this.colContent)
        this.startY = y
        this.startX = x
      },
      false
    )

    this.colWrapper.addEventListener(
      "touchmove",
      evt => {
        evt.preventDefault()
        if (!this.touchStartSwitch) return
        this.touchMoveData.x = evt.touches[0].pageX - this.touchStartPostion.x
        this.touchMoveData.y = evt.touches[0].pageY - this.touchStartPostion.y
        this.touchMoveData.delta = this.touchMoveData.y > 0 ? 1 : -1
        this.setCssToDom()
      },
      false
    )

    this.colWrapper.addEventListener(
      "touchend",
      evt => {
        evt.preventDefault()
        this.touchStartSwitch = false
        const { x, y } = this.getElementTransformData(this.colContent)
        const deltaY = (y - this.startY) % this.height
        const reachLimit = Math.abs(deltaY) > this.maxMoveY
        let offsetY = y - deltaY
        if (reachLimit) {
          if (this.touchMoveData.delta > 0) offsetY += this.height
          else offsetY -= this.height
        }

        if (offsetY > 0) offsetY = 0
        else if (offsetY < this.height * (1 - this.dataList.length))
          offsetY = this.height * (1 - this.dataList.length)
        this.setCssToDom(offsetY)
        if (this.startY != offsetY) this.activeCell()
      },
      false
    )
  }

  bindMouseEvent() {
    this.colWrapper.addEventListener(
      "mousedown",
      evt => {
        evt.preventDefault()
        this.touchStartSwitch = true
        this.touchStartPostion.x = evt.pageX
        this.touchStartPostion.y = evt.pageY

        const { x, y } = this.getElementTransformData(this.colContent)
        this.startY = y
        this.startX = x
      },
      false
    )

    this.colWrapper.addEventListener(
      "mousemove",
      evt => {
        evt.preventDefault()
        if (!this.touchStartSwitch) return
        this.touchMoveData.x = evt.pageX - this.touchStartPostion.x
        this.touchMoveData.y = evt.pageY - this.touchStartPostion.y
        this.touchMoveData.delta = this.touchMoveData.y > 0 ? 1 : -1
        this.setCssToDom()
      },
      false
    )

    this.colWrapper.addEventListener(
      "mouseleave",
      evt => {
        evt.preventDefault()
        this.touchStartSwitch = false
        const { x, y } = this.getElementTransformData(this.colContent)
        const deltaY = (y - this.startY) % this.height
        const reachLimit = Math.abs(deltaY) > this.maxMoveY
        let offsetY = y - deltaY
        if (reachLimit) {
          if (this.touchMoveData.delta > 0) offsetY += this.height
          else offsetY -= this.height
        }

        if (offsetY > 0) offsetY = 0
        else if (offsetY < this.height * (1 - this.dataList.length))
          offsetY = this.height * (1 - this.dataList.length)
        this.setCssToDom(offsetY)
        if (this.startY != offsetY) this.activeCell()
      },
      false
    )

    this.colWrapper.addEventListener(
      "mouseup",
      evt => {
        evt.preventDefault()
        this.touchStartSwitch = false
        const { x, y } = this.getElementTransformData(this.colContent)
        const deltaY = (y - this.startY) % this.height
        const reachLimit = Math.abs(deltaY) > this.maxMoveY
        let offsetY = y - deltaY
        if (reachLimit) {
          if (this.touchMoveData.delta > 0) offsetY += this.height
          else offsetY -= this.height
        }

        if (offsetY > 0) offsetY = 0
        else if (offsetY < this.height * (1 - this.dataList.length))
          offsetY = this.height * (1 - this.dataList.length)
        this.setCssToDom(offsetY)
        if (this.startY != offsetY) this.activeCell()
      },
      false
    )
  }

  activeCell() {
    if (
      this.activeCellDom &&
      this.activeCellDom.classList.contains("leo-picker__cell--active")
    )
      this.activeCellDom.classList.remove("leo-picker__cell--active")

    let activeIdx = 0

    activeIdx = Math.abs(this.endY / this.height)

    const cells = this.colContent.children
    const cellToActive = cells[activeIdx]
    if (
      cellToActive &&
      !cellToActive.classList.contains("leo-picker__cell--active")
    ) {
      cellToActive.classList.add("leo-picker__cell--active")
      this.activeCellDom = cellToActive
      const label = cellToActive.innerText
      const value = cellToActive.getAttribute("data-value")
      this.activeValue = {
        label,
        value,
        children: this.dataList[activeIdx].children,
      }
      if (this.onChange) this.onChange(this.activeValue)
    }
  }

  acitveDefaultCell() {

    const activeCellIdx = findIndex(this.dataList, pData => {
      pData.value == this.defaultValue.value &&
        pData.label == this.defaultValue.label
    })


    if (activeCellIdx == -1) return
    this.colContent.style.transform = `translate3d(0,${this.height * activeCellIdx * -1
      }px,0)`

    this.activeCellDom = this.colContent.children[activeCellIdx]
    this.activeCellDom.classList.add("leo-picker__cell--active")
  }

  rerender({ dataList, defaultValue }) {
    if (this.freeze) return
    this.dataList = dataList
    this.defaultValue = defaultValue
    this.colContent.innerHTML = ""
    this.colContent.appendChild(this.generateCells())
    this.acitveDefaultCell()
  }

  init() {
    this.createDom()
    this.bindTouchEvent()
    this.bindMouseEvent()
    this.acitveDefaultCell()
    return {
      instance: this,
      node: this.colWrapper,
    }
  }
}

export const PICKER_PRESET_TYPE = {
  DATE: "DATE",
  TIME: "TIME",
  DATA_TYPE: "DATE_TIME",
}
export class Picker {
  constructor({
    dataList = undefined,
    defaultValue = undefined,
    lineHeight = 45,
    elementId = undefined,
    type = undefined,
    columnNumber = undefined,
    onChange = undefined,
  }) {
    if (isUndefined(dataList)) {
      if (!isUndefined(type)) {
        if (type == PICKER_PRESET_TYPE.DATE) {
          this.generateDateDataList()
        }
      } else
        return console.warn(
          "property dataList or type can only pass one of them"
        )
    } else this.dataList = dataList

    this.onChange = onChange

    if (!isUndefined(defaultValue)) {
      this.defaultValue = defaultValue
      this.activeValue = copy(this.defaultValue)
    } else {
      this.defaultValue = this.dataList.map(item => item[0])
      this.activeValue = copy(this.defaultValue)
    }

    if (!isUndefined(lineHeight)) {
      this.columnCommonData.height = lineHeight
      this.columnCommonData.maxMoveY = lineHeight * 0.6
    }

    if (isUndefined(columnNumber)) {
      this.columnNumber = this.dataList.length
    } else if (columnNumber > this.dataList.length) {
      this.linkage = true
      this.columnNumber = columnNumber
      this.linkageDataListBak = copy(dataList)
      if (isUndefined(defaultValue)) this.setLinkageDefaultActiveValue()
    }

    this.elementId = elementId

    return this.init()
  }

  dataList = []

  linkageDataListBak = null

  linkage = false

  columnNumber = 0

  elementId = null

  columnInstanceList = []

  defaultValue = null

  touchEl = null

  activeValue = []

  columnCommonData = {
    height: 45,
    maxMoveY: 30,
  }

  onChange

  generateDateDataList() {
    const now = new Date()
    const yearDelta = 20
    const year = now.getFullYear()
    const yearList = []

    let yearToPush = year - yearDelta

    while (yearToPush < year + yearDelta) {
      yearList.push({
        label: yearToPush,
        value: yearToPush,
      })

      yearToPush++
    }

    this.dataList.push(yearList)
    this.defaultValue = this.activeValue[{ label: year, value: year }]
  }

  setLinkageDefaultActiveValue(idx = 0, data = this.linkageDataListBak[0][0]) {
    const { value, label } = data
    this.activeValue[idx] = { value, label }
    let parent = data
    for (let i = idx + 1; i < this.columnNumber; i++) {
      if (!parent || !parent.children || parent.children.length == 0) {
        return (this.activeValue[i] = { label: "", value: "" })
      }
      this.activeValue[i] = copy(parent.children[0])
      parent = copy(parent.children[0])
    }
    if (this.defaultValue.length == 0)
      this.defaultValue = copy(this.activeValue)
  }

  initLinkageColumnDataList() {
    if (!this.linkage) return
    this.dataList = [] // reset it
    this.dataList[0] = copy(this.linkageDataListBak[0])

    let parent = find(this.linkageDataListBak[0],
      item =>
        item.label == this.activeValue[0].label &&
        item.value == this.activeValue[0].value
    )



    for (let i = 1; i < this.columnNumber; i++) {
      if (!parent || !parent.children) return this.dataList.push([])
      this.dataList.push(copy(parent.children))
      parent = find(parent.children,
        item =>
          item.label == this.activeValue[i].label &&
          item.value == this.activeValue[i].value
      )
    }
  }

  generateNode(className, tag) {
    const node = document.createElement(tag || "div")
    if (typeof className != undefined) node.className = className
    return node
  }

  createStyle() {
    if (document.head.querySelector(".leo-picker")) return
    const { height } = this.columnCommonData
    const styleHtml = `
      .leo-picker {
        position: relative;
        font-size: 18px;
      }
      .leo-picker__body {
        position: relative;
        font-size: 18px;
        position: relative;
        background-color: #ffa500;
      }
      .leo-picker__mask {
        position: absolute;
        height: ${height * 2}px;
        left: 0;
        right: 0;
        box-sizing: border-box;
      }
      .leo-picker__mask--top {
        top: 0;
        border-bottom: 1px solid #e2e4ea;
      }
      .leo-picker__column{
        margin: 0;
      }
      .leo-picker__mask--bottom {
        bottom: 0;
        border-top: 1px solid #e2e4ea;
      }
      .leo-picker__table {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .leo-picker__column-wrapper {
        position: relative;
        flex: 1;
        padding-top: ${height * 2}px;
        height: ${height * 5}px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;
      }
      .leo-picker__cell {
        height: ${height}px;
        line-height: ${height}px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
      }
      .leo-picker__cell--active {
        color: #2f86f6;
        font-weight: 600;
      }
    `

    const styleTag = this.generateNode("leo-picker", "style")
    styleTag.innerHTML = styleHtml
    document.head.appendChild(styleTag)
  }

  onColumnChange(idx, data) {
    this.activeValue[idx] = data
    if (this.linkage) {
      this.setLinkageDefaultActiveValue(idx, data)
      this.initLinkageColumnDataList()
      this.rerenderColum(idx)
    }
    if (this.onChange) this.onChange(this.activeValue)
  }

  rerenderColum(idx) {
    while (++idx < this.columnNumber) {
      this.columnInstanceList[idx].rerender({
        dataList: this.dataList[idx],
        defaultValue: this.activeValue[idx],
      })
    }
  }

  createDom() {
    const picker = this.generateNode("leo-picker")
    const pickerTable = this.generateNode("leo-picker__table")
    this.dataList.forEach((colData, idx) => {
      const { node, instance } = new Column({
        dataList: colData,
        defaultValue: this.defaultValue[idx],
        onChange: data => this.onColumnChange(idx, data),
      })
      this.columnInstanceList[idx] = instance
      pickerTable.appendChild(node)
    })
    picker.appendChild(pickerTable)
    return picker
  }

  init() {
    this.initLinkageColumnDataList()
    const node = this.createDom()
    if (this.elementId) {
      const mountDom = document.getElementById(this.elementId)
      if (mountDom) mountDom.appendChild(node)
    }
    this.createStyle()
    return {
      node,
      instance: this,
    }
  }
}
