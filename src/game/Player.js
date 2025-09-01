export class Player {
    constructor(sprite, speed = 5, mapW = null, mapH = null){
        this.sprite = sprite;
        this.speed = speed;
        this.mapW = mapW; // largeur du monde / map
        this.mapH = mapH; // hauteur du monde / map
    }  

    moveUp() {
        this.sprite.position.y -= this.speed;
        this.updatePlayerPosition();
        this.sprite.frame = 1;
    }

    moveDown() {
        this.sprite.position.y += this.speed;
        this.updatePlayerPosition();
        this.sprite.frame = 0;
    }

    moveLeft() {
        this.sprite.position.x -= this.speed;
        this.updatePlayerPosition();
        this.sprite.frame = 3;
    }

    moveRight() {   
        this.sprite.position.x += this.speed;
        this.updatePlayerPosition();
        this.sprite.frame = 2;
    }

    // Empêche le joueur de sortir de la map
    updatePlayerPosition(){
        if(this.sprite.position.x < 0) this.sprite.position.x = 0;
        if(this.sprite.position.y < 0) this.sprite.position.y = 0;

        if(this.sprite.position.x + this.sprite.width > this.mapW)
            this.sprite.position.x = this.mapW - this.sprite.width;

        if(this.sprite.position.y + this.sprite.height > this.mapH)
            this.sprite.position.y = this.mapH - this.sprite.height;
    }
}
