import userService from '../services/userService'


let handleLogin = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missinng Params"
        })
    }
    let userData = await userService.handleUserLogin(username, password)
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMesssage: 'Missing required params',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMesssage: 'OK',
        users
    })
    // return res.send('get all users')
}

let handleCreateUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required params"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUser(data)
    return res.status(200).json(message)
}
let handleGetAllCodes = async (req, res) => {
    try {
        let type = req.query.type
        let data = await userService.getAllCodes(type)
        return res.status(200).json({
            errCode: 0,
            errMesssage: 'OK',
            data
        })
    } catch (e) {
        console.log('get all codes: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error server"
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleGetAllCodes,
}
