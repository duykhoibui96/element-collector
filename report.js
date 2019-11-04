const fs = require('fs')
const groupBy = require('lodash/groupBy')
const maxBy = require('lodash/maxBy')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const attributes = ['resourceId', 'text', 'xpath']

const apps = [
    'Pinterest'
]

function main(){
    apps.forEach((app) => {
        const devices = fs.readdirSync(`./${app}/devices`)

        attributes.forEach((attribute) => {
            const csvWriter = createCsvWriter({
                path: `./${app}/${attribute}-report.csv`,
                header: [
                  {id: 'element', title: 'Element'},
                  ...devices.map((device) => ({id: device.normalize(), title: device})),
                  {id: 'matchingRate', title: 'Matching Rate (%)'}
                ]
            });
            const primeDevice = devices.splice(0, 1)[0]
            const primeElements = fs.readdirSync(`./${app}/devices/${primeDevice}`)
            
            const result = primeElements.map((primeElementName) => {
                const primeElement = JSON.parse(fs.readFileSync(`./${app}/devices/${primeDevice}/${primeElementName}`))
                const elements = {
                    [primeDevice.normalize()]: primeElement[attribute]
                }
                devices
                  .filter((device) => fs.existsSync(`./${app}/devices/${device}/${primeElementName}`))
                  .map((device) => {
                    elements[device.normalize()] = JSON.parse(fs.readFileSync(`./${app}/devices/${device}/${primeElementName}`))[attribute]
                  })
    
                const statistic = groupBy(Object.keys(elements).map((deviceKey) => ({deviceKey, xpath: elements[deviceKey]})), (element) => element[attribute])
                //
                // statistic = {
                //   'xpath1': [...],
                //   'xpath2': [...]
                // }
                //
                const maxAttributeMatchCount = statistic[maxBy(Object.keys(statistic), (statisticKey) => statistic[statisticKey].length)].length
    
                return {
                    element: primeElementName,
                    ...elements,
                    matchingRate: Math.ceil((maxAttributeMatchCount / Object.keys(elements).length) * 100, 2)
                }
            })
    
            result.push(
                {
                    matchingRate: result.reduce((total, row) => total + row.matchingRate, 0) / (result.length)
                }
            )
            csvWriter.writeRecords(result)
        })
    })
}

main()
