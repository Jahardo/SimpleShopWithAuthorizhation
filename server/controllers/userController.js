const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket} = require('../models/models')

const generateJwt = (id,email,role) =>{
    return  jwt.sign(
        {id,email,role},
        process.env.SecretKey,
        {expiresIn:'24h'})
}
class UserController {
    async registration(req,res,next){
        const {email,password,role} = req.body
        if(!email || !password){
           return next(ApiError.BadRequest('email or password is empty'))
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.BadRequest(`User with ${email} already exist` ))
        }
        const hashPassword = await bcrypt.hash(password,4)
        const user = await User.create({email,password:hashPassword,role})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})

    }
    async login(req,res,next){
        const {email,password,role} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.Internal('user not found'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if(!comparePassword){
            return next(ApiError.Internal('password or email wrong'))
        }
        const token = generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()