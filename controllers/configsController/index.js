const User = require('../../models').User;

module.exports = {
    get: async function(req, res) {
        let usuario = {};
        if (req.session.id_user) {
            const userInstance = await User.findOne({ where: { id: req.session.id_user } });
            usuario = userInstance ? userInstance.get({ plain: true }) : {};
        }
        res.render('parts/dashboards/configs', { 
            data: { usuario }
        });
    },
    alterar: async function(req, res) {
        const { nome, email } = req.body;
        if (req.session.id_user) {
            await User.update({ nome, email }, { where: { id: req.session.id_user } });
        }
        res.redirect('/dashboard/configs');
    },
    excluir: async function(req, res) {
        console.log('Chamou excluir:', req.session.id_user);
        if (req.session.id_user) {
            await User.destroy({ where: { id: req.session.id_user } });
            req.session.destroy(function() {
                res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    }
    
}