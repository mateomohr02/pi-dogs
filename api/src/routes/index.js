const { Router } = require('express');
const {Dog, Temperament} = require("../db.js")
const axios = require('axios');
const { where } = require('sequelize');
const {key} = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const buscarDatos = async () => {
    try {
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${key}`);

        const dogsDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    });

    const allDogs = [...dogsApi.data, ...dogsDB]


      
    return allDogs;

        
    } catch (error) {

        throw new Error('Error al obtener los datos combinados')
    
    }
}


//RUTA BUSQUEDA NOMBRE CON QUERY
router.get('/dogs/name?', async (req, res) => {
    try {
        const {name} = req.query
        const allBreeds = await buscarDatos();        
        const dog = allBreeds?.find(d => d.name.toLowerCase() === name.toLowerCase())
        
        if (dog){
            res.status(200).json(dog)
        }else{
            res.status(404).json({ message: "No se encontró la raza especificada" })
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//RUTA BUSQUEDA ID
router.get('/dogs/:idRaza', async (req, res) => {
    try{
        const { idRaza } = req.params
        const allBreeds = await buscarDatos();
        const dog = allBreeds.filter(d => d.id == idRaza )
        if (dog){
            res.status(200).json(dog)
        }
    }catch(error){
        res.status(400).json({error:error.message})
    }
}) 


// RUTA GET ALL DOGS
router.get('/dogs', async (req,res) => {
    try {
        const Breeds = await buscarDatos()
        
        res.status(200).json(Breeds)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//RUTA TEMPERAMENTOS
router.get('/temperaments', async (req, res) => {    
    try{
        const allTemperaments = await buscarDatos();
        const allTemps = allTemperaments?.map(d => d.temperament)
        const filteredTemps = allTemps?.toString().split(',');
        filteredTemps?.forEach(t => {
            let temp = t.trim()
            Temperament.findOrCreate({
                where: {name: temp}
            })
        });

        const temperaments = await Temperament.findAll();
        res.status(200).json(temperaments)
        
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
});

// CREAR NUEVO PERRO
router.post('/dogs', async (req, res) => {
    const {
      name,
      height,
      weight,
      image,
      lifeLength,
      temperaments
    } = req.body;
  
    try {
      const dog = await Dog.create({
        name,
        height,
        weight,
        image,
        lifeLength
      });
  
      const temperamentsArray = temperaments.split(',').map(item => item.trim());
  
      const associateTemperaments = await Temperament.findAll({
        where: { name: temperamentsArray }
      });
  
      await dog.addTemperaments(associateTemperaments);
      res.status(200).json(`El perro ${dog.name} se creó correctamente.`);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
module.exports = router;
