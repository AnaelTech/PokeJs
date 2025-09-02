import { Utils } from "./Utils.js";

// 
export class Sprite {
    constructor(
        image, // img path
        posX, 
        posY, 
        sWidth, // frame Width
        sHeight, // frame Height
        position,
        width, // frame Width sur la map
        height, // frame Height sur la map
        frame, // index
        hFrame,
        vFrame,
        frameMap
    )
    {
        this.image = image;
        this.posX = posX;
        this.posY = posY;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.position = position ?? new Utils(0,0);
        this.width = width;
        this.height = height;
        this.frame = frame;
        this.frameMap = new Map(); 
        this.vFrame = vFrame;
        this.hFrame = hFrame;
        this.buildFrameMap();
    }

    /**
     * 
     */
    buildFrameMap(){
        let frameCount = 0;
        for (let v = 0; v < this.vFrame; v++){
            for(let h = 0; h < this.hFrame; h++){
                this.frameMap.set(
                    frameCount,
                    new Utils(h, v)
                )
                frameCount++;
                console.log(this.frameMap);
            }
        }
    }

    /**
     * 
     * @param {*} ctx 
     */
    draw(ctx){
        const imageResource = this.image; // C'est l'objet avec {image, isLoaded}

        const framePos = this.frameMap.get(this.frame);
        
        // Calcule les coordonnées
        const sourceX = framePos.x * this.sWidth;
        const sourceY = framePos.y * this.sHeight;

        if(imageResource.isLoaded){
            ctx.drawImage(imageResource.image, sourceX, sourceY, this.sWidth, this.sHeight, this.position.x, this.position.y, this.width, this.height);
        }
    }
}