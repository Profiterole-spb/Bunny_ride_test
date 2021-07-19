import {Container, Sprite, Ticker, TilingSprite} from "pixi.js/dist/browser/pixi.mjs";
import Core from "src/js/core/Core";
import {preloadPack} from "src/js/display/preloadPack";
import Viewport from "src/js/display/viewport/Viewport";

export default class Game extends Container {
  constructor() {
    super();
    this.floor = new TilingSprite(Core.getTexture(preloadPack.floor), 2000, 400)
    this.floor.angle = 8
    this.addChild(this.floor)

    this.bunny = new Sprite(Core.getTexture(preloadPack.bunny))
    this.addChild(this.bunny)
    this.bunny.anchor.set(0.5, 1)
    this.bunny.x = 250
    this.bunny.y = -230
    this.bunny.angle = 9
  }

  start() {
    this.ticker = new Ticker()
    this.ticker.add((delta) => {
      this.floor.tilePosition.x -= 1 * this.ticker.elapsedMS
      if (this.floor.tilePosition.x <= -this.floor.tilePosition.width) this.floor.tilePosition.x = 0
    })
    this.ticker.start()
  }

  resize() {
    const screen = Core.get().screen
    const factor = Viewport.factor
    this.scale.set(factor)
    this.y = screen.height
    this.floor.y = -280
  }

  pause() {
    this._pause = !this._pause
    this._pause ? this.ticker.stop() : this.ticker.start()
  }
}
