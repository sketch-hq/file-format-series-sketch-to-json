import FileFormat from '@sketch-hq/sketch-file-format-ts'
import { fromFile, SketchFile } from '@sketch-hq/sketch-file'
import { resolve } from 'path'
import * as fs from 'fs'

const sketchDocumentPath = '../color-library.sketch'

// Load the Sketch document and parse it into a SketchFile object
fromFile(resolve(__dirname, sketchDocumentPath)).then(
  (parsedFile: SketchFile) => {
    const document = parsedFile.contents.document

    // Exit if the document does not have any Color Variables
    if (!document.sharedSwatches) return

    // Sort color swatches by name. Uses `localCompare` to sort
    // numbers properly. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    const swatches = document.sharedSwatches.objects.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true })
    )

    const colors = {}

    // Iterate over the swatches, extracting the color values and storing them
    swatches.forEach((swatch: FileFormat.Swatch) => {
      const hexColor = rgbaToHex(
        swatch.value.red,
        swatch.value.green,
        swatch.value.blue,
        swatch.value.alpha
      )
      colors[swatch.name] = hexColor
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

// Utility function to convert RGBA colors, as stored in the
// Sketch file format, into Hex colors usable by Storybook.
function rgbaToHex(
  r: FileFormat.UnitInterval,
  g: FileFormat.UnitInterval,
  b: FileFormat.UnitInterval,
  a: FileFormat.UnitInterval
) {
  const red: string = Math.round(r * 255)
    .toString(16)
    .padStart(2, '0')
  const green: string = Math.round(g * 255)
    .toString(16)
    .padStart(2, '0')
  const blue: string = Math.round(b * 255)
    .toString(16)
    .padStart(2, '0')
  const alpha: string = Math.round(a * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${red}${green}${blue}${alpha == 'ff' ? '' : alpha}`
}
