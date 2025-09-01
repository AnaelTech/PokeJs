export class MenuScene {
    constructor(){
        document.addEventListener("keydown", (e) => {
            this.handleKeyPress(e);
        });
        this.menuOpen = false;
    }

    handleKeyPress(e){
        if (e.code === "Escape"){
            e.preventDefault(); // Empêche le comportement par défaut
            this.toggleMenu();
        }
    }

    toggleMenu(){
        this.menuOpen = !this.menuOpen;
    }

    draw(ctx){
        if (this.menuOpen) {
            this.drawMenu(ctx);
        }
    }

    drawMenu(ctx){
        // Fond semi-transparent sur tout l'écran
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Centrer le texte
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Titre du menu
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Menu", ctx.canvas.width / 2, ctx.canvas.height / 2 - 60);
        
        // Options du menu
        ctx.font = "20px Arial";
        ctx.fillText("Restart game", ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.fillText("Disable music", ctx.canvas.width / 2, ctx.canvas.height / 2 + 40);
        
        // Instructions
        ctx.font = "16px Arial";
        ctx.fillStyle = "lightgray";
        ctx.fillText("Press Escape to close", ctx.canvas.width / 2, ctx.canvas.height / 2 + 100);
    }
}