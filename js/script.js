const array1 = [1, 4, 9, 16];
// Pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// Expected output: Array [2, 8, 18, 32]

//===========================

let numbers1 = [1, 4, 9];
let roots = numbers1.map(Math.sqrt);
// roots é [1, 2, 3], numbers ainda é [1, 4, 9]
console.log(roots);

//=========================

let numbers = [1, 4, 9];
let doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles é agora [2, 8, 18]. numbers ainda é [1, 4, 9]

//===========================

let map = Array.prototype.map;
let a = map.call('Hello World', function(x) { return x.charCodeAt(0); });
// a agora vale [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
console.log(a);

//===========================

var elems = document.querySelectorAll('select option:checked');
var values = [].map.call(elems, function(obj) {
  return obj.value;
});

//===========================

var str = '12345';
[].map.call(str, function(x) {
  return x;
}).reverse().join('');

// Output: '54321'
// Bonus: utilize '===' para verificar se a string original e a nova string são palíndromos


//===========================

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




