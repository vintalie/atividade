const User = require('../../models').User
const Clinic = require('../../models').Clinic
const Client = require('../../models').Client

module.exports = {
    get: function(req, res) {
        return res.render('criar-conta')
    },
    post: async function(req, res) {
        req.body.celular = req.body.cp_celular +' '+ req.body.celular
        
        let err = false
        let aviso = "Alguns erros foram encontrados: <br>"
        if(req.body.email == ""){
            err = true
            aviso += "O campo de Email é obrigatorio<br>"
        }
        if(req.body.email != "" && await User.findOne({where:{email:req.body.email}})){
            err = true
            aviso += "O usuario já existe na base de dados "
            aviso += "<a href='/entrar'>Faça Login!</a><br>"
        }
        if(req.body.senha == ""){
            err = true
            aviso += "O campo de Senha é obrigatorio<br>"
        }
         if(req.body.celular == ""){
            err = true
            aviso += "O campo de celular é obrigatorio<br>"
        }
        
        if(err){
            return res.render('criar-conta', {aviso})
        }else{
            const userCreated = await User.create(req.body)

            if(req.body.tipo == 'clinica'){
                await userCreated.createClinica(req.body)
            }
            if(req.body.tipo == 'cliente'){
                await userCreated.createCliente(req.body)
            }
            req.session.email= userCreated.email
            req.session.tipo = req.body.tipo
            
            return res.redirect("dashboard")
        }
       }
    }