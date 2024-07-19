//Funciones auxiliares 
const {
    solveWaterJug,
    validacionNumber
} = require('../service/funcionesAuxiliares.js'); // Importa la lógica de negocios desde un servicio


//Metodo para el Get
const traerJarras = async (req, res) => {
    //res.send("Te envio desde la BD todos los paquetes")
  try {
    res.json( 'Funcionalidad próximamente..' );
    } catch (error) {
        res.json({message: error.message})
   }
}

//Metodo para el Put, quien actualizaría en esta primera versión todos los valores
const actualizarValores = async (req,res)=>{
    //res.send("Te envio desde la BD todos los paquetes")
    try {
        const { x_capacity, y_capacity, z_amount_wanted } = req.body; 
        // Validamos que sea un número Entero y Positivo y que se ingresen los 3 valores
        const error = validacionNumber(x_capacity, y_capacity, z_amount_wanted);
        if (error) {
        return res.status(401).json({ message: error });
        }
    res.json( `Funcionalidad próximamente.. Los valores que ingreso para actualizar: ${x_capacity} , ${y_capacity} , ${z_amount_wanted}` );
    } catch (error) {
        res.json({message: error.message})
   }
}

//Metodo para el delete, quien borraria en una base de datos la combinacion solicitada.
const borrarValores = async (req,res)=>{
  try {
    res.json( 'Funcionalidad próximamente..' );
    } catch (error) {
        res.json({message: error.message})
   }
}

//Método para el Post
const solucion = async (req,res)=>{
    try {
        // obtenemos los valores del request 
        const { x_capacity, y_capacity, z_amount_wanted } = req.body; 
        
        // Validamos que sea un número Entero y Positivo 
        const error = validacionNumber(x_capacity, y_capacity, z_amount_wanted);
        if (error) {
        return res.status(401).json({ message: error });
        }
        let resultado = solveWaterJug(x_capacity, y_capacity, z_amount_wanted);
        return res.status(201).json({ message: resultado });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ message: "Error en el servidor" });
    }
}


module.exports = { solucion , traerJarras , actualizarValores, borrarValores  } 

