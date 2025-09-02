import { Game } from "./src/engine/Game.js";

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas);
if (game.onEnter) game.onEnter();

function loop() {
	if(game.update) game.update();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	game.draw(ctx);
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// setInterval(()=> {
//     game.draw()
// }, 300)


