import createServer, { Network, Events } from 'monsterr'
import {LatencyModule} from './src/modules/LatencyModule'
import {NetworkModule} from './src/modules/NetworkModule'
import {CPUModule} from './src/modules/CPUModule'
import survey from './src/stages/survey/server/server'
import {DatabaseHandler} from './src/database/DatabaseHandler'

const stages = [survey]

let events = {
  [Events.CLIENT_CONNECTED] (server, clientId) {
    server.start()
  }
}
let commands = {
  'reqJSON': (server, clientId) => {
    let json = DatabaseHandler.exportAsJSON()
    server.send('resJSON', json).toAdmin()
  },
  'reqCSV': (server, clientId) => {
    let csv = DatabaseHandler.exportAsCSV()
    server.send('resCSV', csv).toAdmin()
  }
}
LatencyModule.addServerCommands(commands)
let network = Network.pairs(8)
NetworkModule.addServerCommands(commands, network)
CPUModule.addServerEvents(events)

const monsterr = createServer({
  network: network,
  events,
  commands,
  stages,
  options: {
    clientPassword: undefined, // can specify client password
    adminPassword: 'sEcr3t' // and admin password
  }
})

monsterr.run()
