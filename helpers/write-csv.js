const fs = require('fs')
const { stringify } = require('csv-stringify')
const path = require('path')

const generateCSV = (data, userId) => {
  stringify(data,
    { header: true },
    async (error, output) => {
      if (error) return console.log(error)
      await Promise.all([
        fs.writeFile(path.join(__dirname, `../download/user${userId}Report.csv`), '\ufeff', (err) => {
          if (err) return console.log(err)
        }),
        fs.appendFile(path.join(__dirname, `../download/user${userId}Report.csv`), output, (err) => {
          if (err) return console.log(err)
        })
      ])
    }
  )
}

module.exports = generateCSV
