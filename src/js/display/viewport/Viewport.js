import {Container} from "pixi.js/dist/browser/pixi.mjs";
import Core from "src/js/core/Core";

export default class Viewport extends Container {

  static get() {
    if (!this._viewport) {
      this._viewport = new Viewport();
    }
    return this._viewport;
  }

  static get boundWidth() {
    return 1920;
  }

  static get boundHeight() {
    return 1080
  }

  static isPortrait() {
    return Core.get().screen.width < Core.get().screen.height * 0.8
  }

  static isLandscape() {
    return !this.isPortrait();
  }

  static get factor() {
    const screen = Core.get().screen
    const isLandscape = Viewport.isLandscape()
    const windowAspectRatio = screen.width / screen.height
    const defaultAspectRatio = Viewport.boundWidth / Viewport.boundHeight

    if (isLandscape) {
      if (windowAspectRatio <= defaultAspectRatio) {
        return screen.width / Viewport.boundWidth
      }
      if (windowAspectRatio > defaultAspectRatio) {
        return screen.height / Viewport.boundHeight
      }
    }
    if (!isLandscape) {
      if (windowAspectRatio >= 1 / defaultAspectRatio) {
        return screen.height / Viewport.boundWidth
      }
      if (windowAspectRatio < 1 / defaultAspectRatio) {
        return screen.width / Viewport.boundHeight
      }
    }
  }

  constructor() {
    super();
    Core.get().renderer.on('resize', this.resize, this);
  }

  resize() {
    // console.log('Viewport resize')
    this.scale.set(Viewport.factor);
    this.x = Core.get().screen.width / 2 - Viewport.boundWidth * Viewport.factor / 2 ;
    this.y = Core.get().screen.height / 2 - Viewport.boundHeight * Viewport.factor / 2 ;
    this.emit('resize')
  }
}
