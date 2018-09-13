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
    return surveys
  }

  let exportAsCSV = () => {
    let surveys = db.get('surveys').value()
    // get a list of headers (questions)
    let headers = [...new Set([].concat(...surveys.map(survey => Object.keys(survey.survey))))].sort()

    // for each survey, add id, time and questions, if it is not present,
    // it just adds ',' so the columns are presisent and multiple answers are
    // put into quotes
    return 'clientId,time,' + headers.join() + '\n' +
      surveys.map(survey =>
        survey['id'] + ',' +
        survey['time'] + ',' +
        headers.map((header) =>
          survey.survey[header]
            ? (Array.isArray(survey.survey[header])
              ? '"' + survey.survey[header].join() + '"'
              : survey.survey[header])
            : ''
        ).join()
      ).join('\n')
  }

  return {
    saveSurvey,
    exportAsJSON,
    exportAsCSV
  }
}

export const DatabaseHandler = createDatabaseHandler()
