export class Input {
    constructor(player, menu = null){
        this.player = player;
        this.menu = menu;
        document.addEventListener("keydown", (e) => {
            //console.log(e.code);
            this.move(e);
        })
        
    }

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
        }
    }
}
