export function requiredRule(val) {
  if (!(val && val.length > 0)) {
    return '必填'
  }

  return true
}

export function emailRule(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return 'email 格式不正確'
  }
  return true
}

export function passwordRule(password) {
  if (password.length < 8 || password.length > 16) {
    return '密碼長度須 8~16 位'
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return '密碼須包含英文大小寫'
  }

  if (!/[0-9]/.test(password)) {
    return '密碼須包含數字'
  }

  return true
}

export function passwordConfirmRule(val, pwd) {
  if (!(val === pwd)) {
    return '密碼不相同'
  }

  return true
}

export function confirmRule(val) {
  if (!val) {
    return '請勾選'
  }

  return true
}
