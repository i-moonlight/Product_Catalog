export const moneyMask = (value: any) => {
  let result;
  const options = { minimumFractionDigits: 2 }

      if(typeof value === "string"){
        value = value.replace('.', '').replace(',', '').replace(/\D/g, '');
        result = new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(value) / 100)
      }
      else{
        result = new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(value))
      }


  return 'R$ ' + result
}
