/**
 * Descrizione
 * - Il computer deve generare 16 numeri casuali da 1 a 100 (bombe).
 * - In seguito deve chiedere all’utente di inserire un numero da 1 a 100 alla volta, se il numero è presente nella lista dei numeri generati la partita termina altrimenti continua chiedendo
 * all’utente un altro numero.
 * - La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
 * - Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
 * 
 * BONUS: (da fare solo se funziona tutto il resto)
 * all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
 * con difficoltà 0 => tra 1 e 100
 * con difficoltà 1 => tra 1 e 80
 * con difficoltà 2 => tra 1 e 50
 */

/**
 * INIZIALIZZAZIONE
 * 
 * Setup e creazione bombe
 */

var maxNum;
var bombNum = 16;
var possibility;
var bombList = [];
var correctNum = [];
var user = 0;

// Scelta del livello di difficoltà
var level = parseInt( prompt('Si prega di selezionare il livello di difficoltà (da 0 a 2)').trim() );

// Validazione
while (isNaN(level) || level < 0 || level > 2) {
    level = parseInt( prompt('Si prega di selezionare il livello di difficoltà (da 0 a 2)').trim() );
}

// Switch per selezionare il livello di difficoltà
switch (level) {
    case 0:
        maxNum = 100;
        break;
    case 1:
        maxNum = 80;
        break;
    case 2:
        maxNum = 50;
}

// Calcolo del numero delle possibilità
possibility = maxNum - bombNum;

// Generazione bombe
while (bombList.length < bombNum) {
    // assegno all variabile bomba dei numeri random
    var bomb = getRandomNumber(maxNum);

    // controllo se bombList non include il numero bomb, in modo da non inserire in bombList  2 numeri uguali
    if (! bombList.includes(bomb)) {
        bombList.push(bomb);
    }
}
console.log('Lista bombe:', bombList);

/**
 * MAIN LOOP
 */

while ( (correctNum.length < possibility) && (! bombList.includes(user)) ) {
    // Scelta dell'utente
    user = parseInt( prompt('Inserisci un numero da 1 a ' + maxNum + '\nTentativi riusciti: ' + correctNum.length + ' di ' + possibility) );

    // Validazione
    while ( isNaN(user) || user < 1 || user > maxNum ) {
        user = parseInt( prompt('Valore non valido, inserisci un numero da 1 a ' + maxNum) );
    }

    // Controllo Scelta
    if ( bombList.includes(user) ) {
        alert('Hai perso! Hai provato con successo ' + correctNum.length + ' volte prima di trovare la bomba!');
    } else if ( correctNum.includes(user) ) {
        alert('Numero già inserito, si prega di inserirne un altro');
    } else if (! correctNum.includes(user) ) {
        correctNum.push(user);
    }

    // Controllare il raggiungimento delle possibilità
    if (correctNum.length === possibility) {
        alert('Complimenti! Hai vinto!!!');
    }
}


/**
 * SCHERMATA FINALE 
 */

console.log('-- GIOCO CONCLUSO --');
console.log('Lista dei numeri validi inseriti: ', correctNum);
console.log('Tentativi riusciti: ', correctNum.length);


/****************************************************************
 * FUNCTION UTILITIES
 ****************************************************************/

/**
 * Genera un numero random da 1 al valore max impostato
 * @param {number} max numero massimo da generare
 * @returns un numero randoma da 1 a max
 */
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}