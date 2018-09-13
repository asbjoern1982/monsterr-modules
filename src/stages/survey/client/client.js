import * as Survey from 'survey-jquery'
import html from './client.html'
import htmlThanks from './thanks.html'
import './client.css'
import surveyJSON from './survey.json'

export default {
  html,
  commands: {finish (client) {
    client.stageFinished()
    return false
  }},
  events: {},
  setup: (client) => {
    function surveyCompleted (survey) {
      client.send('pre-survey_result', survey.data)
      $('#pre-survey').html(htmlThanks)
    }

    Survey.StylesManager.applyTheme('bootstrap')
    let surveyModel = new Survey.Model(surveyJSON)

    $('#client-start-survey').on('click', () => {
      // TODO as we do not have access to links and scripts this workaround seems to work
      $.getScript('https://surveyjs.azureedge.net/1.0.25/survey.jquery.min.js', () => {
        $('#pre-survey').Survey({
          model: surveyModel,
          onComplete: surveyCompleted
        })
      })
    })
  },
  teardown: (client) => {},
  options: {htmlContainerHeight: 1}
}
