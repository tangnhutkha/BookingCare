import bcrypt from 'bcrypt'
import db from '../models/index'



const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

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
            resolve('Create new user succeed ')
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

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: [`id`, `firstName`, `lastName`, `password`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                raw: true
            })
            resolve(users)
        } catch (err) {
            reject(err)
        }
    })
}


let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne(
                {
                    attributes: [`id`, `firstName`, `lastName`, `password`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                    where: { id: userId },
                    raw: true
                })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e)
        }
    })
}

let putUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                attributes: [`id`, `firstName`, `lastName`, `password`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email,
                    user.firstName = data.firstName,
                    user.lastName = data.lastName,
                    user.address = data.address,
                    user.phoneNubmer = data.phoneNumber,
                    user.gender = data.gender,
                    user.roleId = data.roleId

                await user.save()
                let allUser = await db.User.findAll({
                    attributes: [`id`, `firstName`, `lastName`, `password`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                    raw: true
                })
                resolve(allUser)
            } else {
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                attributes: [`id`, `firstName`, `lastName`, `password`, `email`, `address`, `phoneNumber`, `gender`, `image`, `roleId`, `createdAt`, `updatedAt`],
                where: { id: userId },
            })
            if (user) {
                await user.destroy()
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    putUser,
    deleteUserById
}
