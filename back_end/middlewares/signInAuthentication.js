const User = require('../models/userModel')
require('colors')

const signInAuthentication = async (req, res, next) => {
    const {username, password} = req.body

    const validation = [username, password]

    const validationMessage = {
        success: false
    }

    const fields = ["username", "password"]


    if (!username || !password)
    {
        for (let i in validation)
        {
            if (!validation[i])
            {
                validationMessage[fields[i]] = `${fields[i].charAt(0).toUpperCase() + fields[i].slice(1)} is required.`
            }
        }
    } else
    {
        // check user
        const user = await User.findOne({username: username})

        if (!user)
        {
            console.log("User is not registered, please create account before login.".bgBlue.white)
            return res.status(200).send({
                success: false,
                error: "User is not registered, please create account before login."
            })
        }
    }


    if (!validationMessage.username && !validationMessage.password)
    {
        console.log("Middleware passed!".bgMagenta.white)
        next()
    } else
    {
        console.log(validationMessage)
        return res.status(200).send(validationMessage)
    }

}

module.exports = signInAuthentication