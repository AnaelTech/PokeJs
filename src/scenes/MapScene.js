import { resources } from "../engine/Resource.js";
import { Sprite } from "../core/Sprite.js";
import { Utils } from "../core/Utils.js";
import { Player } from "../game/Player.js";
import { Input } from "../core/Input.js";

export class MapScene {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");

		// Sizing (could be moved to a config later)
		this.canvas.width = 1597;
		this.canvas.height = 1277;

		// Player setup (moved from game.js)
		const SPRITE_WIDTH = 512;
		const SPRITE_HEIGHT = 512;
		const START_PLAYER = new Utils(1075, 355);

		this.hero = new Sprite(
			resources.images.hero,
			0,
			0,
			SPRITE_WIDTH,
			SPRITE_HEIGHT,
			START_PLAYER,
			50,
			50,
			0,
			2,
			2
		);

		this.player = new Player(this.hero, 5, this.canvas.width, this.canvas.height);
		this.input = new Input();

		// Music
		this.song = new Audio("assets/audio/song-theme.mp3");
		this.song.loop = true;
		this._startAudioOnce = () => {
			this.song.play().catch(() => {});
		};
	}

	onEnter() {
		window.addEventListener("keydown", this._startAudioOnce, { once: true });
	}

	onExit() {
		// Pause music and cleanup listeners if needed
		try { this.song && this.song.pause(); } catch {}
		this.input && this.input.dispose();
	}

	draw(ctx) {
		const map = resources.images.map;
		if (map.isLoaded) {
			ctx.drawImage(map.image, 0, 0);
		}
		this.hero.draw(ctx);
	}
}
