const { geoFromSVGFile, geoFromSVGXML } = require('svg2geojson')
const fs = require('fs')
let file = fs.createWriteStream('./src/output.json')

geoFromSVGFile('./src/strangereal.svg', (layers) => {
    layers.forEach( layer => {
        let json = JSON.stringify(layer.geo)
        file.write(json)
    });
}, { layers: true, tolerance: 0.5 } )

file.close()