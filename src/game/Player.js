export class Player {
 constructor(sprite, speed = 5, canvaW = null, canvaH = null){
    this.sprite = sprite;
    this.speed = speed;
    this.canvaW = canvaW;
    this.canvaH = canvaH;
 }  

 moveUp(){
    this.sprite.position.y -= this.speed;
    this.updatePlayerPosition();
    this.sprite.frame = 1;
 }

 moveDown(){
    this.sprite.position.y += this.speed;
    this.updatePlayerPosition();
    this.sprite.frame = 0;
 }

 moveLeft(){
    this.sprite.position.x -= this.speed;
    this.updatePlayerPosition();
    this.sprite.frame = 3;
 }

 moveRight(){   
    this.sprite.position.x += this.speed;
    this.updatePlayerPosition();
    this.sprite.frame = 2;
 }

 // 
 updatePlayerPosition(){
   
   //Empeche sortie à gauche
   if(this.sprite.position.x < 0){
      this.sprite.position.x = 0;
   }

   //Empeche sortie en haut
   if(this.sprite.position.y < 0){
      this.sprite.position.y = 0;
   }

   //Empeche sortie à droite
   if(this.sprite.position.x + this.sprite.width > this.canvaW){
      this.sprite.position.x = this.canvaW - this.sprite.width;
   }

   //Empeche sortie en bas
   if(this.sprite.position.y + this.sprite.height > this.canvaH){
      this.sprite.position.y = this.canvaH - this.sprite.height;
   }
 }

}