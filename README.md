# StegaPhoto

**StegaPhoto** is a simple website created to hide files within images, a form of *steganography*. It is built in vanilla JavaScript using SubtleCrypto, Web Workers, JSZip and Bootstrap. **StegaPhoto does not send data to a server** - the website only uses **client-side JavaScript**. The process of the project is outlined below.

1. [Preliminary Research](#1-preliminary-research)

    1.1. [What Is Steganography?](#11-what-is-steganography)

    1.2. [Types of Steganography](#12-types-of-steganography)

    1.3. [End of File Markers](#13-end-of-file-markers)

2. [Implementation](#2-implementation)

    2.1. [Hiding the Files](#21-hiding-the-files)

    2.2. [Revealing the Files](#22-revealing-the-files)

3. [License](#3-license)

## 1. Preliminary Research

#### 1.1. What Is Steganography?

Here's a short summary of what steganography is all about:

_Steganography is the practice of concealing a file, message, image, or video within another file, message, image, or video. The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny. Plainly visible encrypted messages, no matter how unbreakable they are, arouse interest and may in themselves be incriminating. The first recorded use of steganography can be traced back to 440 BC, but it continues to be an incredibly versatile and effective method for obscuring or hiding information in plain sight._

#### 1.2. Types of Steganography

There are many steganography techniques for hiding data, however with the aim of hiding files inside images, only two methods were viable:

  * **Hiding the file data within the image data**, replacing unnecessary image data with the information to be hidden. This method usually works by hiding the data in the least significant bits of the colour component of images. The file size remains the same (as data is only replaced, not added) which means that the steganography is hard to spot, but only a very small amount of information can be hidden in each image.

  * **Adding the file data alongside the image data**, which increases the total file size but retains the full image quality. By adding hidden data into an ignored section of a file, such as after the logical end of the image, any amount of information can be hidden. However, this method is easier to spot as the file size will increase and the file can be examined to show the extra information.

  The second method was chosen as the focus for this project, with the view of the end user hiding any number of files in an image, irrespective of the resolution of that image.

#### 1.3. End Of File Markers

End of file (EOF) markers or chunks define the end of the file's data stream. There should be no content after the EOF marker and so any data placed after the marker will be ignored by software parsing the file.

The EOF markers for images file types are as follows:

  * PNG: `AE426082`
  * JPEG: `FFD9`
  * GIF: `3B`

## 2. Implementation

#### 2.1. Hiding the Files

The files are hidden inside the image through a series of steps:

  1. Firstly the image is read. In StegaPhoto, all files are read as an array buffer using the [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). The image is then converted into a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (an array of 8-bit unsigned integers).

  2. The files are then archived using [JSZip](https://stuk.github.io/jszip/), with the option of compression. The resulting ZIP file is to be hidden inside the image.

  3. Next comes the encryption of the ZIP (and hence the files inside the ZIP). The encryption uses the [SubtleCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) and involves 3 steps:

      1. The plaintext password is imported to create a *derivation key*.

      2. The *derivation key* is hashed using **SHA-256** and a salt; the salt is a Uint8Array taken from the start of the image (this prevents a dictionary attack of passwords). A new key is then derived using the **PBKDF2** algorithm.

      3. Finally, the files can be encrypted using this new *encryption key*. StegaPhoto uses the symmetric **AES-CTR** algorithm to encrypt the data.

  4. After encrypting the ZIP of files, the resulted is converted to another Uint8Array. The image and the encrypted ZIP are then concatenated, to place the files after the [EOF marker](#13-end-of-file-markers).

      ```
         Original image file
      ╭────────────┸────────────╮
      | Contents of image | EOF | Encrypted ZIP |
      ```

  5. The files are now hidden inside the image. Finally the image is converted to a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and a [URL is created](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) to download the resulting image.

#### 2.2. Revealing the Files

Revealing the files is a similar process to hiding, albeit in reverse:

  1. The file is read using the FileReader API and converted to a Uint8Array.

  2. The [EOF marker](#13-end-of-file-markers) is found by iterating through the array. The files to be retrieved immediately follow the EOF marker.

      * If no content follows the EOF marker, then the image does not contain any hidden files.

  3. The decryption of the hidden ZIP uses the same technique as is used for encryption: however, the *derivation key* is used to derive a *decryption key* which is then used with the **AES-CTR** algorithm to decrypt the data.

  4. After the ZIP has been decrypted, the files can then be extracted using the JSZip library - these should be exactly the same as the original files, bit-for-bit.

  5. Although the files have been extracted from the ZIP, for ease it is the ZIP which is offered to the end user to download.

## 3. License

This project is licensed under the GPLv3 License. See the [LICENSE](./LICENSE) file for details.
