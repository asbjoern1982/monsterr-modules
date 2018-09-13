/* globals $ */
import createClient from 'monsterr'
import {LatencyModule} from './src/modules/LatencyModule'
import {NetworkModule} from './src/modules/NetworkModule'

import html from './src/admin/admin-client.html'
import './src/admin/admin-client.css'

let options = {
  canvasBackgroundColor: 'red',
  htmlContainerHeight: 0.4,
  // HTML is included in options for admin
  html
}

let events = {
  'resJSON': (admin, json) => {
    let fileName = 'monsterr-modules_' + Date.now() + '.csv'
    let data = JSON.stringify(json)
    let url = window.URL.createObjectURL(new Blob([data], {type: 'text/json'}))
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  },
  'resCSV': (admin, csv) => {
    let fileName = 'monsterr-modules_' + Date.now() + '.csv'
    let url = window.URL.createObjectURL(new Blob([csv], {type: 'text/csv'}))
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
}
let commands = {}
LatencyModule.addAdminClientEvents(events)
NetworkModule.addAdminClientEvents(events)

const admin = createClient({
  events,
  commands,
  options
})

$('#admin-button-start').mouseup(e => {
  e.preventDefault()
  admin.sendCommand('start')
})
$('#admin-button-next').mouseup(e => {
  e.preventDefault()
  admin.sendCommand('next')
})
$('#admin-button-reset').mouseup(e => {
  e.preventDefault()
  admin.sendCommand('reset')
})
$('#admin-button-download-json').mouseup(e => {
  e.preventDefault()
  admin.sendCommand('reqJSON')
})
$('#admin-button-download-csv').mouseup(e => {
  e.preventDefault()
  admin.sendCommand('reqCSV')
})

LatencyModule.setupClient(admin)
NetworkModule.setupClient(admin)
