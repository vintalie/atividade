module.exports = {
    get: function(req, res) {
        return res.render('index')
    },
    post: function(req, res) {
        return res.send('Rota POST')
    }
}