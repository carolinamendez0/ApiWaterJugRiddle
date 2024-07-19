
//función para la resolución del algoritmo
function solveWaterJug(valorX, valorY, valorZ) {
    // Algoritmo BFS
    let cola = []; //Cola
    let estados = new Set(); //Colección de estados
    
    // Inicializo la cola, y agrego a la colección el estado inicial 0,0
    cola.push({ x: 0, y: 0, steps: [] });
    estados.add('0,0');

    while (cola.length > 0) {
        let { x, y, steps } = cola.shift();
        // Verificamos si ya se lleno Z
        if (x === valorZ || y === valorZ) {
             steps[steps.length - 1].status = "Solved";
            return { solution: steps };
             
        }

        // Generar estados siguientes
        let nextStates = [
            llenar(x, valorY),
            llenar(valorX, y),
            vaciar(0, valorY, x, y),
            transferir(x, y, valorX, valorY, 'x'),
            vaciar(valorX,0,x,y),
            transferir(x,y,valorX,valorY,'y')
        ];
       

        for (let { x: newX, y: newY, accion } of nextStates) {
            let state = `${newX},${newY}`;
            if (!estados.has(state)) {
                estados.add(state);
                cola.push({
                    x: newX,
                    y: newY,
                    steps: [...steps, {
                        step: steps.length + 1,
                        jarraX: newX,
                        jarraY: newY,
                        accion
                    }]
                });
            }
        }
    }

    return "No hay solución posible";
}

function llenar(X, Y) {
    
    if (X > 0) {
        return { x : X , y: Y, accion: 'Llenar X..'}
        
    } else if (Y > 0) {
        return { x : X , y: Y , accion: 'Llenar Y..'}
    }
    else {
    // console.log( 'Caso 0,0')
        return { x : X , y: Y }
    }
}

function vaciar(valorX,valorY,x,y) {
    if (valorX == 0) {
        return { x:valorX,y:y ,accion: 'Vaciar X..' };
    } else if (valorY == 0) {
        return { x:x, y:valorY, accion: 'Vaciar Y..' };
    }
    return null; 
}


function transferir(x, y, X, Y, variable) {
    if (variable === 'x') {
        let valorTransferir = Math.min(x, Y - y);
        return { x: x - valorTransferir, y: y + valorTransferir, accion: 'Transferir X a Y' };
    } else if (variable === 'y'){
         let valorTransferir = Math.min(y, X - x);
    return { x: x + valorTransferir, y: y - valorTransferir, accion: 'Transferir Y a X' };
    }
}



function validacionNumber(X, Y, Z) {
    if (X === undefined || Y === undefined || Z === undefined) return `Faltan parámetros requeridos ${X} , ${Y} , ${Z} ` ;
    if (!Number.isInteger(X)) return "El parámetro x_capacity no es un número entero";
    if (!Number.isInteger(Y)) return "El parámetro y_capacity no es un número entero";
    if (!Number.isInteger(Z)) return "El parámetro z_amount_wanted no es un número entero";
    if (X < 0) return "El parámetro x_capacity no es un número positivo";
    if (Y < 0) return "El parámetro y_capacity  no es un positivo";
    if (Z < 0) return "El parámetro z_amount_wanted no es un positivo";
    if (Z > X && Z > Y) return "Error ninguna jarra completa Z";
    const errorMCD = esmultiploMCD(X,  Y, Z);
    if (errorMCD) {
        return `${errorMCD}`;
        }

  return null;
}

function esmultiploMCD(X, Y, Z) {
    let result = mcd(X, Y);
    if (Z % result !== 0) {
        return `El valor buscado Z = ${Z} , no es multiplo del mcd =  ${result} `;
    }
  return null;
    
}

// Función para calcular el MCD
function mcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

module.exports = {solveWaterJug, validacionNumber}