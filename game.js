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
const BORDER_WIDTH = 0;
const SPACING_WIDTH = 0;


// const START_PLAYER_POSX = 1075; 
// const START_PLAYER_POSY = 355;

const START_PLAYER = new Utils(1075, 355);

// function spritePositionToImagePosition(row, col) {
//     return {
//         x: (
//             BORDER_WIDTH +
//             col * (SPACING_WIDTH + SPRITE_WIDTH)
//         ),
//         y: (
//             BORDER_WIDTH +
//             row * (SPACING_WIDTH + SPRITE_HEIGHT)
//         )
//     }
// }

// Create a object in 2 dimensional 
const ctx = canvas.getContext("2d");

//let position =  spritePositionToImagePosition(0, 0);

//Test Console log to see if position is good
const heroTest = new Sprite(
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


// TODO: Reutilisable function
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

     heroTest.draw(ctx);
    //  const hero = resources.images.hero;

    //  if(hero.isLoaded){
    //      // postion x: 1070, y:350, w:100, h:100
    //      ctx.drawImage(hero.image, position.x, position.y, SPRITE_WIDTH, SPRITE_HEIGHT, START_PLAYER_POSX, START_PLAYER_POSY, 50, 50);
    //  }
}

const player = new Player(heroTest);
const movePlayer = new Input(player);

setInterval(()=> {
    draw()
}, 300)