
const Pet = require('../../models').Pet
const User = require('../../models').User
const Client = require('../../models').Client
const Clinic = require('../../models').Clinic

module.exports = {
    get: async function(req,res){
        const user = await User.findOne({where:{id:req.session.id_user}})
        let err = false
        let aviso = "Ocorreu um problema na busca:<br>"
        let client
        let pets
        if(req.session.tipo == 'clinica'){
        
        }
        if(req.session.tipo == 'cliente'){
            if(req.params.id){
                if(!Number(req.params.id)){
                    err = true
                    aviso += "Id invalido"
                }
                pets = Pet.findOne({
                    where:{
                        id:req.params.id,
                    }}
                )
                if(!pet){
                    err = false
                    aviso += "Pet não encontrado"
                }
            }
            if(!req.params.id){
                client = await Client.findOne({
                    where:{
                        id_usuario:user.id
                    }
                })
                pets = await Pet.findAll({
                    where:{
                        id_cliente:client.id
                    }
                })
                if(!pets || pets.length == 0){
                    err = false
                    aviso += "Você não cadastrou nenhum pet ainda<br>"
                }
            }
        }
        if(err){
            res.render('dashboard', {
                session:req.session,
                aviso:aviso,
                data:{
                    pets:pets,
                    cliente:client,
                    page:'pets',

            }})
        }else{
            res.render('dashboard', {
                session:req.session,
                data:{
                    pets:pets,
                    cliente:client,
                    page:'pets',
   
            }})
        }
    },
    post: async function(req,res){
        const user = await User.findOne({where:{id:req.session.id_user}})
        const client = await Client.findOne({where:{id_usuario:user.id}})
        pets = await Pet.findOne({where:{id_cliente:client.id}})
        let err = false
        let aviso = "Houve um problema ao adicionar o pet: <br>"
        if(req.body.titulo == "" ){
            err = true
            aviso += "O titulo não pode estar vazio"
        }
        if(new Date(req.body.dt_nascimento) == 'Invalid Date'){
            err = true
            aviso += "A data de nascimento é invalida."
        }
        if(err){
            res.render('dashboard', {
                session:req.session,
                aviso:aviso,
                data:{
                    pets:pets,
                    cliente:client,
                    page:'pets',

            }})
        }else{
            pets = await client.createPet(req.body)
            if(pets == undefined){
                err = true
                aviso += "Houve um erro ao criar a Pets. Confira:" + JSON.stringify(pets)   
            }
            res.render('dashboard', {
                session:req.session,
                data:{
                    pets:[pets],
                    cliente:client,
                    page:'pets',
   
            }})
        }
    }
}