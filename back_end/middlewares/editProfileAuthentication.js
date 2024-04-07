const User = require('../models/userModel')
require('colors')

const editProfileAuthentication = async (req, res, next) => {
    try
    {
       
        const form = req.body.jsonData

        const data = JSON.parse(form)
        const {name, username} = data

        const validation = [name, username]
        const user = await User.findOne({username: username})

        const validationMessage = {
            success: false
        }

        const fields = ["name", "username"]

        const regex = /^\s*$/

        for (let i in validation)
        {
            if (!validation[i] && !validationMessage[fields[i]] && !validation[1].match(/.go/))
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
            if (regex.test(validation[1]) && !validation[1].match(/.go/))
            {
                validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} is required.`

            } else if (!/^[a-zA-Z0-9_]+$/.test(validation[1]) && !validation[1].match(/.go/))
            {
                validationMessage[fields[1]] = `A-Z, a-z, 0-9, and _ are allowed characters.`
            }
            else if (validation[1]?.length < 6 && !validation[1].match(/.go/))
            {
                validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} requires minimum 6 characters.`
            } else if (validation[1]?.length > 14 && !validation[1].match(/.go/))
            {
                validationMessage[fields[1]] = `The ${fields[1]} should be between 6 and 15 characters long.`
            } else if (user)
            {
                validationMessage[fields[1]] = `${fields[1].charAt(0).toUpperCase() + fields[1].slice(1)} has already been taken.`
            }
        }


        if (!validationMessage.name && !validationMessage.username)
        {
            console.log("Middleware passed!".bgMagenta.white)
            next()
        } else
        {
            console.log(validationMessage)
            return res.status(200).send(validationMessage)
        }

    } catch (error)
    {
        console.log(`-->${error}`.bgRed.white, error)
        return res.status(500).send({
            success: false,
            message: "Profile didn't updated.",
            error
        })
    }
}

module.exports = editProfileAuthentication