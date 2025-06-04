const User = require('../../models').User
const State = require('../../models').State
const Address = require('../../models').Address
const City = require('../../models').City

module.exports = {
    get: async function (req, res) {
        const states = await State.findAll()
        return res.render('criar-conta', { data: { estados: states } })
    },
    post: async function (req, res) {
        req.body.celular = req.body.cp_celular + ' ' + req.body.celular

        let err = false
        let aviso = "Alguns erros foram encontrados: <br>"
        if (req.body.email == "") {
            err = true
            aviso += "O campo de Email é obrigatorio<br>"
        }
        if (req.body.email != "" && await User.findOne({ where: { email: req.body.email } })) {
            err = true
            aviso += "O usuario já existe na base de dados "
            aviso += "<a href='/entrar'>Faça Login!</a><br>"
        }
        if (req.body.senha == "") {
            err = true
            aviso += "O campo de Senha é obrigatorio<br>"
        }
        if (req.body.nm_endereco == "") {
            err = true
            aviso += "O campo de Endereco é obrigatorio<br>"
        }
        if (req.body.cidade == "") {
            err = true
            aviso += "O campo de Cidade é obrigatorio<br>"
        }
        if (req.body.estado == "") {
            err = true
            aviso += "O campo de Estado é obrigatorio<br>"
        }

        if (err) {
            const states = await State.findAll()
            return res.render('criar-conta', { data: { estados: states }, aviso: aviso })
        } else {

            const userCreated = await User.create(req.body)
            const [cityCreated] = await City.findOrCreate({ where: { nm_cidade: req.body.cidade, id_estado: req.body.estado } })
            const [addressCreated] =  await Address.findOrCreate({ where: { nm_endereco: req.body.nm_endereco, id_cidade: cityCreated.id } })

            if (req.body.tipo == 'clinica') {
                const clinicCreated = await userCreated.createClinica({
                    nome: req.body.nome,
                    endereco: addressCreated.id,
                    cpf: req.body.cpf,
                    cep: req.body.cep,

                })
                // const cityCreated = await addressCreated.createCity({nm_cidade:req.body.cidade, id_estado: req.body.estado})


            }
                if (req.body.tipo == 'cliente') {
                    const clientCreated = await userCreated.createCliente({
                        nome: req.body.nome,
                        endereco: addressCreated.id,
                        cpf: req.body.cpf,
                        cep: req.body.cep,

                    })
                    // const cityCreated = await addressCreated.createCity({nm_cidade:req.body.cidade, id_estado: req.body.estado})


                }
            req.session.id_user = userCreated.id
            req.session.email = userCreated.email
            req.session.tipo = userCreated.tipo

            return res.redirect("dashboard")
        }
    }
}
