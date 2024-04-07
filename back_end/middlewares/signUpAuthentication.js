const User = require('../models/userModel')
require('colors')

const signUpAuthentication = async (req, res, next) => {

    const {name, username, password} = req.body

    // name, username and password verification

    const validation = [name, username, password]

    // check user
    const existingUser = await User.findOne({username: username})

    const validationMessage = {
        success: false
    }
    const fields = ["name", "username", "password"]

    const regex = /^\s*$/

    for (let i in validation)
    {
        if (!validation[i] && !validationMessage[fields[i]])
        {
            validationMessage[fields[i]] = `${fields[i].charAt(0).toUpperCase() + fields[i].slice(1)} is required.`
        }


        // name validation
        if (validation[0]?.length < 6)
        {
            validationMessage[fields[0]] = `${fields[0].charAt(0).toUpperCase() + fields[0].slice(1)} requires minimum 6 characters.`

        } else if (validation[0]?.length > 50)
        {
            validationMessage[fields[0]] = `The ${fields[0]} should be between 6 and 50 characters long.`
        }


        // username validation
        if (regex.test(validation[1]))
        {
            validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} is required.`

        } else if (!/^[a-zA-Z0-9_]+$/.test(validation[1]))
        {
            validationMessage[fields[1]] = `A-Z, a-z, 0-9, and _ are allowed characters.`
        }
        else if (validation[1]?.length < 6)
        {
            validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} requires minimum 6 characters.`
        } else if (validation[1]?.length > 14)
        {
            validationMessage[fields[1]] = `The ${fields[1]} should be between 6 and 15 characters long.`
        } else if (existingUser)
        {
            validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} has already been taken.`
        }

        const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*?&+-]{8,}$/
        // password validation
        if (regex.test(validation[2]))
        {
            validationMessage[fields[2]] = `${fields[2].charAt(0).toUpperCase() + fields[2].slice(1)} is required.`
        }
        else if (validation[2]?.length < 8)
        {
            validationMessage[fields[2]] = `${fields[2].charAt(0).toUpperCase() + fields[2].slice(1)} must contains at least 8 characters.`
        }
        else if (!password_pattern.test(validation[2]) && validation[2]?.length > 0)
        {
            validationMessage[fields[2]] = `Must include: a-z, A-Z, 0-9, & a symbol.`
        }
    }


    if (!validationMessage.name && !validationMessage.username && !validationMessage.password)
    {
        console.log("Middleware passed!".bgMagenta.white)
        next()
    } else
    {
        console.log(validationMessage)
        return res.status(200).send(validationMessage)
    }
}


module.exports = signUpAuthentication