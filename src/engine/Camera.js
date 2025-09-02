/**
 * Classe Camera - Gère la caméra du jeu pour suivre le joueur et afficher la bonne partie de la carte
 */
export class Camera {
    /**
     * Constructeur de la caméra
     * @param {number} canvaW - Largeur du canvas de rendu
     * @param {number} canvaH - Hauteur du canvas de rendu
     * @param {number} mapW - Largeur totale de la carte
     * @param {number} mapH - Hauteur totale de la carte
     */
    constructor(canvaW, canvaH, mapW, mapH){
        this.canvaH = canvaH; // Hauteur du canvas
        this.canvaW = canvaW; // Largeur du canvas
        this.mapW = mapW;     // Largeur de la carte
        this.mapH = mapH;     // Hauteur de la carte
        this.x = 0;          // Position X de la caméra dans le monde
        this.y = 0;          // Position Y de la caméra dans le monde
    }

    /**
     * Fait suivre le joueur par la caméra
     * Centre la caméra sur le joueur tout en respectant les limites de la carte
     * @param {Object} player - L'objet joueur avec les propriétés x et y
     */
    followPlayer(player){
        // Centre la caméra sur le joueur
        this.x = player.x - this.canvaW / 2;
        this.y = player.y - this.canvaH / 2;

        // Limite la caméra aux bordures de la carte
        // Empêche la caméra de sortir des limites de la carte
        this.x = Math.max(0, Math.min(this.x, this.mapW - this.canvaW));
        this.y = Math.max(0, Math.min(this.y, this.mapH - this.canvaH));
    }

    /**
     * Applique la transformation de caméra au rendu
     * 
     * */
    apply(ctx){
        // Applique une transformation de translation négative pour simuler le mouvement de caméra
        // setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY)
        ctx.setTransform(1,0,0,1, -this.x, -this.y);
    }

}