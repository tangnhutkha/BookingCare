import userService from '../services/codeService'



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
    handleGetAllCodes
}
