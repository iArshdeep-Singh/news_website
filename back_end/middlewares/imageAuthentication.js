require('colors')

const imageAuthentication = async (req, res, next) => {
    try
    {
        const image = req.file

        if (image)
        {
            console.log("Middleware Passed!".bgMagenta.white)
            next()
        }
        else
        {
            res.status(500).send({
                success: false,
                message: "No file uploaded.",
            })
        }

    } catch (error)
    {
        console.log(`${error}`.bgRed.white)
        return res.status(200).send(error)
    }
}

module.exports = imageAuthentication