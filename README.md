# @leohsun/tools

> 一系列纯 javascript 工具集,支持IE10+

[![npm](https://img.shields.io/npm/v/@leohsun/tools.svg?style=flat-square)](https://www.npmjs.com/package/@leohsun/tools)
[![npm](https://img.shields.io/npm/dt/@leohsun/tools.svg?style=flat-square)](https://www.npmjs.com/package/@leohsun/tools)

## 安装

- 按需引入

```shell
npm install --save @leohsun/tools
```

```javascript
// index.js

import { confirm } from "@leohsun/tools"

confirm({
  title: "預約失败",
  content: data.message,
  confirmText: "确定",
  cancelText: null,
})
```

- HTML 直接引入

```html
<!-- index.html -->
<head>
  ...
  <script src="https://unpkg.com/@leohsun/tools"></script>
</head>
```

- [在线示例 demo](https://unpkg.com/@leohsun/tools@0.1.1/example/index.html)

> 交互类工具集

- [message](#message)
- [loader](#loader)
- [modal](#modal)
- [confirm](#confirm)
- [selector](#confirm)

> 纯函数类工具集

- [getQueryStringObject](#getQueryStringObject)
- [transfrom2Camel](#transfrom2Camel)
- [getPlatform](#getPlatform)
- [debounce](#debounce)
- isArray
- isUndefined
- [isObject
- isFunction
- getArrayLast
- [copy](#copy)
- [generateNode](#generateNode)
- [fixH5ViewHeightChangeWhenInputFocusOnAdroid](#fixH5ViewHeightChangeWhenInputFocusOnAdroid)

## message

- 消息轻提示

```javascript
// index.js

leoTools.message("leoTools.message")
```

## loader

- loading 加载层

```javascript
// index.js

// 打开
leoTools.loader.show()
// 关闭
leoTools.loader.hide()
```

## Modal

- 模态框类

```
Modal入参
  direction               内容Body弹出方向                       [选择: LEFT,TOP,RIGHT,BOTTOM,CENTER]
  childHTML               传入BODY的HTML(与childNode互斥)        [string:'<div>hello</div>']
  childNde                传入BODY的HTML节点(与childHTML互斥)     [HTML-ELEMENT: document.createElement('div')]
  layoutBackgroundColor   BODY背景色                            [string: '#fff']
  radius                  BODY圆角大小                           [string: '20px']
  duration                BODY动画时间间隔(单位：S)               [number: 0.4]
  onClose                 关闭模态框时回调                        [function]
  closeWhenClickMask      是否在点击模态框遮罩层关闭                [boolean: false]
  removeStyleTagWhenColse 是否在关闭模态框是移除其Style标签         [boolean: true]
```

```javascript
// index.js

const modalChildHtml = '<h1 style="text-aligin:center;">leoTools.Modal</h1>'

const modalChildNode = leoTools.generateNode("modal-node")

const modal = new leoTools.Modal({
  direction: leoTools.MODAL_DERECTION.BOTTOM,
  childHTML: modalChildHtml,
  radius: "1em",
  onClose: function () {
    console.log("modal is closed")
  },
  closeWhenClickMask: true,
  // childNode: modalChildNode,
  duration: 0.4,
  layoutBackgroundColor: "#efefef",
  removeStyleTagWhenColse: true,
})

modal.show()
```

## confirm

- 确定框

```
函数入参
  title                标题                             [string: 'confirm']
  content              BODY内容                         [string: 'your request has been refused']
  confirmText          确定按钮文本                      [string: 'confirm']
  cancelText           取消按钮文本                      [string: 'cancel']
  onConfirm            点击确定后的回调                   [function]
  onCancel             点击取消后的回调                   [function]

```

```javascript
// index.js

leoTools.confirm({
  title: "confirm",
  content: "your request has been refused",
  confirmText: "confirm",
  onConfirm: function () {
    console.log("confirm")
  },
  cancelText: "cancel",
  onCancel: function () {
    console.log("cancel")
  },
})
```

## selector

- 选择器

```
函数入参
  dataList           数据                         [arrary:[[label:'猫',value:'cat'],[label:'红',value:'red']]
  title              选择器标题                    [string: '职务选择']
  confirmText        确定按钮文本                  [string: '确认']
  cancelText         取消按钮文本                  [string: '取消']
  onChange           点击确定后的回调               [function]
  columnNumber       级联选择时的层级               [number]
  lineHeight         选择项行高                    [number]
```

```javascript
// index.js

const selector = new leoTools.Selector({
    dataList: [
      [{
        label: '董事长',
        value: 'ceo'
      },
      {
        label: '技术负责人',
        value: 'cto'
      }],
      [{
        label: '王小明',
        value: 'xiaoming-Wang'
      }, {
        label: '李四',
        value: 'si-Li'
      }]
    ],
    title: "职务选择",
    defaultValue: [{
      label: '技术负责人',
      value: 'cto'
    }, {
      label: '李四',
      value: 'si-Li'
    }],
    onChange: data => {
      if (!data) return
      console.log(data)
    },
  })
  selector.show()
})
```

## getQueryStringObject

```javascript
// window.location.href = "http://0.0.0.0/?a=4&b=5&c=6"

// index.js
getQueryStringObject() // --> {a: "4", b: "5", c: "6"}
```

## transform2Camel

```javascript
// index.js
const a = "little_red_bird"
transform2Camel(a) // --> littleRedBird
```

## getPlatform

```javascript
// index.js
getPlatform() // --> {isIOS: false, isAndroid: true}
```

## debounce(function,delay)

- 防抖动函数

```javascript
// index.js
function log() {
  console.log(document.body.scrollTop)
}

document.body.onscroll = debounce(log, 300)
```

## copy

- 拷贝数组或对象

```javascript
// index.js
const a = { a: 1, b: { b1: 2 } }
const b = copy(a)
b.b = 1

console.log(a) // {"a":1,"b":{"b1":2}}
console.log(b) // {a: 1, b: 1}
```

## generateNode

- generateNode(className,tagName)

```javascript
// index.js
const node = generateNode("modal", "ul")
```

## fixH5ViewHeightChangeWhenInputFocusOnAdroid

- 修复 android 页面 input 获取焦点时，页面高度变小

```javascript
// index.js
fixH5ViewHeightChangeWhenInputFocusOnAdroid()
```
