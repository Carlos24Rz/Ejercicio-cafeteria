
const { newBeverage, ERROR_MSGS } = require("./cafeteria");

test('No hay entrada', () => {
    expect(newBeverage()).toBe(ERROR_MSGS.NO_INPUT);
});
test('No hay entrada (ignorar espacios)', () => {
    expect(newBeverage("        ")).toBe(ERROR_MSGS.NO_INPUT);
});
test('No se introduce nombre de bebida', () => {
    expect(newBeverage(",2")).toBe(ERROR_MSGS.NO_NAME);
});
test('El nombre contiene caracteres no alfabeticos', () => {
    expect(newBeverage("Coca4U,2")).toBe(ERROR_MSGS.INVALID_NAME_CHARACTERS("Coca4U"));
});
test('El nombre tiene menos de 2 caracteres de longitud', () => {
    expect(newBeverage("A,2")).toBe(ERROR_MSGS.INVALID_NAME_FEW_CHARACTERS);
});

test('El nombre tiene mas de 15 caracteres de longitud', () => {
    expect(newBeverage("Coca Cola Ultra Rica,2")).toBe(ERROR_MSGS.INVALID_NAME_MAX_CHARACTERS);
});

test('No se introduce minimo un tamaño ', () => {
    expect(newBeverage("Coca Cola")).toBe(ERROR_MSGS.NO_SIZES);
});

test('Se introducen mas de 5 tamaños ', () => {
    expect(newBeverage("Coca Cola, 1,2,3,4,5,6")).toBe(ERROR_MSGS.INVALID_SIZES_MAX);
});

test('Se introduce un espacio como tamaño ', () => {
    expect(newBeverage("Coca Cola, 1,2,3,,6")).toBe(ERROR_MSGS.INVALID_SIZES_EMPTY(4));
});

test('No se introduce un numero como tamaño ', () => {
    expect(newBeverage("Coca Cola, uno,2,3,6")).toBe(ERROR_MSGS.INVALID_SIZES_NOT_A_NUMBER("uno",1));
});

test('Se introduce un decimal como tamaño ', () => {
    expect(newBeverage("Coca Cola, 1,2,3,1.2,6")).toBe(ERROR_MSGS.INVALID_SIZES_NOT_A_INTEGER("1.2",4));
});

test('Se introduce un número negativo como tamaño ', () => {
    expect(newBeverage("Coca Cola, 1,2,3,-1,7")).toBe(ERROR_MSGS.INVALID_SIZES_BELOW(-1,4));
});

test('Se introduce un número mayor a 48 como tamaño', () => {
    expect(newBeverage("Coca Cola, 1,2,3,50,6")).toBe(ERROR_MSGS.INVALID_SIZES_OVER(50,4));
});

test('Los tamaños no estan ordenados ascendentemente ', () => {
    expect(newBeverage("Coca Cola, 1,2,5,4,3")).toBe(ERROR_MSGS.INVALID_SIZES_NO_SORTED);
});

test('Introduce Nombre valido y tamaño de bebidas valido', () => {
    expect(newBeverage("Coca Cola, 1,2,3,4")).toBe(ERROR_MSGS.VALID_DRINK("CocaCola",["1","2","3","4"]));
});

test('El Nombre tiene longitud de caracteres valido (No cuenta espacios)', () => {
    expect(newBeverage("Coca Cola Max Pro X, 1,2,3,4")).toBe(ERROR_MSGS.VALID_DRINK("CocaColaMaxProX",["1","2","3","4"]));
});

