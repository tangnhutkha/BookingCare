import db from '../models/index'
import CRUDService from '../services/CRUDService'

let homePage = async (req, res) => {
    // try {
    //     let data = await db.User.findAll()
    //     console.log('````````````````````````')
    //     return res.render('home.ejs', {
    //         // dataUsers: JSON.stringify(data)
    //     })
    // } catch (e) {
    //     console.log(e)
    // }
    return res.render('home.ejs')
}

let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let messsage = await CRUDService.createNewUser(req.body)
    // console.log(messsage)
    return res.json(req.body)
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers()
    return res.render('displayCRUD.ejs', { data })
}

let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let data = await CRUDService.getUserById(userId)
        return res.render('editCRUD.ejs', { data })

    }
    else {
        return res.send('Not found user')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.putUser(data)
    return res.render('displayCRUD.ejs', { data: allUser })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    await CRUDService.deleteUserById(id)
    return res.send('Delete succeed')
}

module.exports = {
    homePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    editCRUD,
    putCRUD,
    deleteCRUD
}