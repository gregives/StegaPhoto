this.onmessage = function (e) {
  const worker = this

  const files = e.data.files
  const image = e.data.image
  const password = e.data.password

  // Set compression level.
  const compression = parseInt(e.data.compression) === 0 ? 'STORE' : 'DEFLATE'
  const compressionLevel = [...Array(10).keys()].reduce(function (prev, curr) {
    return (Math.abs(curr - e.data.compression) < Math.abs(prev - e.data.compression) ? curr : prev)
  })

  // Import scripts.
  worker.importScripts('../3rdp/jszip.min.js')

  worker.postMessage({
    progress: 0
  })

  // Read image file as array buffer.
  const reader = new this.FileReader()
  reader.readAsArrayBuffer(image)
  reader.onload = function () {
    worker.postMessage({
      progress: 1
    })

    // Array buffer to Uint8Array.
    const imageUint = new Uint8Array(reader.result)

    // Create new zip and add files.
    const zip = new worker.JSZip()
    for (let file of files) {
      zip.file(file.name, file)
    }

    // Generate zip file as a Uint8Array.
    zip.generateAsync({
      type: 'uint8array',
      compression: compression,
      compressionOptions: { level: compressionLevel }
    }).then(function (zipUint) {
      worker.postMessage({
        progress: 2
      })

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
        }, false, ['encrypt']).then(function (encKey) {
          worker.postMessage({
            progress: 3
          })

          // Encryption algorithm.
          const encAlg = {
            name: 'AES-CTR',
            counter: new Uint8Array(16),
            length: 128
          }

          // Encrypt data using new key.
          worker.crypto.subtle.encrypt(encAlg, encKey, zipUint.buffer).then(function (encrypted) {
            const zipUint = new Uint8Array(encrypted)

            // Concatenate image and encrypted zip.
            const resultUint = new Uint8Array(imageUint.length + zipUint.length)
            resultUint.set(imageUint, 0)
            resultUint.set(zipUint, imageUint.length)

            // Get type of image.
            const type = image.type.slice(6)

            // Convert result to blob.
            const resultBlob = new worker.Blob([resultUint], { type: `image/${type}` })

            worker.postMessage({
              progress: 4,
              result: resultBlob
            })

            worker.close()
          })
        })
      })
    })
  }
}
