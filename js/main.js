var hideFiles
var hideImage
var revealImage

document.addEventListener('DOMContentLoaded', function (event) {
  // Assign references to labels.
  var labels = document.getElementsByTagName('label')
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor !== '') {
      var elem = document.getElementById(labels[i].htmlFor)
      if (elem) elem.label = labels[i]
    }
  }

  if (!window.Worker) {
    document.getElementById('webWorkerAlert').classList.remove('d-none')
  }
})

/**
 * Handle hide files upload.
 */
function handleHideFiles (e) {
  var filesInput = document.getElementById('hideFiles')
  var filesOutput = document.getElementById('hideFilesOut')

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
}

// Add event handler for hide files input.
document.getElementById('hideFiles').addEventListener('change', handleHideFiles, false)

/**
 * Handle hide image upload.
 */
function handleHideImage (e) {
  var image = e.target.files
  hideImage = undefined

  var imageInput = document.getElementById('hideImage')
  var imageOutput = document.getElementById('hideImageOut')

  var formGroup = imageInput.closest('.form-group')
  var feedback = formGroup.getElementsByClassName('invalid-feedback')[0]

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
}

// Add event handler for hide image input.
document.getElementById('hideImage').addEventListener('change', handleHideImage, false)

/**
 * Check password field and confirm password are the same.
 */
function validateHidePassword () {
  var hidePasswordConf = document.getElementById('hidePasswordConf')
  if (hidePasswordConf.value === document.getElementById('hidePassword').value) {
    hidePasswordConf.classList.remove('is-invalid')
    hidePasswordConf.classList.add('is-valid')
    return true
  } else {
    hidePasswordConf.classList.remove('is-valid')
    hidePasswordConf.classList.add('is-invalid')
    return false
  }
}

// Add event handler to confirm password change.
document.getElementById('hidePasswordConf').addEventListener('change', validateHidePassword)

// When hide button is clicked.
document.getElementById('hideSubmit').addEventListener('click', function (e) {
  if (hideFiles.length > 0 && hideImage && validateHidePassword()) {
    window.alert('Hiding files.')
  }
})

/**
 * Handle reveal image upload.
 */
function handleRevealImage (e) {
  var image = e.target.files
  revealImage = undefined

  var imageInput = document.getElementById('revealImage')
  var imageOutput = document.getElementById('revealImageOut')

  var formGroup = imageInput.closest('.form-group')
  var feedback = formGroup.getElementsByClassName('invalid-feedback')[0]

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
}

// Add event handler for reveal image input.
document.getElementById('revealImage').addEventListener('change', handleRevealImage, false)

// When reveal button is clicked.
document.getElementById('revealSubmit').addEventListener('click', function (e) {
  if (revealImage) {
    window.alert('Revealing files.')
  }
})

/**
 * Print uploaded files to output.
 */
function printFiles (files, element) {
  var output = []
  for (var i = 0; i < files.length; i++) {
    var f = files[i]
    output.push('<li class="mt-1">', escape(f.name), '<span class="text-muted"> - ', formatBytes(f.size), '</span></li>')
  }

  // Add files to output.
  element.innerHTML = output.join('')
}

/**
 * Format file size into appropriate unit.
 */
function formatBytes (bytes) {
  if (bytes === 0) return '0 Bytes'
  var k = 1024
  var dm = 2
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
