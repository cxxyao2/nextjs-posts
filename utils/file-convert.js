// The base64 encoded file should be converted to Blob before bing uploaded to server.
export function base64ToBlob(urlData, type) {
  let arr = urlData.split(',')
  // regular expression: *  +  are greedy, we can add ? sign to limit the match length to minimum
  let mime = arr[0].match(/:(.*?);/)[1] || type
  //
  // atob() function decodes a string of data which has been encoded using Base64 encoding.  decode
  // You can use the btoa() method to encode and transmit data which may otherwise cause communication problems,
  // then transmit it and use the atob() method to decode the data again

  let byteCharacters = atob(arr[1])
  let sliceSize = 512
  let byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: mime })
  return blob
}

/**
 *
 * @param {BlobPart} blobData
 * @param {string} localFileName
 * @param {any} fileType
 */
export function saveBlobtoLocalFile(
  blobData,
  localFileName,
  fileType = 'jpeg'
) {
  var file = new File([blobData], { type: fileType })

  const downloadAncher = document.createElement('a')
  downloadAncher.style.display = 'none'
  const fileURL = URL.createObjectURL(file)
  downloadAncher.href = fileURL
  downloadAncher.download = localFileName
  downloadAncher.click()
  URL.revokeObjectURL(fileURL) // free up storage
}

/**
 *
 * @param {Array} initData
 * @returns {string}
 */
export function makeCSV(initData) {
  let csv = ''
  let output = []
  const fields = Object.keys(initData[0])
  output.push(fields)
  initData.forEach((row) => {
    let rowData = []
    for (const [key, value] of Object.entries(row)) {
      rowData.push(value)
    }
    output.push(rowData)
  })

  output.forEach((value) => {
    value.forEach((item, i) => {
      let innerValue = item === null ? '' : '' + item
      let result = innerValue.replace(/"/g, '""')
      // " , \n   these 3 signs means the end of line
      if (result.search(/("|,|\n)/g) >= 0) {
        result = '"' + result + '"'
      }
      if (i > 0) {
        csv += ','
      }
      csv += result
    })
    csv += '\n'
  })
  return csv
}
