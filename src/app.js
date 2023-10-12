/* ____________ / VARIABLES / ____________ */

const cardNumber = [1,2,3,4,5,6,7,8,9,10,11,12,13];  
const cardSymbol = ["♧", "♢", "♡", "♤"];

let btnDraw = document.querySelector('.draw');
let btnSort = document.querySelector('.sort');
let orderCards = [];

/* ____________ / FUNCIONES / ____________ */

function createCard(elem) {

  // Seleccionamos el input y validamos que el numero sea entero.
  let inputCards = document.querySelector('.num-cards');
  let numCards = parseInt(inputCards.value);
  orderCards = [];
   
  for(let i = 0 ; i < numCards ; i++) {

    // Creamos variables para tomar un num y sym aleatorios.
    let randomNum = Math.floor(Math.random() * cardNumber.length);
    let randomSym = Math.floor(Math.random() * cardSymbol.length)

    // Creamos la carta.
    let card = document.createElement('div');
    card.classList.add('card');

    // Simbolo superior de la carta.
    let topSym = document.createElement('div');
    topSym.classList.add('top-sym');
    topSym.innerHTML = cardSymbol[randomSym];
    
    // Número de la carta.
    let middleNum = document.createElement('div');
    middleNum.classList.add('mid-num');
    let num = cardNumber[randomNum];
    middleNum.innerHTML = valores(num);

    // Simbolo inferior de la carta.
    let bottomSym = document.createElement('div');
    bottomSym.classList.add('bottom-sym');

    // Creamos una condición para que el corazón y el diamante sean rojos, mientras el resto son negros.
    if( topSym.innerHTML === "♡" || topSym.innerHTML === "♢" ) {
      
      topSym.style.color = "red";
      middleNum.style.color = "red";
      bottomSym.style.color = "red";
    
    } else {

      topSym.style.color = "black";
      middleNum.style.color = "black";
      bottomSym.style.color = "black";
      
    }

    // Definimos que el html de los simbolos sea el mismo, así no aparecen distintos arriba y abajo.
    bottomSym.innerHTML = topSym.innerHTML;

    // Se une el contenido a la card && Se une la card al elemento que toma la función.
    card.appendChild(topSym);
    card.appendChild(middleNum);
    card.appendChild(bottomSym);
    elem.appendChild(card);

    // Creamos un objeto que tenga el contenido [ num + card ].
    let cardContent = {
      number: num,
      html: card.innerHTML
    };

    // Metemos el contenido de la carta en el arreglo vacío.
    orderCards.push(cardContent);

  }

}

/* Hacemos un switch para especificar los valores de las cartas que faltan (A,J,Q,K) en su respectivo orden dado en la clase.

Valores de las cartas: A = 1 | J = 11 | Q = 12 | K = 13 */
function valores(value) {
  switch (value) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return value.toString();
  }
}

// Botón para crear un mazo aleatorio
btnDraw.addEventListener("click", e => {
  
  let cardDeck = document.querySelector('.card-deck'); // Seleccionamos el contenedor del mazo
  cardDeck.innerHTML = ""; // Limpia el HTML anterior
  createCard(cardDeck); // Creamos la carta

  let sortCards = document.querySelector('.sort-cards'); // Seleccionamos el contenedor de sort
  sortCards.innerHTML = ""; // Limpiamos el HTML anterior

});

// Botón para ordenar cartas
btnSort.addEventListener("click", e => {
  
  // Seleccionamos el contenedor y limpiamos el HTML
  let sortCards = document.querySelector(".sort-cards");
  sortCards.innerHTML = "";

  // Guardamos el arreglo con su posición inicial de cartas
  let initialOrder = [...orderCards]; 

  // Sorting cards with bubble
  for (let i = 0; i < initialOrder.length; i++) {

    for (let b = 0; b < initialOrder.length - i - 1; b++) {
      if (initialOrder[b].number > initialOrder[b + 1].number) {
        let temp = initialOrder[b];
        initialOrder[b] = initialOrder[b + 1];
        initialOrder[b + 1] = temp;
      }
    }

    let actual = document.createElement("div");
    actual.classList.add("filas");
    actual.innerHTML = `${i + 1}:`;
    sortCards.appendChild(actual);

    for (let c = 0; c < initialOrder.length; c++) {
      let newCard = document.createElement("div");
      newCard.classList.add("new-card");

      newCard.innerHTML = initialOrder[c].html;
      actual.appendChild(newCard);
    }
  }
});