// Class resources is for load all img we need for the explorer because if we don't load img the explorer can crash
class Resources {
    constructor(){
        this.toLoad = {
            map: "assets/sprites/map.png",
            hero: "assets/sprites/hero.png"
        };

        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }    
        })
    }
}

export const resources = new Resources();