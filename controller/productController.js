import multer from "multer";

import { Product } from "../models";

import path from 'path'

import fs from 'fs'

import Joi from 'joi'

const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, "uploads/"),
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    });
    const multiPartdata = multer({storage, limits: { fileSize: 1000000 * 5 } }).single('image')

const productController = {
    async store(req, res, next) {
        multiPartdata(req, res,  async(err) => {
            if(err){
                return next(err.message)
            }
            const filepath = req.file.path
            //validation
            const productSchema = Joi.object({            
            name : Joi.string().required(),
            price : Joi.string().required(),
            size :  Joi.string().required(),
        })
        const { error } = productSchema.validate(req.body)
        if(error){
            fs.unlink(`${appRoot}/${filepath}`, (err) => {
                if(err){
                    return next(err)
                }
            })
            return next(err)
        }
        const { name, price, size } = req.body
        let document
        try {
            document = await Product.create({
                name,
                price,
                size,
                image : filepath
            })
        } catch (error) {
            return next(error)
        }
        res.json({document})
        })
  }
};
export default productController;
