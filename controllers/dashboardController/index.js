const User = require('../../models').User
const Emergency = require('../../models').Emergency

module.exports = {
    get: async function(req, res) {
        let user = await User.findOne({where:{email:req.session.email}})
        let userData = user.dataValues
        if(userData.tipo == 'clinica'){
            userData.clinica = await user.getClinica() || {};
        }
        if(userData.tipo == 'cliente'){
            userData.cliente = await user.getCliente() || {};
        }
        
        return res.render('dashboard', {session: req.session, data: {...userData, page:'dashboard'}})
    }
}