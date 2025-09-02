export class Player {
    constructor(sprite, speed = 5, mapW = null, mapH = null, collisionChecker = null){
        this.sprite = sprite;
        this.speed = speed;
        this.mapW = mapW; // largeur map
        this.mapH = mapH; // hauteur map
        // Une fonction qui dit si on tape un mur: (rect) => boolean
        // On la reçoit depuis la scène de la carte
        this.collisionChecker = collisionChecker;
    }  

    moveUp() {
    // On calcule la future position AVANT de bouger
    const next = this._nextFeetRect(0, -this.speed);
        if (!this._isBlocked(next)) {
            this.sprite.position.y -= this.speed;
        }
        this.updatePlayerPosition();
        console.log(this.sprite.position)
        this.sprite.frame = 1;
    }

    moveDown() {
    const next = this._nextFeetRect(0, this.speed);
        if (!this._isBlocked(next)) {
            this.sprite.position.y += this.speed;
        }
        this.updatePlayerPosition();
        console.log(this.sprite.position)
        this.sprite.frame = 0;
    }

    moveLeft() {
    const next = this._nextFeetRect(-this.speed, 0);
        if (!this._isBlocked(next)) {
            this.sprite.position.x -= this.speed;
        }
        this.updatePlayerPosition();
        console.log(this.sprite.position)
        this.sprite.frame = 3;
    }

    moveRight() {   
    const next = this._nextFeetRect(this.speed, 0);
        if (!this._isBlocked(next)) {
            this.sprite.position.x += this.speed;
        }
        this.updatePlayerPosition();
        console.log(this.sprite.position)
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

    // AI -
    // Construit la "boîte" à la prochaine position si on bouge de dx,dy
    _nextRect(dx, dy) {
        return {
            x: this.sprite.position.x + dx,
            y: this.sprite.position.y + dy,
            width: this.sprite.width,
            height: this.sprite.height,
        };
    }

    // Astuce: on ne collisionne que "les pieds" pour éviter de se bloquer avec la tête dans un arbre
    // On prend une petite bande au bas du sprite
    _nextFeetRect(dx, dy) {
        const footHeight = Math.max(6, Math.floor(this.sprite.height * 0.3)); // 30% bas du sprite
        const footWidth = Math.max(8, Math.floor(this.sprite.width * 0.6));   // un peu moins large
        const offsetX = Math.floor((this.sprite.width - footWidth) / 2);
        const x = this.sprite.position.x + dx + offsetX;
        const y = this.sprite.position.y + dy + (this.sprite.height - footHeight);
        return { x, y, width: footWidth, height: footHeight };
    }

    // Donne la "boîte des pieds" à la position ACTUELLE (pratique pour tester une zone)
    getFeetRect() {
        return this._nextFeetRect(0, 0);
    }

    // Demande à la scène si on tape un mur
    _isBlocked(nextRect) {
        if (typeof this.collisionChecker === "function") {
            return this.collisionChecker(nextRect);
        }
        return false;
    }
}
