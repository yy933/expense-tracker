const { google } = require('googleapis')

const credentials = require('./pkey.json')
const scopes = ['https://www.googleapis.com/auth/drive.file']

async function uploadCsvFile (filename, content) {
  try {
    const client = await google.auth.getClient({ credentials, scopes })
    const drive = google.drive({ version: 'v3', auth: client })
    const files = await drive.files.create({
      resource: {
        name: filename,
        mimeType: 'application/vnd.google-apps.spreadsheet',
        convert: true
      },
      media: {
        mimeType: 'text/csv',
        body: content
      },
      fields: 'id, webViewLink'
    })

    if (files) {
      console.log(files.data)
    } else {
      console.log('No files found.')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = uploadCsvFile
