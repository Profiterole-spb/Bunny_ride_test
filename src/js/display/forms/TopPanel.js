import {Container, Sprite, Text} from "pixi.js/dist/browser/pixi.mjs";
import Button from "src/js/display/button/Button";
import Core from "src/js/core/Core";
import {preloadPack} from "src/js/display/preloadPack";
import Viewport from "src/js/display/viewport/Viewport";

export default class TopPanel extends Container {
  constructor() {
    super();
    this.fullScreenBnt = new Button(
      Core.getTexture(preloadPack.btn_fullscreen_active),
      Core.getTexture(preloadPack.btn_fullscreen_hover),
      Core.getTexture(preloadPack.btn_fullscreen_press)
    )
    this.addChild(this.fullScreenBnt)

    this.soundBtn = new Button(
      Core.getTexture(preloadPack.btn_sound_0_active),
      Core.getTexture(preloadPack.btn_sound_0_hover),
      Core.getTexture(preloadPack.btn_sound_0_press),
    )
    this.addChild(this.soundBtn)

    this.pauseBtn = new Button(
      Core.getTexture(preloadPack.btn_pause_active),
      Core.getTexture(preloadPack.btn_pause_hover),
      Core.getTexture(preloadPack.btn_pause_press),
    )
    this.addChild(this.pauseBtn)

    this.scoreContainer = new Sprite(Core.getTexture(preloadPack.coin_score_plate))
    this.addChild(this.scoreContainer)
    this.coinIcon = new Sprite(Core.getTexture(preloadPack.collect_coin_icon))
    this.coinIcon.anchor.set(0.5)
    this.coinIcon.y = this.scoreContainer.height / 2
    this.scoreContainer.addChild(this.coinIcon)
    this.score = new Text('0', {
      fontFamily: 'Zubilo Black',
      fontSize: 40,
      fill: '#ffffff',
      align: 'center'
    })
    this.score.anchor.set(0.5)
    this.scoreContainer.addChild(this.score)
    this.score.position = {x: this.scoreContainer.width / 2, y: this.scoreContainer.height / 2}
  }

  resize() {
    const screen = Core.get().screen
    const factor = Viewport.factor
    this.pauseBtn.x = screen.width / factor  - this.pauseBtn.width - 60
    this.soundBtn.x = this.pauseBtn.x - this.soundBtn.width - 40
    this.fullScreenBnt.x = this.soundBtn.x - this.fullScreenBnt.width - 40
    this.scoreContainer.x = 100
    this.scoreContainer.y = 30
    this.y = 40 * factor
    this.scale.set(factor)
  }
}
