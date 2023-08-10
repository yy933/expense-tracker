module.exports = (itemName, amount, categoryId, date) => {
  const errors = []
  if (!itemName || !amount || !categoryId || !date) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (amount <= 0) {
    errors.push({ message: '金額必須至少為1元' })
  }
  return errors
}
