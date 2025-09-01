import { MapScene } from "./src/scenes/MapScene.js";

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const scene = new MapScene(canvas);
if (scene.onEnter) scene.onEnter();

function loop() {
	if(scene.update) scene.update();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene.draw(ctx);
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);




