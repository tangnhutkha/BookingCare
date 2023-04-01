import db from '../models/index'

let homePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log('````````````````````````')
        console.log(data)
        return res.render('home.ejs', {
            dataUsers: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    homePage
}