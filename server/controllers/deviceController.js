const {Type} = require("../models/models");
const uuid = require('uuid')
const path = require('path')
const {Device,DeviceInfo} = require('../models/models')
const ApiError = require("../error/ApiError");

class DeviceController {
    async create(req,res,next){
        try {
            let {name,price,brandId,typeId,info}=req.body
            const {img} = req.files
            let fileName = uuid.v4()+'.jpg';
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const device = await Device.create({name,price,brandId,typeId,img:fileName})
            if(info){
                info = JSON.parse(info)
                info.forEach(i =>{
                    DeviceInfo.create({title: i.title,
                        description: i.description,
                        deviceId:device.id
                    })
                })
            }
            return res.json(device)
        }catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }
    async getAll(req,res){
        let {typeId,brandId,limit,page} = req.query
        let devices;
        page = Number(page) || 1
        limit = Number(limit) || 30
        let offset = page*limit - limit;
        if (!typeId && !brandId){
            devices = await Device.findAndCountAll({limit,offset})
            return res.json(devices)
        }
        if (!typeId && brandId){
             devices = await Device.findAndCountAll({where:{brandId},limit,offset})
            return res.json(devices)
        }
        if (typeId && !brandId){
             devices = await Device.findAndCountAll({where:{typeId},limit,offset})
            return res.json(devices)
        }
        if (typeId && brandId){
             devices = await Device.findAndCountAll({where:{
                 typeId:typeId,
                 brandId:brandId}
             ,limit,offset})
            return res.json(devices)
        }

    }
    async getOne(req,res){
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include : [{model:DeviceInfo,as:'info'}],
        })
        return res.json(device)
    }

}

module.exports = new DeviceController()