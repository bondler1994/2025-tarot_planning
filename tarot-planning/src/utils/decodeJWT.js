import dayjs from 'dayjs'

export function decodeJwtResponse(token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

export function decodeExp(token) {
  try {
    const { exp } = decodeJwtResponse(token)
    return dayjs.unix(exp)
  } catch {
    return dayjs(0) // 視同已過期
  }
}
