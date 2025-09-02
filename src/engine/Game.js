import { Resources } from "../engine/Resource.js";
import { Sprite } from "../core/Sprite.js";
import { Utils } from "../core/Utils.js";
import { Player } from "../game/Player.js";
import { Input } from "../core/Input.js";
import { AudioGame } from "./AudioGame.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { MapScene } from "../scenes/MapScene.js";
import { Camera } from "./Camera.js";
import { BattleScene } from "../scenes/BattleScene.js";

export class Game {
 constructor(canvas){
    this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
    
            // Dimensions du canvas
            // Math.min retourne le nombre qui a la valeur la plus basse 
            this.canvas.width = Math.min(window.innerWidth * 0.9, 1200);
            this.canvas.height = Math.min(window.innerHeight * 0.9, 675);
            console.log(window.innerWidth);
            console.log(window.innerHeight);
            // Dimensions de la map
            this.mapW = 1597;
            this.mapH = 1277;

            this.battleW = 1536;
            this.battleH = 1024;

            this.resources = new Resources();
    
            // Player setup
            const SPRITE_WIDTH = 512;
            const SPRITE_HEIGHT = 512;
            const START_PLAYER = new Utils(1075, 355);
    
            this.hero = new Sprite(
                this.resources.images.hero,
                0, 0,
                SPRITE_WIDTH, SPRITE_HEIGHT,
                START_PLAYER,
                50, 50,
                0, 2, 2
            );
            

            // Scène de carte pour charger les collisions depuis Tiled
            // On pointe vers le JSON: assets/sprites/mapObstacle.json
            this.mapScene = new MapScene("assets/sprites/mapObstacle.json", this.ctx);
            
            this.gameState = this.mapScene.MapSceneStatus;

            // On donne au joueur un "radar" de collision via mapScene.isColliding
            this.player = new Player(
                this.hero,
                5,
                this.mapW,
                this.mapH,
                (nextRect) => this.mapScene?.isColliding(nextRect)
            );
    
            // Menu
            this.menu = new MenuScene();
    
            // Caméra
            this.camera = new Camera(this.canvas.width, this.canvas.height, this.mapW, this.mapH);
    
            // Input - passer la référence de MapScene pour contrôler la musique
            this.input = new Input(this.player, this.menu, this);
    
            // Musique
            this.song = new AudioGame("assets/audio/musique-20min.mp3");

            // BattleScene gère zones + check + debug
            this.battle = new BattleScene();
            this.battle.loadZones("assets/battles/zones.json");
    
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
        
        
        /**
         * 
         */
        onEnter() {
            const start = () => {
                this.song.play().catch(() => {});
            };
            window.addEventListener("keydown", start, { once: true });
        }
        
        /**
         * 
         */
        update() {
            // Met à jour la position du joueur
            this.player.updatePlayerPosition();
    
            // Caméra suit le joueur
            this.camera.followPlayer(this.player.sprite.position);

            // Détection d'entrée en zone de battle par BattleScene
            if(this.battle.check(this.player.getFeetRect())){
                this.song.stop();
                this.gameState = this.battle.MapSceneStatus;
            }
        }
        
        /**
         * 
         * @param {*} ctx 
         */
        draw(ctx) {
            
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            ctx.save();
            if(this.gameState === "map"){
            this.camera.apply(ctx);
    
            // Dessiner la map
            const map = this.resources.images.map;
            if (map.isLoaded) {
                ctx.drawImage(map.image, 0, 0, this.mapW, this.mapH);
            }

            // Dessine le joueur
            this.hero.draw(ctx);
    
            // Dessin debug des collisions
            this.mapScene?.drawDebug(ctx);

            ctx.restore();
    
            // Afficher les indications de touches
            this.drawControls(ctx);
        }   
        else if(this.gameState === "battle"){
              const bg = this.resources.images.bgBattle;
                 if(bg.isLoaded){
                    this.ctx.drawImage(bg.image, 0, 0, this.canvas.width, this.canvas.height);
                 }
                 console.log()
        }
    
            // Dessine le menu fixe
            this.menu.draw(ctx);
        }
    
        /**
         * Affiche les indications de contrôles sur l'écran
         * 
         */
        drawControls(ctx) {
            ctx.save();
            
            // Style du texte
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.font = "16px Arial";
            ctx.textAlign = "left";
            
            // Position des indications
            const startX = 20;
            const startY = this.canvas.height - 100;
            const lineHeight = 25;
            
            // Liste des contrôles
            const controls = [
                "🎮 Contrôles:",
                "↑↓←→ : Déplacements",
                "Échap : Menu",
                "M : Arrêter/Reprendre musique"
            ];
            
            // Dessiner chaque ligne
            controls.forEach((control, index) => {
                ctx.fillText(control, startX, startY + (index * lineHeight));
            });
            
            ctx.restore();
        }
    
        /**
         * Alterne entre lecture et pause de la musique
         */
        toggleMusic() {
            this.song.toggle();
        }

 }
