this.onmessage = function (e) {
  const worker = this

  const image = e.data.image
  const password = e.data.password

  // Import scripts.
  worker.importScripts('../3rdp/jszip.min.js')

  worker.postMessage({
    status: 0
  })

  // Read image file as array buffer.
  const reader = new this.FileReader()
  reader.readAsArrayBuffer(image)
  reader.onload = function () {
    worker.postMessage({
      status: 1
    })

    const imageUint = new Uint8Array(reader.result)

    // Get type of image.
    const type = image.type.slice(6)

    let endOfFile
    switch (type) {
      case 'png':
        endOfFile = [174, 66, 96, 130]
        break
      case 'jpeg':
        endOfFile = [255, 217]
        break
      case 'gif':
        endOfFile = [59]
    }

    let indexOfZip
    for (let i = 0; i < imageUint.length; i++) {
      let found = true
      for (let j = 0; j < endOfFile.length; j++) {
        if (imageUint[i + j] !== endOfFile[j]) {
          found = false
        }
      }

      if (found) {
        indexOfZip = i + endOfFile.length
        break
      }
    }

    const encrypted = imageUint.slice(indexOfZip)
    const passwordUint = new worker.TextEncoder().encode(password)

    // Import key using password.
    worker.crypto.subtle.importKey('raw', passwordUint, {
      name: 'PBKDF2'
    }, false, ['deriveKey']).then(function (derKey) {
      // Derivation algorithm.
      const derAlg = {
        name: 'PBKDF2',
        salt: imageUint.slice(0, 16),
        iterations: 1000,
        hash: { name: 'SHA-256' }
      }

      // Derive new key from PBKDF2 key.
      worker.crypto.subtle.deriveKey(derAlg, derKey, {
        name: 'AES-CTR',
        length: 256
      }, false, ['decrypt']).then(function (encKey) {
        worker.postMessage({
          status: 2
        })

        // Decryption algorithm.
        const encAlg = {
          name: 'AES-CTR',
          counter: new Uint8Array(16),
          length: 128
        }

        // Decrypt data using new key.
        worker.crypto.subtle.decrypt(encAlg, encKey, encrypted.buffer).then(function (decrypted) {
          worker.postMessage({
            status: 3
          })

          const zipUint = new Uint8Array(decrypted)

          // New zip to read.
          const zip = new worker.JSZip()

          let files = []
          zip.loadAsync(zipUint).then(function (contents) {
            Object.keys(contents.files).forEach(function (filename) {
              zip.files[filename].async('arraybuffer').then(function (content) {
                files.push([content, filename])
                if (files.length === Object.keys(contents.files).length) {
                  worker.postMessage({
                    status: 4,
                    files: files
                  })
                }
              })
            })
          }, function () {
            console.log('Failed to read zip')
          })
        })
      })
    })
  }
}
