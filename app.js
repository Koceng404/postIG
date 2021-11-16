const { IgApiClient } = require('instagram-private-api')
require('dotenv').config()
const { readFile }= require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)


const { username, password } = process.env
const ig = new IgApiClient()

const postimage = async() => {
    try { 
        ig.state.generateDevice(username)
        await ig.simulate.preLoginFlow()
        const user = await ig.account.login(username, password)

        // Test Upload
        const path = './a.jpeg'
        const published = await ig.publish.photo({
            file: await readFileAsync(path),
            caption: 'bis bis'
        })
        console.log(published)
    } catch (error) {
        console.log(error)
    }
}

postimage()