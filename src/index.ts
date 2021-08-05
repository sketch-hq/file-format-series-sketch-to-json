import FileFormat from '@sketch-hq/sketch-file-format-ts'
import { fromFile, SketchFile } from '@sketch-hq/sketch-file'
import { resolve } from 'path'
import * as fs from 'fs'
import rgbHex from 'rgb-hex'

const sketchDocumentPath = '../color-library.sketch'

// Load the Sketch document and parse it into a SketchFile object
fromFile(resolve(__dirname, sketchDocumentPath)).then(
  (parsedFile: SketchFile) => {
    const document = parsedFile.contents.document

    // Exit if the document does not have any Color Variables
    if (!document.sharedSwatches) return

    // Sort color swatches by name. Uses `localCompare` to sort
    // numbers properly. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    const swatches: FileFormat.Swatch[] = document.sharedSwatches.objects.sort(
      (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })
    )

    // Iterate over the swatches, extracting the color values and storing them
    const colors = {}
    swatches.forEach(swatch => {
      colors[swatch.name] = rgbHex(
        swatch.value.red * 255,
        swatch.value.green * 255,
        swatch.value.blue * 255,
        swatch.value.alpha
      )
    })

    // Finally, store the color information in a `colors.json` file:
    fs.writeFile('colors.json', JSON.stringify(colors, null, 2), err => {
      if (err) throw err
      console.log(
        '✅ Color extraction complete: ',
        Object.keys(colors).length + ' colors saved.'
      )
    })
  }
)
