<h1 align="center" style = "margin: 0 auto;  height: 200px; overflow: hidden;" >
  <p align="center">Api Water Jug Riddle</p>
</h1>

## Tabla de contenidos
- [🔸 Información General](#-información-general)
    - [Investigación requerida.](#investigación-requerida)
- [🔹 Instalación](#-instalación)
    - [Pasos para la instalación](#pasos-para-la-instalación)
    - [Ejecución](#ejecución)
- [🔸 Estructura del proyecto](#-estructura-del-proyecto)
    - [Archivos del proyecto](#archivos-del-proyecto)
    - [Peticiones](#peticiones)
    - [Parámetros](#parámetros)
        - [Request](#request)
        - [Responses](#responses)
  - [Criterios de aceptación](#criterios-de-aceptación)
  - [Posibles estados - diferentes acciones](#posibles-estados---diferentes-acciones)
- [🔹 Test](#-test)
    - [Ejecución test](#ejecución-test)
- [🔸 Explicación de algoritmo](#-explicación-de-algoritmo)

# 🔸 Información General
***
👋 Este repositorio contiene el código de la Api para resolver el juego de Water Jug Riddle, en el cual tendremos dos jarras. La jarra X y la jarra Y , quienes depende la cantidad que permita cargar podremos detectar si se puede llegar al valor requerido en Z. La api manejará los siguientes recursos : 
* x_capacity
* y_capacity
* z_amount_wanted

###  Investigación requerida.
Para la resolución del algoritmo, se utilizaron diferentes calculos y resoluciones matematicas. 
1 - Verificamos si los parametros recibidos estan dentro de los tipos establecidos, si son enteros positivos.
2 - MCD , máximo común divisor y luego si Z es multiplo de ese MCD detectado para validar si es posible resolverlo.
3 - Para la busqueda del camino más corto, se utilizó el algoritmo BFS , quien visita todos los estados posibles nivel a nivel, utilizando una cola para el orden en el que se procesan los estados. Se asegura a su vez que dichos estados no esten repetidos teniendo un registro de los estados ya visitados. Se busca hasta que una de las jarras tenga la cantidad buscada Z, si es así se agrega el paso final a la lista de pasos y se devuelve la solución con el camino recorrido.
4 - Para los test se utilizó supertest para enviar solicitudes y ava. 


# 🔹 Instalación
El entorno  ya cuenta con los paquetes necesarios para poder utilizar la API.

### Pasos para la instalación
git clone `https://github.com/carolinamendez0/ApiWaterJugRiddle.git`
cd ApiWaterJugRiddle
npm install

### Ejecución
Nos ubicamos en la carpeta clonada, y ponemos en la terminal 
```
> npm run start
```

# 🔸 Estructura del proyecto 
### Archivos del proyecto
Se listarán los archivos principales del proyecto, con el fin de explicar su propósito:


index.js: Este archivo hace el lanzamiento del servidor.
app.js : Crea el servidor. Se importan y cargan las rutas.
jarraRouter.js: Contiene las rutas que están disponibles en la api.
jarrasControllers.js: Maneja los métodos para procesar las solicitudes. 
funcionesAuxiliares.js: Tiene funciones auxiliares necesarias para la resolución del método para el POST, llamado solucion. 



###  Peticiones 
***
| PETICION | URL                         | DESCRIPCION                                  |
| :------- | :-------------------------- | :------------------------------------------- |
| GET      | [/](http://localhost:8000/) | Próximamente: lógica para obtener datos.     |
| POST     | [/](http://localhost:8000/) | Devuelve el estado del problema de la jarra. |
| PUT      | [/](http://localhost:8000/) | Próximamente: lógica para actualizar datos.  |
| DELETE   | [/](http://localhost:8000/) | Próximamente: lógica para obtener datos.     |


<!-- ###  Métodos -->

### Parámetros
* x_capacity : Capacidad de la jarra X.
* y_capacity : Capacidad de la jarra Y.
* z_amount_wanted : Cantidad deseada

##### Request
```Json 
POST http://localhost:8000/
Content-Type: application/json
{
  "x_capacity": 5,
  "y_capacity": 3,
  "z_amount_wanted": 4
} 
```
```Json 
Ejemplo Post en Windows(cmd)
curl -X POST "http://localhost:8000/" ^--header "Accept: */*" ^--header "Content-Type: application/json" ^--data-raw "{\"x_capacity\":6,\"y_capacity\":9,\"z_amount_wanted\":3}"
```
##### Responses
[Post]
Algunas de las posibles respuestas :
* 201: El monto buscado de Z se pudo conseguir correctamente, y devuelve la serie de pasos más cortos.
* 401: Parámetros inválidos o faltantes.
* 500: Error en el servidor.

 En caso de respuesta exitosa: 

```json {
  "message": {
    "solution": [
      {
        "step": 1,
        "bucketX": 0,
        "bucketY": 9,
        "action": "Llenar Y.."
      },
      {
        "step": 2,
        "bucketX": 6,
        "bucketY": 3,
        "action": "Transferir Y a X",
        "status": "Solved"
      }
    ]
  }
}
```

## Criterios de aceptación
[Post]
Se deben ingresar 3 valores numericos enteros positivos, siendo z_amount_wanted un valor menor o igual a la capacidad de las jarras x o y . 
```
{
"x_capacity":6,
"y_capacity":9,
"z_amount_wanted":3
}
```
## Posibles estados - diferentes acciones
***
```js
llenar(x, valorY), // lo que le pasamos en valorY es el valor de la capacidad ingresada para la jarra Y, llenamos la jarra Y hasta su valor maximo
llenar(valorX, y), // lo que le pasamos en valorX es el valor de la capacidad ingresada para la jarra X, llenamos la jarra X hasta su valor maximo
vaciar(0, valorY, x, y), //Dependiendo de donde se envie el 0, se va a vaciar uno de los recipientes, en este caso se vacia X.
transferir(x, y, valorX, valorY, 'x'), //depende el parametro final que le enviemos 'x' va a transferir en este caso lo de x a y, buscando cual es el minimo entre lo que tiene x, y la capacidad que le queda a la jarra y que seria el valorY - y , --> Math.min(x, Y - y);
vaciar(valorX,0,x,y), //idem caso de vaciar explicado más arroba, pero vacia Y
transferir(x,y,valorX,valorY,'y')//idem caso de transferir explicado más arroba, transfiere a x
```

# 🔹 Test
### Ejecución test 
Para correr los test los pasos son los siguientes:
```
> npm run test
```
# 🔸 Explicación de algoritmo 
El método solución es quien maneja la solicitud POST con el metodo solucion ubicado en controller/jarrascontrollers.js, extrayendo los valores x_capacity, y_capacity, y z_amount_wanted del req.body luego utiliza la validacionNumber(ubicado en service/funcionesAuxiliares.js), donde validamos los diferentes requerimientos de los numeros ( que sean 3 los parametros enviados, que sean los 3 numericos y enteros positivos. También verifica si Z es multiplo del MCD de las jarras x e y ) si detecta error en este envia el status 401 con el mensaje de error de la validación correspondiente.
```js let resultado = solveWaterJug(x_capacity, y_capacity, z_amount_wanted)```, es la funcion que se llama para implementar el algoritmo BFS que busca la solución y le devuelve los resultados al cliente. 
Dentro de este algoritmo tendremos:
* recibimos x_capacity es valorX, y_capacity es valorY, z_amount_wanted valorZ.
* 1. ```js let cola = [];``` será una cola para los estados a explorar.
* 2. ```js let estados = new Set();``` acá se llevara un registro (colección) de los estados que se visitaron, solo podrá aparecer una vez, la insercion se da en el orden en el que fue insertado con add().
* 3. ```js cola.push({ x: 0, y: 0, steps: [] });``` se inicializa, se pushea la cola con el estado inicial donde ambos estan vacios (0,0)  
* 4. ```js estados.add('0,0');``` a su vez agregamos a la colección de los estados este estado inicial para que no se pueda volver a repetir.
* 5. ```js while (cola.length > 0)``` mientras haya estados en la cola va a seguir buscando la solución, acá entra por priemera vez con el paso inicial (#3)
* 6. ```js let { x, y, steps } = cola.shift();``` carga en { x,y,steps } los valores que estan en el primer estado de la cola. 
* 7. ```js if (x === valorZ || y === valorZ) { steps[steps.length - 1].status = "Solved"; return { solution: steps }; }```  en este paso se verifica si alguna de las variables (x,y) tiene el valor solicitado valorZ, si es así se marca al ultimo paso en el que esta el puntero con el status = "solved" y devuelve la solucion.
  solution el objeto devuelve la lista de pasos (steps) para llegar al objetivo del valorZ.
* 8. ```js let nextStates = [llenar(x, valorY),llenar(valorX, y),vaciar(0, valorY, x, y),transferir(x, y, valorX, valorY, 'x'),vaciar(valorX, 0, x, y),transferir(x, y, valorX, valorY, 'y')];```  se genera la lista con todos los posibles estados que se pueden dar, que se llene y con el valorY (es la capacidad maxima del jarro) , que se llene x, que se vacie x, que se transfiera x , que se vacie y , que se transfiera y. 

* 9. ```js for (let { x: newX, y: newY, action } of nextStates) {let state = `${newX},${newY}`;if (!estados.has(state)) {estados.add(state);cola.push({x: newX,y: newY,steps: [...steps, {step: steps.length + 1,bucketX: newX,bucketY: newY,action}]});}}```  Se encolan nuevos estados, el for itera sobre todos los nuevos estados posibles.
El let state, convierte los estados que toma de nextStates en el for a una cadena. 
El ```js if (!estados.has(state)) { estados.add(state); ..``` es el encargado de verificar si el estado ya existe en la coleccion, y si existe no lo carga ni en la cola ni en los estados nuevamente.
```js cola.push ``` agrega el nuevo estado a la cola y la lista de pasos actualizada con su accion.
En steps: ```js[..steps, {}]``` se crea una copia de la lista actual y se agrega el nuevo paso sumandole 1 y los valores del estado. 
```js let resultado = solveWaterJug(x_capacity, y_capacity, z_amount_wanted);``` en solucion dentro de jarrasController.js se le devuelve la lista de los pasos para llegar a la solución o si no hay solución.
```js return res.status(201).json({ message: resultado });``` , se devuelve con el status 201 y el resultado obtenido.





