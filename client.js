import createClient from 'monsterr'
import survey from './src/stages/survey/client/client'

const stages = [survey]

let options = {
  canvasBackgroundColor: 'blue',
  htmlContainerHeight: 0 // Hide html
}

let events = {}
let commands = {}

createClient({
  events,
  commands,
  options,
  stages
})
