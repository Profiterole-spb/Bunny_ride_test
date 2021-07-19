import {Container, Sprite} from "pixi.js/dist/browser/pixi.mjs";

export default class Button extends Container{
  constructor(idleTexture, overTexture, downTexture) {
    super();
    this.interactive = true
    this.buttonMode = true
    this.sprite = new Sprite(idleTexture)
    this.addChild(this.sprite)
    this.on('mouseover', () => {
      this.sprite.texture = overTexture
    })
    this.on('mouseout', () => {
      this.sprite.texture = idleTexture
    })
    this.on('pointerdown', () => {
      this.sprite.texture = downTexture
    })
    this.on('pointerup', () => {
      this.sprite.texture = idleTexture
    })
  }
}
