import { AudioGame } from "../engine/AudioGame.js";
// Gère les "zones de combat" et la détection d'entrée dedans
// - Charge des zones depuis un JSON simple: { zones: [{ name, x, y, width, height }, ...] }
// - Vérifie si les pieds du joueur entrent dans une zone -> console.log("go battle")
export class BattleScene {
    constructor(ctx) {
        this.zones = [];
        this._lastZoneName = null; // évite de logger en boucle
        this.ctx = this.ctx;
        this.MapSceneStatus = this.MapSceneStatus;
        this.battleSong = new AudioGame("assets/audio/pokemon-battle.mp3");
    }

    // Charge les zones depuis un fichier JSON
    async loadZones(path) {
        try {
            const res = await fetch(path);
            const data = await res.json();
            this.zones = Array.isArray(data.zones) ? data.zones : [];
        } catch (e) {
            console.warn("BattleScene: impossible de charger les zones:", e);
            this.zones = [];
        }
    }

    // Test AABB basique entre la boîte des pieds et une zone
    // https://stackoverflow.com/questions/22512319/what-is-aabb-collision-detection
    static _intersects(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    // Retourne la zone courante si les pieds sont dedans, sinon null
    getCurrentZone(feetRect) {
        if (!this.zones || this.zones.length === 0) return null;
        return this.zones.find(z => BattleScene._intersects(feetRect, z)) || null;
    }

    // À appeler dans update(): log à l'entrée d'une zone (une seule fois)
    check(feetRect) {
        const zone = this.getCurrentZone(feetRect);
        if (zone && this._lastZoneName !== zone.name) {
            this._lastZoneName = zone.name;
            console.log("go battle:", zone.name);
            this.battleSong.play();
            this.MapSceneStatus = "battle";
            return true;
            // Ici combat
        }
        if (!zone) this._lastZoneName = null;
    }
}