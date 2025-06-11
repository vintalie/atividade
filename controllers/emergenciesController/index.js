const { Socket } = require('socket.io')

const State = require('../../models').State
const Emergency = require('../../models').Emergency
const City = require('../../models').City
const User = require('../../models').User
const Pet = require('../../models').Pet
const Client = require('../../models').Client
const Clinic = require('../../models').Clinic
const Address = require('../../models').Address

module.exports = {
    get: async function(req,res){
        let err = false
        let aviso = "Ocorreu um problema na busca:<br>"
        let emergency
        let pets
        let states
        let client
        let clinic
        const user = await User.findOne({where:{id:req.session.id_user}})
        
        if(req.session.tipo == 'clinica'){
            clinic = await Clinic.findOne({
                    where:{
                        id_usuario:user.id
                    }
                }
            )
            if(req.params.id){
                if(!Number(req.params.id)){
                    err = true
                    aviso += "Id invalido"
                }
                emergency = await Emergency.findOne({
                    where:{
                        id:req.params.id,
                    },include:{
                        model:Pet
                    }}
                )
                if(!emergency || emergency.length == 0){
                    err = true
                    aviso += "Emergencia não encontrado"
                }
            }
            if(!req.params.id){
                emergency = await Emergency.findAll({
                    where:{
                        id_clinica:clinic.id
                    },include:{
                        model:Pet
                    }
                })
                if(emergency.length == 0){
                    emergency = await Emergency.findAll({
                        include:{
                            model:Address,
                            include:{
                                model:City,
                                include:{
                                    model: State,
                                    where: clinic.endereco
                                }
                            }
                        }
                    })
                    if(emergency.length == 0){
                        err = true
                        aviso += "Não existem emergencias na sua região<br>"
                    }
                }
            }
        }
        if(req.session.tipo == 'cliente'){
        client = await Client.findOne({
                where:{
                    id_usuario:req.session.id_user
                }
            }
        )
            states = await State.findAll()
            
            if(req.params.id){
                pets = await Pet.findAll({
                    where:{
                        id_cliente: client.id
                    }
                })
                emergency = await Emergency.findOne({
                    where:{id:req.params.id},
                    include:{model:Pet,
                    where:{
                        id_cliente: client.id
                    }
                }})
                if(emergency.length == 0 ){
                    err = true
                    aviso += "Nenhuma emergencia encontrada para o seu pet"
                }
            }
            if(!req.params.id){
                pets = await Pet.findAll({
                    where:{
                        id_cliente: client.id
                    }
                })
                emergency = await Emergency.findAll({
                    include:{model:Pet,
                    where:{
                        id_cliente: client.id
                    }
                }})

                if(emergency.length == 0){
                    err = true
                    aviso += "Você ainda não gerou nenhuma emergencia."
                }
            }
        }
        if(err){
            res.render('dashboard', {
                session:req.session,
                aviso:aviso,
                data:{
                    emergencia:emergency,
                    pets:pets,
                    estados:states,
                    clinica: clinic,
                    cliente:client,
                    page:'emergencia',

            }})
        }else{
            res.render('dashboard', {
                session:req.session,
                data:{
                    emergencia:emergency,
                    pets:pets,
                    estados:states,
                    clinica: clinic,
                    cliente:client,
                    page:'emergencia',

            }})
        }
    },
    post: async function(req,res){
        let emergency
        let states
        let pets
        let client
        let err = false
        let aviso
        if(req.session.tipo == "clinica"){
            res.redirect('/dashboard/emergencias')
        }
        if(req.session.tipo == "cliente"){
            emergency = await Emergency.create(req.body)
            states = await State.findAll()
            client = await Client.findOne({
                    where:{
                        id_usuario:req.session.id_user
                    }
                }
            )
            pets = await Pet.findAll({
                    where:{
                        id_cliente: client.id
                    }
                })
            if(emergency == undefined){
                err = true
                aviso += "Houve um erro ao criar a emergencia. Confira:" + JSON.stringify(emergencia)    
            }else{
                Socket.EventEmitter('create-emergency')
            }
        }
        if(err){
            res.render('dashboard', {
                session:req.session,
                aviso:aviso,
                data:{
                    emergencia:emergency,
                    pets:pets,
                    estados:states,
                    cliente:client,
                    page:'emergencia',
                }
            })
        }else{
            res.render('dashboard', {
                session:req.session,
                aviso: 'Emergência enviada à clínica com sucesso!',
                data:{
                    emergencia:emergency,
                    pets:pets,
                    estados:states,
                    cliente:client,
                    page:'emergencia',
                }
            })
        }

    },
    put: function(){

    },
    delete:function (){

    },
    excluir: async function(req, res) {
        const { id } = req.body;
        console.log('Chamou excluir emergência:', req.body);
        await Emergency.destroy({ where: { id } });
        res.redirect('/dashboard/emergencias');
    },
    excluirGet: async function(req, res) {
        const { id } = req.params;
        await Emergency.destroy({ where: { id } });
        res.redirect('/dashboard/emergencias');
    }
}