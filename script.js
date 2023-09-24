"use strict";



// Initialisation des variables caractéristiques, prénoms, stats et de Jason.
let caractéristiques = ["diabétique", "intellectuel", "gros", "con", "Schwarzenegger"];        
let prenoms = ["pape", "matteo", "gabriel", "paul", "vianney"];                                     
let stats = [[0.1, 0.7, 0.2], [0.5, 0.3, 0.2], [0.1, 0.4, 0.5], [0.4, 0.4, 0.2], [0.2, 0.5, 0.3]];  
let joueurs = [];                                                                                  
let survivantsMorts = [];                                                                           
let tueur = ["Jason", 69];                                                                          


class Personnage { //on fais une class pour fair des joueur avec un nom, une caractéristique, et des probabilitées
    constructor(nom, caractéristique, probaDead, probaDmg, probaDmgDead) {
        this.nom = nom;
        this.caractéristique = caractéristique;
        this.probaDead = probaDead;
        this.probaDmg = probaDmg;
        this.probaDmgDead = probaDmgDead;
    }
}

function combat() {                            //on fais une fonction combat qui vérifie le nombre de joueur en vie et les points de vie de jason
    let affichageMort = "";           

    if (joueurs.length >= 1 && tueur[1] > 0) { // si il reste un joueur ou plus et qu'il reste des points de vie à jason, on prend un joueur parmis les joueurs restants aléatoirement pour lancer la phase ou jason attaque dans la fonction attaque tueur
        let chiffreSurvivantAleatoire = Math.floor(Math.random() * joueurs.length);
        let survivantCible = joueurs[chiffreSurvivantAleatoire]
        attaqueTueur(survivantCible, chiffreSurvivantAleatoire)
        

    } else if (joueurs.length >= 1 && tueur[1] <= 0) { 

        for (let i = 0; i < survivantsMorts.length; i++) {   //on affiche les morts 
            let test = survivantsMorts[i]; 

            if (survivantsMorts.length > 1) {                //si il y a plus d'un mort et on verifie la place du mort dans la liste pour varier l'affichage            
                if (test == survivantsMorts[survivantsMorts.length - 1]) {
                    affichageMort += `et ${test}.`;          //Une simplification pour écrire affichageMort = affichageMort + "et " + test + "."

                } else if (test == survivantsMorts[survivantsMorts.length - 2]) {
                    affichageMort += `${test} `              //Une simplification pour écrire affichage = affichage + test + " "
                } else {
                    affichageMort += `${test}, `;
                }
            } 
            else {                                           //si il n'y a qu'un mort
                affichageMort += `${test}`
            }
        }

        if (!affichageMort) {  //si il n'y a pas de mort et que jason n'a plus de points de vie on affiche 
        console.log("Jason est mort ! Aucune victime n'est à déplorer chez les survivants !")
        } else {
            console.log("Jason est mort ! Mais RIP à", affichageMort)
        }

    } else if (joueurs.length == 0 && tueur[1] > 0) {  //si il n'y a plus de joueur vivant
        console.log("Jason a gagné, il ne reste plus aucun survivant.");

    } else if (joueurs.length == 0 && tueur[1] <= 0) {  //si il n'y a plus de joueur vivant et que jason est mort
        console.log("Tous le monde est mort...", affichageMort);
    }

}

function attaqueTueur(survivantCible, chiffreSurvivantAleatoire) { //prend le survivant et son index
    let valeurAleatoire = Math.random();                           // prend une valeur aléatoire entre 0 et 1 pour calculer les probabilités avec les stat du survivant

    if (valeurAleatoire < survivantCible["probaDead"]) {
        console.log("Jason a tué", survivantCible["nom"]);
        survivantsMorts.push(survivantCible["nom"]);
        joueurs.splice(chiffreSurvivantAleatoire, 1);

      } else if (valeurAleatoire < survivantCible["probaDead"] + survivantCible["probaDmg"]) {
        console.log(survivantCible["nom"],"esquive et met 10 dégâts à Jason !");
        tueur[1] -= 10;

      } else  { 
        console.log(survivantCible["nom"] ,"se sacrifie et met 15 dégâts à Jason !");
        tueur[1] -= 15;
        survivantsMorts.push(survivantCible["nom"]);
        joueurs.splice(chiffreSurvivantAleatoire, 1);
      }


    console.log("Survivants morts :", survivantsMorts);

    combat() //on relance la fonction combatm

};



prenoms.forEach(nom => {  // Pour chaque nom dans le tableau prenoms, une caractéristique et des stats vont être mis chacune dans une variable.
    let i = Math.floor(Math.random() * caractéristiques.length); // Nombre aléatoire qui prend la longeur du tableau des caractéristiques, soit entre 0 et 4    [0, 5[
    let caractéristique = caractéristiques.splice(i, 1);         // Prend un élément du tableau caractéristiques a partir de l'index i obtenu aléatoirement en le retirant du tableau.

    let j = Math.floor(Math.random() * stats.length);            // Nombre aléatoire qui prend la longeur du tableau des stats, soit entre 0 et 4    [0, 5[
    let statPerso = stats.splice(j, 1);                          // Prend un élément du tableau stats a partir de l'index j obtenu aléatoirement en le retirant du tableau.

    let joueur = new Personnage(nom, caractéristique, statPerso[0][0], statPerso[0][1], statPerso[0][2]);
    joueurs.push(joueur)

});

combat() //On lance la fonction combat 


