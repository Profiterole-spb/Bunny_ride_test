import BaseForm from "src/js/display/forms/BaseForm";
import {Sprite, Text} from "pixi.js/dist/browser/pixi.mjs";
import Button from "src/js/display/button/Button";
import {preloadPack} from "src/js/display/preloadPack";
import Core from "src/js/core/Core";

export default class IntroForm extends BaseForm {
  getCaption() {
    return 'Твои рекорды'
  }

  createContent() {
    this.yourRecord = new Text('Рекорд:\n383', Object.assign(this.getCaptionStyle(), {
      fill: '#00fd17',
      align: 'center',
      fontSize: 70
    }))
    this.yourRecord.anchor.set(0.5)
    this.yourRecord.position = {x: this.background.width / 2, y: 300}
    this.addChild(this.yourRecord)

    this.lbButton = new Button(
      Core.getTexture(preloadPack.leadboard_button_active),
      Core.getTexture(preloadPack.leadboard_button_hover),
      Core.getTexture(preloadPack.leadboard_button_press),
    )
    this.lbButton.position = {x: 40, y: 660}
    this.addChild(this.lbButton)
    this.playButton = new Button(
      Core.getTexture(preloadPack.play_button_active),
      Core.getTexture(preloadPack.play_button_hover),
      Core.getTexture(preloadPack.play_button_press),
    )
    this.playButton.position = {x: 380, y: 660}
    this.addChild(this.playButton)

    this.lbButton.on('touchstart', () => {
      this.emit('clickOnRecordsBtn')
    })
    this.lbButton.on('click', () => {
      this.emit('clickOnRecordsBtn')
    })
    this.playButton.on('touchstart', () => {
      this.emit('clickOnPlayBtn')
    })
    this.playButton.on('click', () => {
      this.emit('clickOnPlayBtn')
    })

    this.userBar = new Sprite(Core.getTexture(preloadPack.user_name_bar))
    this.userBar.anchor.set(0.5, 0.5)
    this.userBar.position = {x: this.background.width / 2, y: 560}
    this.addChild(this.userBar)

    this.userName = new Text('ИГРОК_1', Object.assign(this.getCaptionStyle(), {
      fill: '#ffffff',
      align: 'left',
      fontSize: 50
    }))
    this.userName.anchor.set(0.5)
    this.userBar.addChild(this.userName)
  }
}
