// Carlos Eduardo Ruiz Lira
// A01735706
// Problema de Cafeteria
// 24/02/2023

const ERROR_MSGS = {
    NO_INPUT: 'No hay entrada',
    NO_SIZES: 'No se introdujeron tamaños. Deben estar separados por comas, después del nombre',
    NO_NAME: 'No se introdujo nombre de bebida',
    INVALID_NAME_CHARACTERS: (drinkName) => `El nombre ${drinkName} contiene valores no alfabéticos`,
    INVALID_NAME_FEW_CHARACTERS: 'El nombre tiene menos de 2 caracteres',
    INVALID_NAME_MAX_CHARACTERS: 'El nombre tiene más de 15 caracteres',
    INVALID_SIZES_MAX: 'Introduce Máximo 5 tamaños',
    INVALID_SIZES_EMPTY: (index) => `El tamaño de la bebida ${index} está vacío`,
    INVALID_SIZES_NOT_A_NUMBER: (size, index) => `El tamaño ${size} de la bebida ${index} no es un número`,
    INVALID_SIZES_NOT_A_INTEGER: (size, index) => `El tamaño ${size} de la bebida ${index} no es un número entero`,
    INVALID_SIZES_BELOW: (size, index) => `El tamaño ${size} de la bebida ${index} es menor a 1. Sólo introduce tamaños en un rango de 1 a 48`,
    INVALID_SIZES_OVER: (size, index) => `El tamaño ${size} de la bebida ${index} es mayor a 48. Sólo introduce tamaños en un rango de 1 a 48`,
    INVALID_SIZES_NO_SORTED: 'Los tamaños de las bebidas no estan ordenados ascendentement',
    VALID_DRINK: (drinkName, drinkSizes) => `La bebida ${drinkName} con los tamaños ${drinkSizes.join(',')} ha sido agregada`

}



const newBeverage = (drink) => {
    //Verificar si existe alguna entrada, ignorar espacios
    if(!drink || !(drink.split(' ').join(''))) return ERROR_MSGS.NO_INPUT;

    //Nombre y tamaños estan separados por coma
    const inputs = drink.split(',');

    // Nombre y tañanos separados por coma
    if(inputs.length === 1) return ERROR_MSGS.NO_SIZES;

    //Ignorar espacios 
    const drinkName = inputs[0].split(' ').join('');

    //El string debe empezar con el nombre
    if(!drinkName.length) return ERROR_MSGS.NO_NAME;

    //El nombre sólo contiene caracteres alfabéticos
    if(!(/^[A-Za-z]+$/.test(drinkName))) return ERROR_MSGS.INVALID_NAME_CHARACTERS(drinkName);
    //La longitud del nombre debe ser mayor a 2
    if(drinkName.length < 2) return ERROR_MSGS.INVALID_NAME_FEW_CHARACTERS;
    //La longitud del nombre debe ser menor a 15
    if(drinkName.length > 15) return ERROR_MSGS.INVALID_NAME_MAX_CHARACTERS;

    const sizes = inputs.slice(1, inputs.length);

    let formatedSizes = [];

    //ignorar espacios
    for(const size of sizes) {
        formatedSizes.push(size.split(' ').join(''));
    }

    //Máximo 5 tamaños
    if(formatedSizes.length > 5) return ERROR_MSGS.INVALID_SIZES_MAX;

    //Checar validez de tamaños
    
    let previousNumber;
    let currentIndex = 1

    for(const size of formatedSizes) {

        //No tamaños vaciós
        if(!size) return ERROR_MSGS.INVALID_SIZES_EMPTY(currentIndex);

        //Sólo números
        if(isNaN(size)) return ERROR_MSGS.INVALID_SIZES_NOT_A_NUMBER(size,currentIndex);

        const sizeInteger = Number(size);

        //Solo tamaño enteros
        if(!Number.isInteger(sizeInteger)) return ERROR_MSGS.INVALID_SIZES_NOT_A_INTEGER(sizeInteger,currentIndex);

        //Tamaño de bebidas en un rango de 1 a 48
        if(sizeInteger < 1) return ERROR_MSGS.INVALID_SIZES_BELOW(sizeInteger,currentIndex);

        if(sizeInteger > 48) return ERROR_MSGS.INVALID_SIZES_OVER(sizeInteger,currentIndex);
        
        //Bebidas tienen que estar ordenadas ascendentemente
        if(previousNumber) {
            if(previousNumber > sizeInteger) return ERROR_MSGS.INVALID_SIZES_NO_SORTED;
        }

        previousNumber = sizeInteger;
        currentIndex++;
    }

    return ERROR_MSGS.VALID_DRINK(drinkName,formatedSizes);
};

exports.newBeverage = newBeverage;
exports.ERROR_MSGS = ERROR_MSGS;