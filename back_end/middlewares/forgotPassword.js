const User = require('../models/userModel')
require('colors')

const passwordAuth = async (req, res, next) => {
    const {password} = req.body

    const validation = [password]

    const validationMessage = {
        success: false
    }

    const fields = ["password"]
    const regex = /^\s*$/

    if (!password)
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
        const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/
        // password validation
        if (regex.test(validation[0]))
        {
            validationMessage[fields[0]] = `${fields[0].charAt(0).toUpperCase() + fields[0].slice(1)} is required.`
        }
        else if (validation[0]?.length < 8)
        {
            validationMessage[fields[0]] = `${fields[0].charAt(0).toUpperCase() + fields[0].slice(1)} must contains at least 8 characters.`
        }
        else if (!password_pattern.test(validation[0]) && validation[0]?.length > 0)
        {
            validationMessage[fields[0]] = `Must include: a-z, A-Z, 0-9, & a symbol.`
        }
    }


    if (!validationMessage.password)
    {
        console.log("Middleware passed!".bgMagenta.white)
        next()
    } else
    {
        console.log(validationMessage)
        return res.status(200).send(validationMessage)
    }

}

module.exports = passwordAuth