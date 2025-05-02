module.exports = (req,res,next) => {
    if(req.session.email && req.session.email != ""){
        next()
    }else{
        res.redirect('/entrar')
    }
}