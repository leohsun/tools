export function getQueryStringObject() {
  const qStr = decodeURIComponent(window.location.search.slice(1))
  const params = qStr.split("&").reduce((s, n) => {
    const rawN = n.split("=")
    return Object.assign({}, s, { [rawN[0]]: rawN[1] })
  }, {})
  return params
}

export function transform2Camel(str) {
  return str.replace(/_(.)/g, (m, $1) => $1.toUpperCase())
}

export function getPlatform() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera
  const payload = {
    isIOS: false,
    isAndroid: false,
  }

  if (/android/i.test(userAgent)) {
    return {
      isIOS: false,
      isAndroid: true,
    }
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return {
      isIOS: true,
      isAndroid: false,
    }
  }

  return {
    isIOS: false,
    isAndroid: false,
  }
}

export function debounce(func, wait = 500) {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export const isArray = tar => Array.isArray(tar)

export const isUndefined = tar => typeof tar === "undefined"

export const isObject = tar =>
  Object.prototype.toString.call(tar).toUpperCase() == "[OBJECT OBJECT]"

export const isFunction = tar =>
  Object.prototype.toString.call(tar).toUpperCase() == "[OBJECT FUNCTION]"

export const getArrayLast = arr => {
  if (isArray(arr)) {
    return arr[arr.length - 1]
  }
  return null
}

export const copy = obj => JSON.parse(JSON.stringify(obj))

export function fixH5InputNotScorllIntoViewOnFocusBugOnAndroid() {
  const { isAndroid } = getPlatform()
  if (isAndroid) {
    window.addEventListener("resize", function () {
      if (document.activeElement.tagName == "INPUT") {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
  }
}

export function fixH5ViewHeightChangeWhenInputFocusOnAdroid() {
  const { isAndroid } = getPlatform()
  if (isAndroid) {
    const originHeight =
      document.documentElement.clientHeight || document.body.clientHeight
    document.documentElement.style.height = document.body.style.height =
      originHeight + "px"
  }
}

export function generateNode(className, tag = "div") {
  const node = document.createElement(tag)
  if (!isUndefined(className)) node.className = className
  return node
}
