module.exports = (orderBy) => {
  let orderOption
  if (orderBy === 'date-desc') {
    orderOption = { date: 'desc' }
  } else if (orderBy === 'date-asc') {
    orderOption = { date: 'asc' }
  } else if (orderBy === 'amount-desc') {
    orderOption = { amount: 'desc' }
  } else if (orderBy === 'amount-asc') {
    orderOption = { amount: 'asc' }
  }
  return orderOption
}
