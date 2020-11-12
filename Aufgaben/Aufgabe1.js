console.log("Übungsblatt 1");

//maximal Höhe der Bewertung
const maxHoehe = 100;

let aktuell = 0;
let eingabe=0;
let gesamtAnzahl = 0;

// Ausgaben:
console.log('Die Höchstmögliche Gesamtbewertung beträgt '+maxHoehe+ ' Sterne.');
console.log("Die aktuelle Anzahl der Bewertung ist bei "+aktuell +" Sternen");
console.log("Eingabe : " +eingabe+ ' Sterne\n');
console.log("Nach veränderung: \n")
aktuell = 1
eingabe = 2.5

// Ausgabe nach veränderung
console.log("Die aktuelle Anzahl der Bewertung ist bei " +aktuell +" Sternen");
// Aufgabe 3 Readline modul einbinden
const lineread = require('readline');
const lr = lineread.createInterface({

    input: process.stdin,
    output: process.stdout
});

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
/*lr.question("Wie lautet Ihr Name? \n", (nameBewertung) => {
    nameBewertung = eingabe
    console.log("Ihr name lautet: " +array[0]);
    lr.close();
}); */

rl.question("Wie oft möchten Sie die Bewertung wiederholen?\n", (eingabe2) => {
    for (var i = 1; i <= eingabe2; i++) {
        let randomzahl = Math.floor(Math.random() * 10);
        aktuell = bewertungBerechnen(randomzahl)
        gesamtAnzahl+= randomzahl
        // for(let a = 0; a<randomzahl;a++){}
        console.log("Ihre "+i +". Zahl lautet:")
        console.log(randomzahl+ "\n")
        console.log([1])
    }
    rl.close();
});


// Aufgabe 5 Berechnung in eine Funktion packen
var bewertungBerechnen = function(berechnungBewertung){

    gesamtAnzahl+=berechnungBewertung;
    aktuell++;

    return aktuell/gesamtAnzahl;
}


/*Aufgabe 1 - Array
Um das Programm von letzter Woche zu erweitern, speichern Sie den Namen der Bewertung,
    die Anzahl der abgegebenen Bewertungen und die zuletzt eingetragene Bewertung in einem Array ab.
    Zudem soll dann die Länge des Arrays und die zuletzt eingetragene Bewertung auf der Konsole ausgegeben werden.*/





// Array erstellen
/*let array = ["Bewertung",0, 0];
    array = bewertungBerechnen(randomzahl)

console.log("Array: " +array);
console.log("Array länge: " +array.length);
*/
/*Aufgabe 2 - Object
Um verschiedene Bewertungen adäquater zu speichern, wird das Programm durch Objekte erweitert.
    Legen Sie dafür ein Objekt mit dem Namen „ratings“ an. Dieses Objekt enthält dann den Namen der Bewertung,
    die Anzahl der Abstimmungen und das letzte Ergebnis. Geben Sie nun den Namen der Bewertung auf der Konsole aus.
    Wie könnte man nun mehrere Bewertungen mit unterschiedlichen Namen abspeichern?*/





