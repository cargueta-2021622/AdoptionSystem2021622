'use strict'

import Animal from './animal.model.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const registanimal = async(req, res)=>{
    try{
        //Capturar la información de la mascota
        let data = req.body;
        //Crear la instancia del modelo (schema)
        let animal = new Animal(data)
        //Guardar la información en la BD
        await animal.save()
        //Responder a la mascota guardada
        return res.send({message: `Registered successfully ${animal.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err})
    }
}

export const deleteanimal = async(req, res)=>{
    try{
        //Obtener el Id
        let { id } = req.params
        //Validar si está logeado y es el mismo X No lo vemos hoy X
        //Eliminar (deleteOne / findOneAndDelete)
        let deletedAnimal = await Animal.findOneAndDelete({_id: id}) 
        //Verificar que se eliminó
        if(!deletedAnimal) return res.status(404).send({message: 'Animal not found and not deleted'})
        //Responder
        return res.send({message: `Animal: ${deletedAnimal.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting animal'})        
    }
}

export const updateanimal = async(req, res)=>{ 
    try{
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si data trae datos
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Actualizamos en la BD
        let updatedAnimal = await Animal.findOneAndUpdate(
            {_id: id}, //ObjectsId <- hexadecimales (Hora sys, Version Mongo, Llave privada...)
            data, //Los datos que se van a actualizar
            {new: true} //Objeto de la BD ya actualizado
        )
        //Validar la actualización
        if(!updatedAnimal) return res.status(401).send({message: 'Animal not found and not updated'})
        //Respondo al usuario
        return res.send({message: 'Updated animal', updatedAnimal})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Animal ${err.keyValue.name} is alredy taken`})
        return res.status(500).send({message: 'Error updating animal'})
    }
}

export const listaranimals = async(req,res)=>{
    try{
        let listar = {
            name: Animal.name,
            owner: Animal.owner,
            breed: Animal.breed,
            age: Animal.age,
            keeper: Animal.keeper
        }
        return res.send({message: 'This is your pet info'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to whatch the info'}) 
    }
        
}
