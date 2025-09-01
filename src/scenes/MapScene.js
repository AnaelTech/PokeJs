import { resources } from "../engine/Resource.js";
import { Sprite } from "../core/Sprite.js";
import { Utils } from "../core/Utils.js";
import { Player } from "../game/Player.js";
import { Input } from "../core/Input.js";
import { AudioGame } from "../engine/AudioGame.js";
import { MenuScene } from "./MenuScene.js";
import { Camera } from "../engine/Camera.js";

export class MapScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // Dimensions du canvas (ratio 16:9 ou dimensions fixes)
		// Math.min retourne le nombre qui a la valeur la plus basse 
        this.canvas.width = Math.min(window.innerWidth * 0.9, 1200);
        this.canvas.height = Math.min(window.innerHeight * 0.9, 675);

        // Dimensions de la map
        this.mapW = 1597;
        this.mapH = 1277;

        // Player setup
        const SPRITE_WIDTH = 512;
        const SPRITE_HEIGHT = 512;
        const START_PLAYER = new Utils(1075, 355);

        this.hero = new Sprite(
            resources.images.hero,
            0, 0,
            SPRITE_WIDTH, SPRITE_HEIGHT,
            START_PLAYER,
            50, 50,
            0, 2, 2
        );

        // Player
        this.player = new Player(this.hero, 5, this.mapW, this.mapH);

        // Menu
        this.menu = new MenuScene();

        // Caméra
        this.camera = new Camera(this.canvas.width, this.canvas.height, this.mapW, this.mapH);

        // Input
        this.input = new Input(this.player, this.menu);

        // Musique
        this.song = new AudioGame("assets/audio/musique-20min.mp3");

        // Gestion du resize
        window.addEventListener("resize", () => {
            this.canvas.width = Math.min(window.innerWidth * 0.9, 1200);
            this.canvas.height = Math.min(window.innerHeight * 0.9, 675);
            this.camera.canvaW = this.canvas.width;
            this.camera.canvaH = this.canvas.height;
        });

        // Calcul offset pour centrer la map si l’écran > map
		// Math.max retoune le nombre avec la valeur la plus haute
        this.offsetX = Math.max((this.canvas.width - this.mapW) / 2, 0);
        this.offsetY = Math.max((this.canvas.height - this.mapH) / 2, 0);
    }

    onEnter() {
        const start = () => this.song.play().catch(() => {});
        window.addEventListener("keydown", start, { once: true });
    }

    update() {
        // Met à jour la position du joueur
        this.player.updatePlayerPosition();

        // Caméra suit le joueur
        this.camera.followPlayer(this.player.sprite.position);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        this.camera.apply(ctx);

        // Dessiner la map
        const map = resources.images.map;
        if (map.isLoaded) {
            ctx.drawImage(map.image, 0, 0, this.mapW, this.mapH);
        }

        // Dessine le joueur
        this.hero.draw(ctx);

        ctx.restore();

        // Dessine le menu fixe
        this.menu.draw(ctx);
    }

    onExit() {
        try { this.song && this.song.pause(); } catch {}
        this.input && this.input.dispose();
    }
}
