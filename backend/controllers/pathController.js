const Path = require('../models/Path');
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken');

const pathController = require("express").Router();

//get all
pathController.get('/', async (req, res) => {
    try{
        const type = req.query.type
        let paths

        if(type){
            paths = await Path.find({type: type}).limit(15)
        }else{
            paths = await Path.find({}).limit(15)
        }

        return res.status(200).json(paths)
    }catch(err){
        console.error(err.message)
    }
})

pathController.get('/search', async (req, res) => {
    try{

        const { type, place } = req.query;
        let query = {};

        if (type) {
            query.type = type;
        }
        if (place) {
            query.place = place;
        }

        const paths = await Path.find(query).limit(15);

        return res.status(200).json(paths)
    }catch(err){
        console.error(err.message)
    }
})

pathController.get('/find/types', async (req, res) => {
    try{
        const mountain = await Path.find({ type: 'mountain' }).countDocuments()
        const forest = await Path.find({ type: 'forest' }).countDocuments()
        const sea = await Path.find({ type: 'sea' }).countDocuments()
        const cruise = await Path.find({ type: 'cruise' }).countDocuments()

        return res.status(200).json({mountain, forest, sea, cruise})
    }catch(err){
        console.error(err.message)
    }
})

//get one
pathController.get('/find/:id', verifyToken, async (req, res) => {
    try{
        const id = req.params.id
        const path = await Path.findById(id)
        return res.status(200).json(path)
    }catch(err){
        console.error(err.message)
    }
})

//create
pathController.post('/', verifyTokenAdmin, async (req, res) => {
    try{
        const createdPath = await Path.create(req.body)

        return res.status(200).json(createdPath)
    }catch(err){
        console.error(err.message)
    }
})

//update
pathController.put('/:id', verifyTokenAdmin, async (req, res) => {
    try{
        const updatedPath = await Path.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        return res.status(200).json(updatedPath)
    }catch(err){
        console.error(err.message)
    }
})

//delete
pathController.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try{
        await Path.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: 'Путь удален'})
    }catch(err){
        console.error(err.message)
    }
})

//book
pathController.put('/book/:id', verifyToken, async (req, res) => {
    try{
        const { unavailableDates } = req.body
        const path = await Path.findByIdAndUpdate(req.params.id)

        path.unavailableDates = path.unavailableDates.concat(unavailableDates)
        await path.save()

        return res.status(200).json(path)
    }catch(err){
        console.error(err.message)
    }
})


module.exports = pathController