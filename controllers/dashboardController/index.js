
module.exports = {
    get: function(req, res) {
        return res.render('dashboard')
    },
    post: function(req, res) {
        return res.send('Rota POST')
    }
}