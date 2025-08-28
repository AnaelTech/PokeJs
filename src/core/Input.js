export class Input {
    constructor(player){
        this.player = player;
        document.addEventListener("keydown", (e) => {
            //console.log(e.code);
            this.move(e);
        })
    }

    move(e){
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
