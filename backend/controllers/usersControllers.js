const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel.js')

const crearUser = asyncHandler(  async(req,res) =>{

    //destructuramos el body

    const {nombre,email,password} = req.body

    if(!nombre || !email || !password){

        res.status(400)
        throw new Error('FAltan datos')
    }
    const userExiste = await User.findOne({email})

    if(userExiste){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)

    //crear al usuario

    const user = await User.create({
        nombre,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            password: password

            })
        } else {
            res.status(400)
            throw new Error('No se puso guardar los datos')
        }

})

const loginUser =asyncHandler( async (req,res) => {
    const {email,password} = req.body
 
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error("Credenciales incorrectas")
    }
    
})

//const generarToket =asyncHandler( async (id_usuario) =>{
//    return await jwt.sign({id_usuario}, process.env.JWT_SECRET,{
//        expiresIn: '30d'
//    })
//})

//Funcion para generar el token
const generarToken = (id_usuario) => {
    return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const datosUser = asyncHandler(async (req,res)=>{

})

module.exports = {
    crearUser, loginUser,datosUser
}