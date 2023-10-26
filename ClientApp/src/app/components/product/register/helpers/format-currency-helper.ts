export const moneyMask = (value: any) => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  )
  return 'R$ ' + result
}
