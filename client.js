import createClient from 'monsterr'
import {CPUModule} from './src/modules/CPUModule'
import survey from './src/stages/survey/client/client'

const stages = [survey]

let options = {
  canvasBackgroundColor: 'blue',
  htmlContainerHeight: 0 // Hide html
}

let events = {}
let commands = {}

let client = createClient({
  events,
  commands,
  options,
  stages
})
CPUModule.setupClient(client)
