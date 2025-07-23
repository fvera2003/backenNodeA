const asyncHandler = require('express-async-handler')
const Tarea = require("../models/tareasModels")

const getTareas =asyncHandler(  async (req,res) =>{

    const tareas = await Tarea.find()

    
    res.status(200).json(tareas)
})

const createTareas = asyncHandler( async (req,res) =>{

    if(!req.body.descripcion){
        res.status(400)
        throw new Error(" no trae valor la descripcion")
    }
    const tarea = await Tarea.create({
        descripcion: req.body.descripcion
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler( async (req,res) =>{

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Esa tarea no existe')

    }
    const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id,req.body,{new: true})


    res.status(200).json(tareaModificada)
})

const deleteTareas = asyncHandler( async (req,res) =>{

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Esa tarea no existe')

    }

    await Tarea.deleteOne(tarea)

    //const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id,req.body,{new: true})

    res.status(201).json({ id: req.params.id })
})


module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}