class Loader {
  style = `
  .loader {
    position:fixed;
    left:0;
    top:0;
    height:100vh;
    width:100vw;
    background: rgba(0,0,0,0.06);
  }
  .loader-indicator {
    position: absolute;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
  }
  .loader:before, .loader:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }
  .loader:before {
    animation: before 2s infinite;
  }
  .loader:after {
    animation: after 2s infinite;
  }
  
  @keyframes before {
    0% {
      width: 0.5em;
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
    35% {
      width: 2.5em;
      box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
    }
    70% {
      width: 0.5em;
      box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
    }
    100% {
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
  }
  @keyframes after {
    0% {
      height: 0.5em;
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
    35% {
      height: 2.5em;
      box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
    }
    70% {
      height: 0.5em;
      box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
    }
    100% {
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
  }
  `
  styleDom = null
  loaderDom = null

  createDom() {
    if (document.querySelector(".loader")) return
    this.styleDom = document.createElement("style")
    this.styleDom.innerText = this.style
    document.head.appendChild(this.styleDom)
    this.loaderDom = document.createElement("div")
    this.loaderDom.className = "loader"
    this.loaderDom.innerHTML = '<div class="loader"></div>'
    document.body.appendChild(this.loaderDom)
  }

  show() {
    this.createDom()
  }
  hide() {
    if (!document.querySelector(".loader")) return
    document.body.removeChild(this.loaderDom)
    document.head.removeChild(this.styleDom)
  }
}

export const loader = new Loader()
