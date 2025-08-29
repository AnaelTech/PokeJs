import { Input } from "./src/core/Input.js";
import { Sprite } from "./src/core/Sprite.js";
import { Utils } from "./src/core/Utils.js";
import { resources } from "./src/engine/Resource.js";
import { Player } from "./src/game/Player.js";

// Select element canvas in the html where id is myCanvas
const canvas = document.querySelector("#myCanvas");

// Add size width of the window
//canvas.width = window.innerWidth;
canvas.width = 1597;

// Add size height of the window
//canvas.height = window.innerHeight;
canvas.height = 1277;

// 1024 / 2
const SPRITE_WIDTH = 512;
const SPRITE_HEIGHT = 512;

const START_PLAYER = new Utils(1075, 355);

// Create a object in 2 dimensional 
const ctx = canvas.getContext("2d");

//Test Console log to see if position is good
const hero = new Sprite(
    resources.images.hero,  // image
    0,                      // posX (pas utilisé pour l'instant)
    0,                      // posY (pas utilisé pour l'instant)
    SPRITE_WIDTH,           // sWidth (taille frame source)
    SPRITE_HEIGHT,          // sHeight (taille frame source)
    START_PLAYER,           // position (objet Utils)
    50,                     // width (taille affichage)
    50,                     // height (taille affichage)
    0,                      // frame (index)
    2,                      // hFrame (colonnes)
    2                       // vFrame (lignes)
);

const draw = () => {
     ctx.clearRect(
         0,
         0,
         canvas.width,
         canvas.height
     );


    const map = resources.images.map;

    if(map.isLoaded){
        ctx.drawImage(map.image, 0, 0)
     }

     hero.draw(ctx);
}

const player = new Player(hero, 5, canvas.width, canvas.height);
const movePlayer = new Input(player);
const song = new Audio("assets/audio/song-theme.mp3"); 
song.loop = true;

const startAudioOnce = () => {
    song.play().catch(() => {
    });
};
window.addEventListener("keydown", startAudioOnce, { once: true });

function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    draw()
}

gameLoop();
