import HideWorker from './hide.worker'
import RevealWorker from './reveal.worker'
import { validateHidePassword } from './helper'

export default class FileHandler {
  hideFiles
  hideImage
  revealImage
  calculated = false

  /**
   * @private Print uploaded files to output.
   */
  printFiles (files, element) {
    const output = Array.from(files).reduce((prev, file) => [
      ...prev,
      '<li class="mt-1">',
      escape(file.name),
      '<span class="text-muted"> - ',
      this.formatBytes(file.size),
      '</span></li>'
    ], [])

    // Add files to output.
    element.innerHTML = output.join('')
  }

  /**
   * @private Format file size into appropriate unit.
   */
  formatBytes (bytes) {
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
   * @private Hide the given files within the given image.
   */
  hide () {
    $('#weHaveLiftOff').off('click', this.hide.bind(this))

    if (window.Worker) {
      this.calculated = true
      const compression = $('#hideCompression').val()
      const password = $('#hidePasswordConf').val()

      const hideWorker = new HideWorker()

      // Send information to web worker.
      hideWorker.postMessage({
        image: this.hideImage,
        files: this.hideFiles,
        compression: compression,
        password: password
      })

      // Reset progress bar.
      const progressBar = $('#progressBar')
      progressBar.removeClass('bg-success bg-danger')
      progressBar.addClass('progress-bar-animated bg-primary')
      progressBar.css('width', 0)
      progressBar.attr('aria-valuenow', 0)

      // Starting to hide files.
      const progressText = $('#progressText')
      progressText.html('Hiding files inside image.')

      // Reset output.
      const resultOut = $('#resultOut')
      resultOut.html('')
      const filesOut = $('#filesOut')
      filesOut.html('')
      const download = $('#download')
      download.addClass('d-none')
      download.attr('href', '#')

      // When the web worker sends back a result.
      hideWorker.onmessage = (e) => {
        // Update progress.
        progressBar.css('width', `${e.data.progress * 25}%`)
        progressBar.attr('aria-valuenow', (e.data.progress * 25))

        if (e.data.progress === 4) {
          // If the web worker was successful.
          setTimeout(() => {
            progressText.html('Hide successful!')
            progressBar.removeClass('progress-bar-animated')
            progressBar.addClass('bg-success')

            const resultBlob = e.data.result

            // Create URL of result.
            const urlCreator = window.URL || window.webkitURL
            const resultURL = urlCreator.createObjectURL(resultBlob)

            const resultOut = $('#resultOut')
            resultOut.html('Image containing hidden files:')

            // Print file output.
            const fileName = resultURL.split('/').slice(-1)[0]
            const fileType = this.hideImage.type.slice(6)
            const filesOut = $('#filesOut')
            this.printFiles([new window.File([resultBlob], fileName + '.' + fileType)], filesOut)

            // Download button.
            const download = $('#download')
            download.removeClass('d-none')
            download.html('Download Image')
            download.attr('href', resultURL)
          }, 600)
        } else if (e.data.error) {
          // If there was an error, print error.
          this.calculated = false
          progressText.html(e.data.error)
          progressBar.removeClass('progress-bar-animated')
          progressBar.addClass('bg-danger')
        }
      }
    }
  }

  /**
   * @private Reveal the files within the given image.
   */
  reveal () {
    $('#weHaveLiftOff').off('click', this.hide.bind(this))

    if (window.Worker) {
      this.calculated = true
      const password = $('#revealPassword').val()

      const revealWorker = new RevealWorker()

      // Send information to web worker.
      revealWorker.postMessage({
        image: this.revealImage,
        password: password
      })

      // Reset progress bar.
      const progressBar = $('#progressBar')
      progressBar.removeClass('bg-success', 'bg-danger')
      progressBar.addClass('progress-bar-animated', 'bg-primary')
      progressBar.css('width', 0)
      progressBar.attr('aria-valuenow', 0)

      // Starting to hide files.
      const progressText = $('#progressText')
      progressText.html('Revealing files from image.')

      // Reset output.
      const resultOut = $('#resultOut')
      resultOut.html('')
      const filesOut = $('#filesOut')
      filesOut.html('')
      const download = $('#download')
      download.addClass('d-none')
      download.attr('href', '#')

      // When the web worker sends back a result.
      revealWorker.onmessage = (e) => {
        // Update progress.
        progressBar.css('width', `${e.data.progress * 25}%`)
        progressBar.attr('aria-valuenow', e.data.progress * 25)

        if (e.data.progress === 4) {
          // If the web worker was successful.
          setTimeout(() => {
            progressText.html('Reveal successful!')
            progressBar.removeClass('progress-bar-animated')
            progressBar.addClass('bg-success')

            const files = e.data.files
            const zipBlob = e.data.zip

            // Create URL of result.
            const urlCreator = window.URL || window.webkitURL
            const resultURL = urlCreator.createObjectURL(zipBlob)

            // Print file output.
            resultOut.html('Revealed files:')
            this.printFiles(files, filesOut)

            // Download button.
            download.removeClass('d-none')
            download.html('Download ZIP')
            download.attr('href', resultURL)
          }, 600)
        } else if (e.data.error) {
          // If there was an error, print error.
          this.calculated = false
          progressText.html(e.data.error)
          progressBar.removeClass('progress-bar-animated')
          progressBar.addClass('bg-danger')
        }
      }
    }
  }

  /**
   * Handle hide files upload.
   */
  handleHideFiles (e) {
    const filesInput = $('#hideFiles')
    const filesInputLabel = $('label[for="hideFiles"]').first()
    const filesOutput = $('#hideFilesOut')

    // Cancel if no files have been selected.
    if (e.target.files.length === 0) {
      filesInput.removeClass('is-valid')
      filesInputLabel.html('Choose files')
      filesInputLabel.removeClass('text-success')
      filesOutput.html('')
      return false
    }

    this.hideFiles = e.target.files
    this.printFiles(this.hideFiles, filesOutput)

    // Some green so they know it's worked.
    filesInput.addClass('is-valid')
    filesInputLabel.html(
      `${this.hideFiles.length}${this.hideFiles.length === 1 ? ' file chosen' : ' files chosen'}`
    )
    filesInputLabel.addClass('text-success')
  }

  /**
   * Handle hide image upload.
   */
  handleHideImage (e) {
    const image = e.target.files
    this.hideImage = undefined

    const imageInput = $('#hideImage')
    const imageInputLabel = $('label[for="hideImage"]').first()
    const imageOutput = $('#hideImageOut')

    const feedback = imageInput.closest('.form-group').first().find('.invalid-feedback').first()

    // Cancel if no file has been selected.
    if (e.target.files.length === 0) {
      imageInput.removeClass('is-invalid')
      imageInput.removeClass('is-valid')
      imageInputLabel.html('Choose image')
      imageInputLabel.removeClass('text-danger')
      imageInputLabel.removeClass('text-success')
      feedback.css('display', 'none')
      imageOutput.html('')
      return false
    }

    if (image[0].type.indexOf('image') !== -1) {
      this.hideImage = image[0]
      this.printFiles(image, imageOutput)

      // Add valid class to input.
      imageInput.removeClass('is-invalid')
      imageInput.addClass('is-valid')

      // Make everything green.
      imageInputLabel.html('Image chosen')
      imageInputLabel.removeClass('text-danger')
      imageInputLabel.addClass('text-success')
      feedback.css('display', 'none')
    } else {
      // Remove image from output.
      imageOutput.html('')

      // Add invalid class to input.
      imageInput.removeClass('is-valid')
      imageInput.addClass('is-invalid')

      // Make everything red.
      imageInputLabel.html('Choose image')
      imageInputLabel.removeClass('text-success')
      imageInputLabel.addClass('text-danger')
      feedback.css('display', 'block')
    }
  }

  /**
   * Handle reveal image upload.
   */
  handleRevealImage (e) {
    const image = e.target.files
    this.revealImage = undefined

    const imageInput = $('#revealImage')
    const imageInputLabel = $('label[for="revealImage"]').first()
    const imageOutput = $('#revealImageOut')

    const feedback = imageInput.closest('.form-group').first().find('invalid-feedback').first()

    // Cancel if no file has been selected.
    if (e.target.files.length === 0) {
      imageInput.removeClass('is-invalid is-valid')
      imageInput.html('Choose image')
      imageInputLabel.remove('text-danger text-success')
      feedback.css('display', 'none')
      imageOutput.html('')
      return false
    }

    if (image[0].type.indexOf('image') !== -1) {
      this.revealImage = image[0]
      this.printFiles(image, imageOutput)

      // Add valid class to input.
      imageInput.removeClass('is-invalid')
      imageInput.addClass('is-valid')

      // Make everything green.
      imageInputLabel.html('Image chosen')
      imageInputLabel.removeClass('text-danger')
      imageInputLabel.addClass('text-success')
      feedback.css('display', 'none')
    } else {
      // Remove image from output.
      imageOutput.html('')

      // Add invalid class to input.
      imageInput.removeClass('is-valid')
      imageInput.addClass('is-invalid')

      // Make everything red.
      imageInputLabel.html('Choose image')
      imageInputLabel.removeClass('text-success')
      imageInputLabel.addClass('text-danger')
      feedback.css('display', 'block')
    }
  }

  /**
   * Hide files.
   */
  hideSubmit (e) {
    e.preventDefault()
    if (this.hideFiles && this.hideImage && validateHidePassword()) {
      if (this.calculated) {
        // Confirm previous files will be overridden.
        $('#confirmModal').modal()
        $('#confirmModalTitle').html('Hide files within image')
        $('#weHaveLiftOff').on('click', this.hide)
      } else {
        this.hide()
      }
    }
  }

  /**
   * Reveal files.
   */
  revealSubmit (e) {
    e.preventDefault()
    if (this.revealImage) {
      if (this.calculated) {
        // Confirm previous files will be overridden.
        $('#confirmModal').modal()
        $('#confirmModalTitle').html('Reveal files from image')
        $('#weHaveLiftOff').on('click', this.reveal)
      } else {
        this.reveal()
      }
    }
  }
}
