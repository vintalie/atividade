const Emergency = require('../../models').Emergency
const User = require('../../models').User

module.exports = {

    get: async function(req,res){

        let data
        let user = User.findOne({where:{id:req.session.id}})

        if(req.session.tipo == 'clinica'){
            if(req.params.id){
                data = await Emergency.findOne({where:{id:req.params.id,localizacao:user}}) 
            }else{
                data = await Emergency.findAll()
            }

            return res.render('dashboard', {
                session:req.session, 
                data:{
                    page:'emergencia', 
                    search:data
                }
            })
        }
    },
    post: function(req,res){
        
    },
    put: function(req,res){
        
    },
    delete: function(req,res){
        
    }
}