# Modules
A couple of addons and useful examples for the Monsterr framework.

## LatencyModule
A module for the admin client that shows the latency of each client on a graph

#### setup
1) download the chart.js module for npm: npm install chart.js
2) for /server.js add the following lines:
  a) in the top: import {LatencyModule} from './src/modules/LatencyModule'
  b) between commands is declared and before the server is created: LatencyModule.addServerCommands(commands)
3) for /admin-client.js add the following lines
  a) in the top: import {LatencyModule} from './src/modules/LatencyModule'
  b) between events is declared and before the server is created: LatencyModule.addAdminClientEvents(events)
  c) after the admin-client is created: LatencyModule.setupClient(admin)

## NetworkModule
A module for the admin client that gives an overview over how the clients are connected.

#### setup
1) download the vis.js module for npm: npm install vis
2) for /server.js add the following lines:
  a) in the top: `import {NetworkModule} from './src/modules/NetworkModule'`
  b) move network out of createServer and declare it as a local variable: `let network = Network.pairs(8)`
  c) after that: `NetworkModule.addServerCommands(commands, network)`
3) for /admin-client.js add the following lines
  a) in the top: `import {NetworkModule} from './src/modules/NetworkModule'`
  b) between events is declared and before the server is created: `NetworkModule.addAdminClientEvents(events)`
  c) after the admin-client is created: `NetworkModule.setupClient(admin)`

## Survey
An example stage for a survey that uses the surveyjs package for node, so it is easy to generate new surveys with a survey builder.

When a client is finished with the survey it sends the data to the client that saves it to a json-file with lowdb. The adminclient can at any time request the saved data as either json or csv (note that some advanced survey features is not supported by the csv converter, so it might be safer to save the json file). The data is stored in the db.json file till it is cleared or deleted.

#### setup
1) install the database in node: npm install lowdb
2) copy the ./src/database/ folder to your project (clear the db.json file)
3) copy the servey stage and rename it, for example: pre-survey or post-survey
4) to the root server.js file, add the import database and commands
5) to the admin client, add the button in html, add the listener and the events
6) generate your own survey.json file from https://surveyjs.io/Survey/Builder and add it to the client folder of the stage
7) edit the client.html, thanks.html and any images to taste
