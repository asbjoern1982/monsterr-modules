const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let createDatabaseHandler = () => {
  const adapter = new FileSync('./src/database/db.json')
  const db = low(adapter)
  db.defaults({surveys: []}).write()

  let saveSurvey = (clientId, data) => {
    let survey = {
      id: clientId,
      time: Date.now(),
      survey: data
    }
    db.get('surveys').push(survey).write()
  }

  let exportAsJSON = () => {
    let surveys = db.get('surveys').value()
    console.log(surveys)
    return surveys
  }

  return {
    saveSurvey,
    exportAsJSON
  }
}

export const DatabaseHandler = createDatabaseHandler()
