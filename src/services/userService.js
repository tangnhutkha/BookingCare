import db from "../models/index"
import bcrypt from 'bcrypt'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExit = await checkUserEmail(email)
            if (isExit) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: [`email`, `password`],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'ok'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = "Wrong password"
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User's isn't not found`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your's email not exist in your system`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                attributes: [`id`, `firstName`, `lastName`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin
}
