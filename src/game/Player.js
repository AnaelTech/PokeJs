export class Player {
 constructor(sprite, speed = 5){
    this.sprite = sprite;
    this.speed = speed;
 }  

 moveUp(){
    this.sprite.position.y -= this.speed;
    this.sprite.frame = 1;
 }

 moveDown(){
    this.sprite.position.y += this.speed;
    this.sprite.frame = 0;
 }

 moveLeft(){
    this.sprite.position.x -= this.speed;
    this.sprite.frame = 3;
 }

 moveRight(){   
    this.sprite.position.x += this.speed;
    this.sprite.frame = 2;
 }

}