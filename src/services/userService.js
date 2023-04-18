import db from "../models/index"
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10)

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExit = await checkUserEmail(email)
            if (isExit) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['roleId', 'firstName', 'lastName', `email`, `password`],
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
                attributes: {
                    exclude: [`password`, `posotionId`
                    ]
                },
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: [`password`, `posotionId`]
                    }

                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    attributes: {
                        exclude: [`password`, `posotionId`]
                    },
                    where: { id: userId }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let hasUserPasssword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let emailExist = await checkUserEmail(data.email)
            if (emailExist) {
                resolve({
                    errCode: 1,
                    errMessage: 'Email is exists'
                })
            } else {
                let hasPasswordFromBcrypt = await hasUserPasssword(data.password)
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: hasPasswordFromBcrypt,
                    email: data.email,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            attributes: {
                exclude: [`password`, `posotionId`
                ]
            },
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        console.log(user)
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            message: `The user is deleted`
        })
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing required params'
                })
            }
            let user = await db.User.findOne({
                attributes: {
                    exclude: [`password`, `posotionId`
                    ]
                },
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    await user.save()

                resolve({
                    errCode: 0,
                    message: 'Update user succeeds'
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodes = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputType) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing params input type"
                })
            } else {
                let res = {}
                res = await db.Allcode.findAll({
                    where: { type: inputType }
                })
                res.errCode = 0
                res.data
                resolve(res)
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCodes
}
