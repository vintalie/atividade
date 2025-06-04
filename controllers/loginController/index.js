const User = require("../../models").User
const Client = require("../../models").Client
const Clinic = require("../../models").Clinic


module.exports = {
    logout: function(req,res){
        delete req.session.email
        delete req.session.id_user
        delete req.session.role
        res.redirect('/')
    },
    get: function(req, res) {
        return res.render('login')
    },
    post: async function(req, res) {
        let err = false
        let aviso = ""
        if(req.body.senha == ""){
            err = true
            aviso = "Você precisa preencher a senha"
        }
        if(req.body.email == ""){
            err = true
            aviso = "Você precisa preencher o email"
        }
        let user = await User.findOne({
            where:{
                email:req.body.email
            },
        })
        if(user != undefined){
            if(user.senha == req.body.senha){                
                req.session.id_user = user.id
                req.session.email= user.email
                req.session.tipo = user.tipo

                

                res.redirect('dashboard')
            }else{
                err = true
                aviso = "A senha está incorreta"
            }    
        }else{
            err = true
            aviso = "Email não encontrado na base de dados"
        }
        if(err || user == undefined){
            res.render('login', {aviso})
        }

    }
}