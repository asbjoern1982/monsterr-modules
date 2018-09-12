import {Events} from 'monsterr'
import {DatabaseHandler} from '../../../database/DatabaseHandler'

export default {
  commands: {},
  events: {
    [Events.CLIENT_RECONNECTED]: (server, clientId) => {
      setTimeout(() => {
        let stageNo = server.getCurrentStage().number
        server.send(Events.START_STAGE, stageNo).toClient(clientId)
      }, 500)
    },
    [Events.CLIENT_CONNECTED] (server, clientId) {
      setTimeout(() => {
        let stageNo = server.getCurrentStage().number
        server.send(Events.START_STAGE, stageNo).toClient(clientId)
      }, 500)
    },
    'pre-survey_result': function (server, clientId, data) {
      DatabaseHandler.saveSurvey(clientId, data)
    }
  },
  setup: (server) => {},
  teardown: (server) => {
    console.log('CLEANUP SERVER AFTER STAGE', server.getCurrentStage())
  },
  options: {}
}
