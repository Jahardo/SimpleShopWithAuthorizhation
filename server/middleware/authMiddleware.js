const jwt = require('jsonwebtoken')
module.exports = function (req,res,next){
    if(req.method==='OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1]// Bearer asdasda
        if(!token){
            res.status(401).json({message:'User dont auth'})
        }
        const decoded = jwt.verify(token,process.env.SecretKey)
        req.user = decoded
        next()
    }catch (e){
        res.status(401).json({message:'User dont auth'})

    }}