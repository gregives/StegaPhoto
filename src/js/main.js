import HideWorker from './hide.worker.js'
import RevealWorker from './reveal.worker.js'

$(document).ready(() => {
  // Assign references to labels.
  const labels = document.querySelectorAll('label')
  for (let label of labels) {
    if (label.htmlFor !== '') {
      const elem = document.getElementById(label.htmlFor)
      if (elem) elem.label = label
    }
  }
  // Check if browser supports web workers.
  if (!window.Worker) {
    document.querySelector('#webWorkerAlert').classList.remove('d-none')
  }

  document.querySelector('#hideCompression').addEventListener('change', function () {
    this.value = this.value > 9 ? 9 : this.value
    this.value = this.value < 0 ? 0 : this.value
  })

  let calculated = false
  const fileHandler = (function () {
    let hideFiles
    let hideImage
    let revealImage

    /**
     * Print uploaded files to output.
     */
    function printFiles(files, element) {
      let output = []
      for (let file of files) {
        output.push('<li class="mt-1">', escape(file.name), '<span class="text-muted"> - ', formatBytes(file.size), '</span></li>')
      }

      // Add files to output.
      element.innerHTML = output.join('')
    }

    /**
     * Format file size into appropriate unit.
     */
    function formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const dm = 2
      const sizes = [
        'Bytes',
        'KB',
        'MB',
        'GB',
        'TB'
      ]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    /**
     * Hide the given files within the given image.
     */
    function hide() {
      document.querySelector('#weHaveLiftOff').removeEventListener('click', hide)

      if (window.Worker) {
        calculated = true
        const compression = document.querySelector('#hideCompression').value
        const password = document.querySelector('#hidePasswordConf').value

        const hideWorker = new HideWorker()

        // Send information to web worker.
        hideWorker.postMessage({
          image: hideImage,
          files: hideFiles,
          compression: compression,
          password: password
        })

        // Reset progress bar.
        const progressBar = document.querySelector('#progressBar')
        progressBar.classList.remove('bg-success', 'bg-danger')
        progressBar.classList.add('progress-bar-animated', 'bg-primary')
        progressBar.style.width = 0
        progressBar.setAttribute('aria-valuenow', 0)

        // Starting to hide files.
        const progressText = document.querySelector('#progressText')
        progressText.innerHTML = 'Hiding files inside image.'

        // Reset output.
        const resultOut = document.querySelector('#resultOut')
        resultOut.innerHTML = ''
        const filesOut = document.querySelector('#filesOut')
        filesOut.innerHTML = ''
        const download = document.querySelector('#download')
        download.classList.add('d-none')
        download.href = '#'

        // When the web worker sends back a result.
        hideWorker.onmessage = function (e) {
          // Update progress.
          progressBar.style.width = e.data.progress * 25 + '%'
          progressBar.setAttribute('aria-valuenow', e.data.progress * 25)

          if (e.data.progress === 4) {
            // If the web worker was successful.
            setTimeout(function () {
              progressText.innerHTML = 'Hide successful!'
              progressBar.classList.remove('progress-bar-animated')
              progressBar.classList.add('bg-success')

              const resultBlob = e.data.result

              // Create URL of result.
              const urlCreator = window.URL || window.webkitURL
              const resultURL = urlCreator.createObjectURL(resultBlob)

              const resultOut = document.querySelector('#resultOut')
              resultOut.innerHTML = 'Image containing hidden files:'

              // Print file output.
              const fileName = resultURL.split('/').slice(-1)[0]
              const fileType = hideImage.type.slice(6)
              const filesOut = document.querySelector('#filesOut')
              printFiles([new window.File([resultBlob], fileName + '.' + fileType)], filesOut)

              // Download button.
              const download = document.querySelector('#download')
              download.classList.remove('d-none')
              download.innerHTML = 'Download Image'
              download.href = resultURL
            }, 600)
          } else if (e.data.error) {
            // If there was an error, print error.
            calculated = false
            progressText.innerHTML = e.data.error
            progressBar.classList.remove('progress-bar-animated')
            progressBar.classList.add('bg-danger')
          }
        }
      }
    }

    /**
     * Reveal the files within the given image.
     */
    function reveal() {
      document.querySelector('#weHaveLiftOff').removeEventListener('click', hide)

      if (window.Worker) {
        calculated = true
        const password = document.querySelector('#revealPassword').value

        const revealWorker = new RevealWorker()

        // Send information to web worker.
        revealWorker.postMessage({
          image: revealImage,
          password: password
        })

        // Reset progress bar.
        const progressBar = document.querySelector('#progressBar')
        progressBar.classList.remove('bg-success', 'bg-danger')
        progressBar.classList.add('progress-bar-animated', 'bg-primary')
        progressBar.style.width = 0
        progressBar.setAttribute('aria-valuenow', 0)

        // Starting to hide files.
        const progressText = document.querySelector('#progressText')
        progressText.innerHTML = 'Revealing files from image.'

        // Reset output.
        const resultOut = document.querySelector('#resultOut')
        resultOut.innerHTML = ''
        const filesOut = document.querySelector('#filesOut')
        filesOut.innerHTML = ''
        const download = document.querySelector('#download')
        download.classList.add('d-none')
        download.href = '#'

        // When the web worker sends back a result.
        revealWorker.onmessage = function (e) {
          // Update progress.
          progressBar.style.width = e.data.progress * 25 + '%'
          progressBar.setAttribute('aria-valuenow', e.data.progress * 25)

          if (e.data.progress === 4) {
            // If the web worker was successful.
            setTimeout(function () {
              progressText.innerHTML = 'Reveal successful!'
              progressBar.classList.remove('progress-bar-animated')
              progressBar.classList.add('bg-success')

              const files = e.data.files
              const zipBlob = e.data.zip

              // Create URL of result.
              const urlCreator = window.URL || window.webkitURL
              const resultURL = urlCreator.createObjectURL(zipBlob)

              // Print file output.
              resultOut.innerHTML = 'Revealed files:'
              printFiles(files, filesOut)

              // Download button.
              download.classList.remove('d-none')
              download.innerHTML = 'Download ZIP'
              download.href = resultURL
            }, 600)
          } else if (e.data.error) {
            // If there was an error, print error.
            calculated = false
            progressText.innerHTML = e.data.error
            progressBar.classList.remove('progress-bar-animated')
            progressBar.classList.add('bg-danger')
          }
        }
      }
    }

    return {
      /**
       * Handle hide files upload.
       */
      handleHideFiles: function (e) {
        const filesInput = document.querySelector('#hideFiles')
        const filesOutput = document.querySelector('#hideFilesOut')

        // Cancel if no files have been selected.
        if (e.target.files.length === 0) {
          filesInput.classList.remove('is-valid')
          filesInput.label.innerHTML = 'Choose files'
          filesInput.label.classList.remove('text-success')
          filesOutput.innerHTML = ''
          return false
        }

        hideFiles = e.target.files
        printFiles(hideFiles, filesOutput)

        // Some green so they know it's worked.
        filesInput.classList.add('is-valid')
        filesInput.label.innerHTML = hideFiles.length + (hideFiles.length === 1 ? ' file chosen' : ' files chosen')
        filesInput.label.classList.add('text-success')
      },

      /**
       * Handle hide image upload.
       */
      handleHideImage: function (e) {
        const image = e.target.files
        hideImage = undefined

        const imageInput = document.querySelector('#hideImage')
        const imageOutput = document.querySelector('#hideImageOut')

        const formGroup = imageInput.closest('.form-group')
        const feedback = formGroup.getElementsByClassName('invalid-feedback')[0]

        // Cancel if no file has been selected.
        if (e.target.files.length === 0) {
          imageInput.classList.remove('is-invalid')
          imageInput.classList.remove('is-valid')
          imageInput.label.innerHTML = 'Choose image'
          imageInput.label.classList.remove('text-danger')
          imageInput.label.classList.remove('text-success')
          feedback.style.display = 'none'
          imageOutput.innerHTML = ''
          return false
        }

        if (image[0].type.indexOf('image') !== -1) {
          hideImage = image[0]
          printFiles(image, imageOutput)

          // Add valid class to input.
          imageInput.classList.remove('is-invalid')
          imageInput.classList.add('is-valid')

          // Make everything green.
          imageInput.label.innerHTML = 'Image chosen'
          imageInput.label.classList.remove('text-danger')
          imageInput.label.classList.add('text-success')
          feedback.style.display = 'none'
        } else {
          // Remove image from output.
          imageOutput.innerHTML = ''

          // Add invalid class to input.
          imageInput.classList.remove('is-valid')
          imageInput.classList.add('is-invalid')

          // Make everything red.
          imageInput.label.innerHTML = 'Choose image'
          imageInput.label.classList.remove('text-success')
          imageInput.label.classList.add('text-danger')
          feedback.style.display = 'block'
        }
      },

      /**
       * Handle reveal image upload.
       */
      handleRevealImage: function (e) {
        const image = e.target.files
        revealImage = undefined

        const imageInput = document.querySelector('#revealImage')
        const imageOutput = document.querySelector('#revealImageOut')

        const formGroup = imageInput.closest('.form-group')
        const feedback = formGroup.getElementsByClassName('invalid-feedback')[0]

        // Cancel if no file has been selected.
        if (e.target.files.length === 0) {
          imageInput.classList.remove('is-invalid')
          imageInput.classList.remove('is-valid')
          imageInput.label.innerHTML = 'Choose image'
          imageInput.label.classList.remove('text-danger')
          imageInput.label.classList.remove('text-success')
          feedback.style.display = 'none'
          imageOutput.innerHTML = ''
          return false
        }

        if (image[0].type.indexOf('image') !== -1) {
          revealImage = image[0]
          printFiles(image, imageOutput)

          // Add valid class to input.
          imageInput.classList.remove('is-invalid')
          imageInput.classList.add('is-valid')

          // Make everything green.
          imageInput.label.innerHTML = 'Image chosen'
          imageInput.label.classList.remove('text-danger')
          imageInput.label.classList.add('text-success')
          feedback.style.display = 'none'
        } else {
          // Remove image from output.
          imageOutput.innerHTML = ''

          // Add invalid class to input.
          imageInput.classList.remove('is-valid')
          imageInput.classList.add('is-invalid')

          // Make everything red.
          imageInput.label.innerHTML = 'Choose image'
          imageInput.label.classList.remove('text-success')
          imageInput.label.classList.add('text-danger')
          feedback.style.display = 'block'
        }
      },

      /**
       * Hide files.
       */
      hideSubmit: function (e) {
        e.preventDefault()
        if (hideFiles && hideImage && validateHidePassword()) {
          if (calculated) {
            // Confirm previous files will be overridden.
            window.$('#confirmModal').modal()
            document.querySelector('#confirmModalTitle').innerHTML = 'Hide files within image'
            document.querySelector('#weHaveLiftOff').addEventListener('click', hide)
          } else {
            hide()
          }
        }
      },

      /**
       * Reveal files.
       */
      revealSubmit: function (e) {
        e.preventDefault()
        if (revealImage) {
          if (calculated) {
            // Confirm previous files will be overridden.
            window.$('#confirmModal').modal()
            document.querySelector('#confirmModalTitle').innerHTML = 'Reveal files from image'
            document.querySelector('#weHaveLiftOff').addEventListener('click', reveal)
          } else {
            reveal()
          }
        }
      }
    }
  })()

  /**
   * Check password field and confirm password are the same.
   */
  function validateHidePassword() {
    const hidePasswordConf = document.querySelector('#hidePasswordConf')
    if (hidePasswordConf.value === document.querySelector('#hidePassword').value) {
      hidePasswordConf.classList.remove('is-invalid')
      hidePasswordConf.classList.add('is-valid')
      return true
    } else {
      hidePasswordConf.classList.remove('is-valid')
      hidePasswordConf.classList.add('is-invalid')
      return false
    }
  }

// Add event handler for hide files input.
  document.querySelector('#hideFiles').addEventListener('change', fileHandler.handleHideFiles, false)

// Add event handler for hide image input.
  document.querySelector('#hideImage').addEventListener('change', fileHandler.handleHideImage, false)

// Add event handler for reveal image input.
  document.querySelector('#revealImage').addEventListener('change', fileHandler.handleRevealImage, false)

// Add event handler for password confirmation.
  document.querySelector('#hidePasswordConf').addEventListener('change', validateHidePassword)

// When hide button is clicked.
  document.querySelector('#hide form').addEventListener('submit', fileHandler.hideSubmit)

// When reveal button is clicked.
  document.querySelector('#reveal form').addEventListener('submit', fileHandler.revealSubmit)
})
