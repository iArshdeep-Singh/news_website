require('colors')
const {JSDOM} = require('jsdom')
const {Readability} = require('@mozilla/readability')
const axios = require('axios')


const newsContent = async (req, res) => {
    try
    {
        const {url} = req.body

        const response = await axios.get(url)

        const htmlContent = response.data


        const dom = new JSDOM(htmlContent);


        let article = new Readability(dom.window.document).parse()


        if (!url)
        {
            console.log("Content isn't created.".bgWhite.red)
        } else
        {
            console.log("Content is created.".bgBlue.white)
        }
        return res.status(200).send(article.textContent)

    } catch (error)
    {
        console.log(`${error}`.bgRed.white)
        return res.status(500).send({message: error.message})
    }
}


module.exports = newsContent