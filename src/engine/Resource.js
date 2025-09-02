/**
 * Cette classe précharge les images nécessaires (carte, héros, arrière-plan de combat, etc.)
 * afin d'éviter des clignotements, des latences ou des erreurs d'accès aux images non encore
 * chargées au moment de l'affichage.
*/
export class Resources {
    constructor(){
        
        this.toLoad = {
            // Sprite de la carte principale
            map: "assets/sprites/map.png",
            // Sprite du héros (feuille d'animation)
            hero: "assets/sprites/hero.png",
            // Arrière-plan utilisé pour la scène de combat
            bgBattle: "assets/battles/battle.png"
        };

        this.images = {};

        // Lance le préchargement de chaque ressource déclarée dans `toLoad`.
        Object.keys(this.toLoad).forEach(key => {
            // Crée un nouvel objet Image du navigateur.
            const img = new Image();
            // Assigne la source: le chargement commence immédiatement.
            img.src = this.toLoad[key];

            // Initialise l'entrée avec un état non chargé.
            this.images[key] = {
                image: img,
                isLoaded: false
            }

            // Quand l'image est entièrement chargée, marque l'état à true.
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}