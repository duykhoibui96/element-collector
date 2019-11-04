const fs = require('fs')
const wd = require('wd')
const BPromise = require('bluebird')
const parseXmlDom = require('./utils')

const testBundle = [
    "Pinterest"
]

const auth = {
    protocol: "https",
    host: "api.kobiton.com",
    auth: "kobiton-org-demo:b6fca361-2341-4ec1-b134-27f414429791"
}

const defaultDesiredCaps = {
    platformName: 'Android'
}

async function save(elementName, {key = 'resourceId', value = ''} = {}) {
    console.log(`${this.ns}-processing-element: ` + elementName)
    const source = await this.driver.source()
    const xmlNodes = parseXmlDom(source)
    const elementData = xmlNodes.find((node) => node[key] === value)

    if (!elementData) {
        console.log(`${this.ns}-processing-element: `, `No element found with condition: ` + JSON.stringify({key, value}))
        return
    }

    const path = `./${this.appName}/${this.deviceName}/${elementName}.json`
    const json = JSON.stringify(elementData)
    fs.writeFileSync(path, json, 'utf8');
}

(async function main() {
    await BPromise.mapSeries(testBundle, async (appName) => {
        const config = require(`./${appName}/config.json`)
        const script = require(`./${appName}/script`)

        const desiredCaps = {
            ...defaultDesiredCaps,
            app: config.app,
            sessionName: `${appName} testing`
        }

        const result = {}

        await BPromise.mapSeries(config.devices, async (device) => {
            const deviceName = device.replace(' ', '-')
            const deviceFolder = `./${appName}/${deviceName}`
            const ns = `${appName}-${device}`

            if (fs.existsSync(deviceFolder)) {
                fs.rmdirSync(deviceFolder)
            }

            fs.mkdirSync(deviceFolder)
            desiredCaps.deviceName = device

            const driver = wd.promiseChainRemote(auth)

            // driver.on('status', (info) => {
            //     console.log(`${ns}-status: `, info.cyan)
            // })

            // driver.on('command', (meth, path, data) => {
            //    console.log(`${ns}-command: `, ' > ' + meth.yellow, path.grey, data || '')
            // })

            // driver.on('http', (meth, path, data) => {
            //   console.log(`${ns}-http: `, ' > ' + meth.yellow, path.grey, data || '')
            // })

            try {
                console.log(`${ns}-init: Initializing session ...`)
                await driver.init(desiredCaps)
                await driver.setImplicitWaitTimeout(10000);
                console.log(`${ns}-init: Initialized`)
            }
            catch (error) {
                console.log(`${ns}-init: `, error)
                result[device] = false
            }


            try {
                console.log(`${ns}-script: Running script ...`)
                await script(driver, save.bind({
                    driver,
                    appName,
                    deviceName,
                    ns
                }))

                result[device] = true
            }
            catch (error) {
                console.log(`${ns}-script: `, error)
                result[device] = false
            }
            finally {
                console.log(`${ns}: Stopping session ...`)
                await driver.quit()
                console.log(`${ns}: Session stopped ...`)
            }

            const resultPath = `./${appName}/result.json`
            fs.writeFileSync(resultPath, JSON.stringify(result), 'utf8');
        })
    })
}())