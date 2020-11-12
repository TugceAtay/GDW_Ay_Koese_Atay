/*Deklarieren Sie eine Konstante, welche die maximale Höhe einer möglichen Bewertung einer App für  das
Smartphone  angibt  (zum  Beispiel  Sterne  im  App  Store).  Außerdem  deklarieren  Sie  zwei weitere
Variablen,  eine  welche  die  aktuelle  Anzahl  der  Bewertungen  beinhaltet,  und  eine  die  die Bewertung
selbst  speichert.  Weisen  Sie  diesen  Variablen  und  ihrer  Konstante  nun  Werte  zu,  mit denen  sie  in
den  folgenden  Aufgaben  arbeiten.
 -Geben  Sie  diese  Variablen  auf  der  Konsole  aus. Zusätzlich  simulieren Sie  einmal  eine  Bewertung  und
   lassen  die  veränderten  Werte  wiederum ausgeben.
   Was macht Javascript, wenn Sie eine der Variablen einen anderen Typ zuweisen?
    Was passiert,  wenn  Sie  ihrer  Konstante,
    nachdem  Sie  diese  deklariert  haben,  einen  neuen  Wert zuweisen? */

//maximal Höhe der Bewertung
const maxHoehe = 100;
let aktuell = 0;
let eingabe=0;
let gesamtAnzahl = 0;

// Ausgaben:
console.log('Die Höchstmögliche Gesamtbewertung beträgt '+maxHoehe+ ' Sterne.');

console.log("Die aktuelle Anzahl der Bewertung ist bei "+aktuell +" Sternen");

console.log("Eingabe : " +eingabe + ' Sterne\n');

console.log("Nach veränderung: \n")
aktuell = 1
eingabe = 2.5

// Ausgabe nach veränderung /Es wird eine Bewertung simuliert, indem die Anzahl der Bewertungen und die Bewertung selbst verändert werden.
console.log("Die aktuelle Anzahl der Bewertung ist bei "+aktuell +" Sternen");




// Aufgabe 3 Readline modul einbinden
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//rl.question('What is your favorite food? ', (answer) => {
/*  rl.question('Wie viele Sterne möchten Sie vergeben?\n', (eingabe) =>
  {
  if(parseInt(eingabe) >maxHoehe){

  console.log("Die Bewertung ist zu hoch")}

  else if(isNaN(parseInt(eingabe))){
      console.log("Strings sind nicht verwendbar")
  }


  else {
      console.log(`Answer: ${eingabe}`); // Hier geben wir die eingegebene answer aus
  }

rl.close();
  });
let eingabe2 = 0; */
//  Aufgabe 4 / for (var i = 10; i <= 36; i++) {
rl.question("Wie oft möchten Sie die Bewertung wiederholen?\n", (eingabe2) => {
    for (var i = 1; i <= eingabe2; i++) {
        let randomzahl = Math.floor(Math.random() * 10);
        gesamtAnzahl+= randomzahl
        // for(let a = 0; a<randomzahl;a++){}
        console.log("Ihre "+i +". Zahl lautet:")
        console.log(randomzahl+ "\n")
    }
    rl.close();

});

var bewertungBerechnen = function(berechnungBewertung){

    gesamtAnzahl+=berechnungBewertung;
    aktuell++;

    return aktuell/gesamtAnzahl;
}

//  console.log(bewertungBerechnen())

/*
var celsiusInFahrenheit = function(celsius) {
    return celsius * 1.8 + 32;
}
bewertet 1 bewerte  5 6 /2 = 3 */