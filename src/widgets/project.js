export function checkLogin() {
  const hasToken = sessionStorage.getItem("token")
  if (!hasToken) {
    const { pathname } = window.location
    window.location.replace("/?from=" + pathname)
  }
}
