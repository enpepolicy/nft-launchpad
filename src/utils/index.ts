function formatPrice(x: number | string, float: number | null = null) {
    x = Number(x)
    const price = Number.parseFloat(String(x))
    if (float) {
      return price.toFixed(float)
    }
  
    return `${price}`
  }
  
  function truncateAddress(str: string, maxLn = 9): string {
    const beforeNum: number = Math.ceil((maxLn - 3) * 0.5)
    const afterNum: number = Math.floor((maxLn - 3) * 0.5)
    const ln: number = str.length
  
    if (ln > maxLn + 3) {
      return str.substring(0, beforeNum) + '....' + str.substring(ln - afterNum)
    }
    return str
  }
  
  export { formatPrice, truncateAddress }