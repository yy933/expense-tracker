const ctx = document.getElementById('myChart')

window.addEventListener('load', (e) => {
  
  const categories = [ '家居', '交通', '休閒娛樂', '餐飲', '其他' ]
  const records = document.querySelectorAll('.records')
  const categoryPercentage = []
  records.forEach(record => {
    const category = record.children[0].children[1].innerText
    const percentage = record.children[2].innerText.replace('%','')
    const categoryPercentageSet = {}
    categories.forEach(categoryItem => {
      if (category === categoryItem) {
        categoryPercentageSet[categoryItem] = percentage
      }
    })
    return categoryPercentage.push(categoryPercentageSet)
  })
  
  const chartCategories = categoryPercentage.map(item => Object.keys(item))
  const chartPercentages = categoryPercentage.map(item => Object.values(item))
  
  
  new Chart(ctx, {
    type: 'pie', 
    data: {
      labels: chartCategories,
      datasets: [{
        label: '比例',
        data: chartPercentages,
        backgroundColor: [
          '#D46A6C',
          '#E9C377',
          '#89A35F',
          '#A96FA8',
          '#D07D59'
        ],
        borderWidth: 1,
        borderColor: '#666666',
        hoverOffset: 4
      }]
    },
  });
})