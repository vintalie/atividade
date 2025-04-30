const User = require('../../models').User

module.exports = {
    get: function(req, res) {
        return res.render('criar-conta')
    },
    post: function(req, res) {
        req.body.celular = req.body.cp_celular + req.body.celular
       let err = false
        let aviso = "Alguns erros foram encontrados: <br>"
        if(req.body.email == ""){
            err = true
            aviso += "O campo de Email é obrigatorio<br>"
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
            User.create(req.body)
            req.session.email=req.body.email
            req.session.role = 'user'
            
            return res.redirect("dashboard")
        }
       }
    }