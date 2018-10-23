import 'bootstrap/js/dist/tab'
import 'bootstrap/js/dist/util'
import 'bootstrap/js/dist/button'

import FileHandler from './file-handler'
import { validateHidePassword } from './helper'

$(document).ready(() => {
  // Assign references to labels.
  const labels = $('label')
  labels.each(function () {
    const labelFor = $(this).attr('for')
    if (labelFor) {
      const elem = $(`#${labelFor}`)
      elem.label = this
    }
  })
  // Check if browser supports web workers.
  if (!window.Worker) {
    $('#webWorkerAlert').removeClass('d-none')
  }

  $('#hideCompression').on('change', function () {
    this.value = this.value > 9 ? 9 : this.value
    this.value = this.value < 0 ? 0 : this.value
  })

  const fileHandler = new FileHandler()

  // Add event handler for hide files input.
  document.querySelector('#hideFiles').addEventListener('change', fileHandler.handleHideFiles.bind(fileHandler), false)

  // Add event handler for hide image input.
  document.querySelector('#hideImage').addEventListener('change', fileHandler.handleHideImage.bind(fileHandler), false)

  // Add event handler for reveal image input.
  document.querySelector('#revealImage').addEventListener('change', fileHandler.handleRevealImage.bind(fileHandler), false)

  // Add event handler for password confirmation.
  $('#hidePasswordConf').on('change', validateHidePassword)

  // When hide button is clicked.
  $('#hide form').on('submit', fileHandler.hideSubmit.bind(fileHandler))

  // When reveal button is clicked.
  $('#reveal form').on('submit', fileHandler.revealSubmit.bind(fileHandler))
})
