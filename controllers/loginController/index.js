
module.exports = {
    get: function(req, res) {
        return res.render('login')
    },
    post: function(req, res) {
        return res.send('Rota POST')
    }
}