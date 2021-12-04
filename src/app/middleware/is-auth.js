module.exports = function (req, res, next) {
    if(req.session.isAuth){
        res.locals.fullName= req.session.fullName;
        res.locals.checkState= req.session.isAuth;
        res.locals.permission= req.session.Authorization;
        res.locals.imageAvatar= req.session.imageAvatar;
        res.locals.email = req.session.email;
        res.locals.phoneNumber = req.session.phoneNumber;
        res.locals.address = req.session.address;
        // res.locals.fullName = "do van khang" ; 
    }
    next();

}