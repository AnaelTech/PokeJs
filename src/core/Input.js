export class Input {
    constructor(player, menu = null, mapScene = null){
        this.player = player;
        this.menu = menu;
        this.mapScene = mapScene; // Référence à la scène pour contrôler la musique
        document.addEventListener("keydown", (e) => {
            //console.log(e.code);
            this.move(e);
        })
        
    }

    /**
     * Gére les saisies clavier en écoutant les touches sélectionné
     * @param {} e -
     */
    move(e){
        if(this.menu && this.menu.menuOpen){
            return;
        }

        switch(e.code){
            case "ArrowUp":
                this.player.moveUp();
                break;
            case "ArrowDown":
                this.player.moveDown();
                break;
            case "ArrowLeft":
                this.player.moveLeft();
                break;
            case "ArrowRight":
                this.player.moveRight();
                break;
            case "KeyM":
                // Contrôle de la musique
                if(this.mapScene && this.mapScene.toggleMusic) {
                    this.mapScene.toggleMusic();
                }
                break;
        }
    }
}
