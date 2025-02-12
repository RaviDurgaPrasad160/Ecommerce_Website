const displayINRCurrency = (amount)=>{
    const amountInRupiah = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    })
    return amountInRupiah.format(amount)
}

export default displayINRCurrency