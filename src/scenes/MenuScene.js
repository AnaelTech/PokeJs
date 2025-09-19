export class MenuScene {
    constructor(callbacks = {}){
        // Callbacks fournis par le jeu
        // { onToggleMusic: () => void, onRestart: () => void, isMusicPlaying: () => boolean }
        this.onToggleMusic = callbacks.onToggleMusic || (() => {});
        this.onRestart = callbacks.onRestart || (() => window.location.reload());
        this.isMusicPlaying = callbacks.isMusicPlaying || (() => false);

        // Etat du menu
        this.menuOpen = false;
        this.selectedIndex = 0;
        this.items = [
            { id: "restart", label: () => "Restart game" },
            { id: "music", label: () => this.isMusicPlaying() ? "Disable music" : "Enable music" },
        ];

        // Ecoute clavier unique
        document.addEventListener("keydown", (e) => this.handleKeyPress(e));
    }

    /**
     * 
     * @param {*} e 
     */
    handleKeyPress(e){
        // Ouvrir / fermer le menu
        if (e.code === "Escape"){
            e.preventDefault();
            this.toggleMenu();
            return;
        }

        // Navigation uniquement quand le menu est ouvert
        if (!this.menuOpen) return;

        switch (e.code) {
            case "ArrowUp":
            case "KeyW":
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
                break;
            case "ArrowDown":
            case "KeyS":
                e.preventDefault();
                this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
                break;
            case "Enter":
            case "Space":
                e.preventDefault();
                this.activateCurrent();
                break;
            case "KeyM":
                e.preventDefault();
                this.onToggleMusic();
                break;
            default:
                break;
        }
    }

    /**
     * 

     */
    toggleMenu(){
        this.menuOpen = !this.menuOpen;
        // Reset du curseur quand on rouvre
        if (this.menuOpen) this.selectedIndex = 0;
    }

    /**
     * 
     * @param {*} ctx 
     */
    draw(ctx){
        if (this.menuOpen) this.drawMenu(ctx);
    }

    /**
     * 
     * @param {*} ctx 
     */
    drawMenu(ctx){
        const { width, height } = ctx.canvas;

        // Fond semi-transparent sur tout l'écran
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, width, height);

        // Centrer le texte
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Titre du menu
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Menu", width / 2, height / 2 - 90);

        // Options du menu
        const baseY = height / 2 - 20;
        const lineHeight = 36;
        ctx.font = "20px Arial";
        this.items.forEach((item, idx) => {
            const y = baseY + idx * lineHeight;
            const label = typeof item.label === "function" ? item.label() : String(item.label);

            // Surlignage de l'option sélectionnée
            if (idx === this.selectedIndex) {
                // Fond arrondi discret
                const padX = 14;
                const padY = 8;
                const text = label;
                const textWidth = ctx.measureText(text).width;
                const x = width / 2;
                ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
                // rectangle centré
                ctx.fillRect(x - textWidth / 2 - padX, y - padY - 10, textWidth + padX * 2, padY * 2 + 20);
                ctx.fillStyle = "#FFD54F"; // jaune pour le texte sélectionné
                ctx.fillText(text, x, y);
            } else {
                ctx.fillStyle = "#EEEEEE";
                ctx.fillText(label, width / 2, y);
            }
        });

        // Instructions
        ctx.font = "16px Arial";
        ctx.fillStyle = "lightgray";
        ctx.fillText("Enter: validate  |  Esc: close  |  ↑↓: navigate", width / 2, height / 2 + 80);

        ctx.restore();
    }

    // Déclenche l'action de l'élément sélectionné
    activateCurrent() {
        const current = this.items[this.selectedIndex];
        if (!current) return;
        switch (current.id) {
            case "restart":
                this.onRestart();
                break;
            case "music":
                this.onToggleMusic();
                break;
            default:
                break;
        }
    }
}