import {Container, Sprite, Text} from "pixi.js/dist/browser/pixi.mjs";
import {preloadPack} from "src/js/display/preloadPack";
import Core from "src/js/core/Core";

export default class BaseForm extends Container{

  getCaption() {
    return 'CAPTION'
  }

  getCaptionStyle() {
    return {
      fontFamily: 'Zubilo Black',
      fontSize: 50,
      fill: '#013c71'
    }
  }

  constructor() {
    super();
    this.background = new Sprite(Core.getTexture(preloadPack.info_plate_big))
    this.addChild(this.background)
    this.header = new Sprite(Core.getTexture(preloadPack.header_info_plate))
    this.addChild(this.header)
    this.header.anchor.set(0.5, 0.5)
    this.header.position = {x: this.background.width / 2, y: 56}
    this.caption = new Text(this.getCaption(), this.getCaptionStyle())
    this.caption.anchor.set(0.5, 0.58)
    this.header.addChild(this.caption)
    this.createContent()
  }

  createContent() {
    this.temple = new Text('CONTENT')
    this.temple.anchor.set(0.5, 0.5)
    this.temple.position = {x: this.background.width / 2, y: this.background.height / 2}
    this.addChild(this.temple)
  }
}
