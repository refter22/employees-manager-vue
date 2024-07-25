export function formatPhoneNumber (phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '')

  const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
  if (match) {
    return '+7' +
      (match[2] ? ` (${match[2]}` : '') +
      (match[3] ? `) ${match[3]}` : '') +
      (match[4] ? `-${match[4]}` : '') +
      (match[5] ? `-${match[5]}` : '')
  }

  return phoneNumber
}

export function cleanPhoneNumber (phoneNumber) {
  return phoneNumber.replace(/\D/g, '')
}
