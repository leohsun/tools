# @leohsun/tools

> 一系列纯 javascript 工具集

[![npm](https://img.shields.io/npm/v/@leohsun/tools/utils.svg?style=flat-square)](https://www.npmjs.com/package/@leohsun/tools)
[![npm](https://img.shields.io/npm/dt/@leohsun/tools.svg?style=flat-square)](https://www.npmjs.com/package/@leohsun/tools)

## 安装

- 按需引入

```shell
npm install --save qrcode
```

- HTML 直接引入

```html
<!-- index.html -->
<head>
  ...
  <script src="../dist/bundle.min.js"></script>
</head>
```

> 工具集

- [message](#message)
- [loader](#loader)
- [modal](#modal)
- [confirm](#confirm)
- [selector](#confirm)

## message

- 消息轻提示

```javascript
// index.js

LeoUtils.message("LeoUtils.message")
```

## loader

- loading 加载层

```javascript
// index.js

// 打开
LeoUtils.loader.show()
// 关闭
LeoUtils.loader.hide()
```

## Modal

- 模态框类

```
Modal入参
  direction             内容Body弹出方向                      [选择: LEFT,TOP,RIGHT,BOTTOM,CENTER]
  childHTML             传入BODY的HTML(与childNode互斥)       [string:'<div>hello</div>']
  childNde              传入BODY的HTML节点(与childHTML互斥)    [HTML-ELEMENT: document.createElement('div')]
  layoutBackgroundColor BODY背景色                            [string: '#fff']
  radius                BODY圆角大小                          [string: '20px']
  duration              BODY动画时间间隔(单位：S)               [number: 0.4]
  onClose               关闭模态框时回调                       [function]
  closeWhenClickMask    是否在点击模态框遮罩层关闭               [boolean: false]
  removeStyleTagWhenColse 是否在关闭模态框是移除其Style标签       [boolean: true]
```

```javascript
// index.js

const modalChildHtml = '<h1 style="text-aligin:center;">LeoUtils.Modal</h1>'

const modalChildNode = LeoUtils.generateNode("moal-node")

const modal = new LeoUtils.Modal({
  direction: LeoUtils.MODAL_DERECTION.BOTTOM,
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
confirm函数入参
  title                标题                             [string: 'confirm']
  content              BODY内容                         [string: 'your request has been refused']
  confirmText          确定按钮文本                      [string: 'confirm']
  cancelText           取消按钮文本                      [string: 'cancel']
  onConfirm            点击确定后的回调                   [function]
  onCancel             点击取消后的回调                   [function]

```

```javascript
// index.js

LeoUtils.confirm({
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
confirm函数入参
  dataList            数据                       [arrary:[[label:'猫',value:'cat'],[label:'红',value:'red']]
  title              选择器标题                   [string: '职务选择']
  onChange          点击确定后的回调               [function]
  columnNumber      级联选择时的层级               [number]
  lineHeight        选择项行高                    [number]

```

```javascript
// index.js

  const selector = new LeoUtils.Selector({
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
