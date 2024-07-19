const express = require ("express")
const router= express.Router()
router.use(express.json()); 


const { solucion , traerJarras , actualizarValores , borrarValores } = require ("../controller/jarrasControllers.js")

router.get ("/",traerJarras) 
router.post("/", solucion) 
router.put("/", actualizarValores) 
router.delete ("/",borrarValores) 


module.exports= router