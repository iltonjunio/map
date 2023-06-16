# map

Forma de execução
const array1 = [1, 4, 9, 16];
// Pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// Expected output: Array [2, 8, 18, 32]

Descrição
O método map chama a função callback recebida por parâmetro para cada elemento do Array original, em ordem, e constrói um novo array com base nos retornos de cada chamada. A função callback é chamada apenas para os elementos do array original que tiverem valores atribuídos; os elementos que estiverem como undefined, que tiverem sido removidos ou os que nunca tiveram valores atribuídos não serão considerados.
O método map() invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.

Sintaxe
arr.map(callback[, thisArg])

Parâmetros
callback
Função cujo retorno produz o elemento do novo Array. Recebe três argumentos:
valorAtual
O valor do elemento original do Array de origem.
indice
O índice do elemento atual que está sendo processado no array.
array
O Array de origem.
thisArg
Opcional. Valor a ser utilizado como o this no momento da execução da função callback.

Exemplos
Exemplo: Mapeando um array de números para um array de raízes quadradas
O código a seguir mapeia um array de números e cria um novo array contendo o valor da raiz quadrada de cada número do primeiro array.

 numbers = [1, 4, 9];
 roots = numbers.map(Math.sqrt);
// roots é [1, 2, 3], numbers ainda é [1, 4, 9]

Exemplo: Mapeando um array de números usando uma função callback que contém um argumento
O código a seguir mostrar como o método map funciona quando a função callback possui apenas um argumento. Esse argumento será automaticamente atribuído para cada elemento do array conforme o map itera sobre o array original.

numbers = [1, 4, 9];
doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles é agora [2, 8, 18]. numbers ainda é [1, 4, 9]
Exemplo: usando map genericamente
Esse exemplo demonstra como usar o map em um String para recuperar a representação em ASCII de cada caracter em um array de bytes:

var map = Array.prototype.map;
var a = map.call('Hello World', function(x) { return x.charCodeAt(0); });
// a agora vale [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
Copy to Clipboard
Exemplo: usando map genericamente com querySelectorAll
Esse exemplo demonstra como iterar sobre uma coleção de objetos recuperada através de querySelectorAll. Nesse caso, vamos pegar todos os options selecionados na tela e imprimir no console:

var elems = document.querySelectorAll('select option:checked');
var values = [].map.call(elems, function(obj) {
  return obj.value;
});
Copy to Clipboard
Exemplo: Usando map para inverter uma string
var str = '12345';
[].map.call(str, function(x) {
  return x;
}).reverse().join('');

// Output: '54321'
// Bonus: utilize '===' para verificar se a string original e a nova string são palíndromos
Copy to Clipboard
Exemplo: Caso de uso mais complexo
(inspirado nesse post) (em inglês)

É uma prática comum utilizar o callback com apenas um argumento (o elemento atual do array original). Algumas funções também são comumente utilizadas com um argumento, mesmo tendo argumentos adicionais opcionais. Esses hábitos podem resultar em comportamentos indesejado:

// Considere:
['1', '2', '3'].map(parseInt);
// Enquanto era de se esperar [1, 2, 3]
// O resultado atual é [1, NaN, NaN]

// parseInt é normalmente usado com apenas um argumento, mas ele possui dois.
// O primeiro é uma expressão, e o segundo o radical.
// Para a função callback, o Array.prototype.map repassa 3 argumentos:
// o elemento corrente, o indice e o array original
// O terceiro argumento é ignorado pelo parseInt, mas o segundo não, o que certamente gerou o comportamento inesperado. Veja o post para maiores detalhes

function returnInt(element) {
  return parseInt(element, 10);
}

['1', '2', '3'].map(returnInt); // [1, 2, 3]
// O resultado atual é um array de números (como esperado)

// Bonus: Um jeito mais simples de conseguir o mesmo resultado sem nenhuma "pegadinha do Malandro":
['1', '2', '3'].map(Number); // [1, 2, 3]
Polyfill
(veja definição em Polyfill)

O método map foi introduzido ao padrão ECMA-262 na sua 5ª edição, o que significa que ele pode não estar presente em todas as implementações desse padrão. Você pode contornar esse problema inserindo o código a seguir no início dos seus scripts, permitindo o uso do map mesmo que ele não esteja sendo suportado nativamente. Esse algoritmo é exatamente o especificado no ECMA-262 5ª edição, assumindo que Object, TypeError, e Array tenham seus valores originais, e que callback.call avalie para o valor original de Function.prototype.call.

callbackfn deve ser uma função que aceita três argumentos. map chama callbackfn uma vez para cada elemento no array, em ordem crescente, e constrói um novo Array a partir dos resultados. callbackfn é chamado apenas para elementos do array que realmente existem; não é chamado para elementos ausentes da matriz.

Se um parâmetro thisArg for fornecido, ele será usado como o valor this para cada chamada de callbackfn. Se não for fornecido, indefinido será usado.

callbackfn é chamado com três argumentos: o valor do elemento, o índice do elemento e o objeto que está sendo percorrido.

map não altera diretamente o objeto no qual é chamado, mas o objeto pode ser alterado pelas chamadas para callbackfn.

O intervalo de elementos processados ​​pelo mapa é definido antes da primeira chamada para callbackfn. Elementos que são anexados ao array após o início da chamada para map não serão visitados por callbackfn. Se os elementos existentes da matriz forem alterados, seu valor passado para callbackfn será o valor no momento em que o mapa os visita; os elementos que são excluídos após o início da chamada para o mapa e antes de serem visitados não são visitados.

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    //  1. Let O be the result of calling ToObject passing the |this|
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len)
    //    where Array is the standard built-in constructor with that name and
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal
        //     method of callback with T as the this value and argument
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
