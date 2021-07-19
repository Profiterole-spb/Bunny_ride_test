import BaseForm from "src/js/display/forms/BaseForm";
import {Container, Sprite, Text} from "pixi.js/dist/browser/pixi.mjs";
import Button from "src/js/display/button/Button";
import {preloadPack} from "src/js/display/preloadPack";
import Core from "src/js/core/Core";

export default class LeadBordForm extends BaseForm {
  getCaption() {
    return 'Таблица рекордов'
  }

  createContent() {
    this.okButton = new Button(
      Core.getTexture(preloadPack.ok_button_active),
      Core.getTexture(preloadPack.ok_button_hover),
      Core.getTexture(preloadPack.ok_button_press),
    )
    this.okButton.position = {x: this.background.width / 2 - this.okButton.width / 2, y: 760}
    this.addChild(this.okButton)
    this.okButton.on('click', () => {
        this.emit('clickOnOkBtn')
      })
    this.okButton.on('touchstart', () => {
      this.emit('clickOnOkBtn')
    })
    this.loading = new Text('Загрузка', Object.assign(this.getCaptionStyle(), {
      align: 'center',
      fontSize: 70
    }))
    this.addChild(this.loading)
    this.loading.position = {x: this.background.width / 2, y: this.background.height / 2}
    this.loading.anchor.set(0.5)

    this.pagination = new Container()

    const idleTexture = Core.getTexture(preloadPack.arrow_btn_active)
    idleTexture.rotate = 12
    const overTexture = Core.getTexture(preloadPack.arrow_btn_hover)
    overTexture.rotate = 12
    const downTexture = Core.getTexture(preloadPack.arrow_btn_press)
    downTexture.rotate = 12
    this.leftBtn = new Button(idleTexture, overTexture, downTexture)
    this.leftBtn.position = {x: 0, y: 0}

    this.rightBtn = new Button(
      Core.getTexture(preloadPack.arrow_btn_active),
      Core.getTexture(preloadPack.arrow_btn_hover),
      Core.getTexture(preloadPack.arrow_btn_press)
    )
    this.rightBtn.position = {x: 530, y: 0}

    this.period = new Text('Period', Object.assign(this.getCaptionStyle(), {
      fill: '#ff6900',
      align: 'center',
      fontSize: 70,
      dropShadow: true,
      dropShadowColor: '#043f71',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 2,
      dropShadowDistance: 6,
    }))
    this.period.anchor.set(0.5)
    this.period.position = {x: 300, y: 30}

    this.pagination.addChild(this.period)

    this.pagination.addChild(this.leftBtn, this.rightBtn)
    this.pagination.position = {x: 82, y: 110}
    this.addChild(this.pagination)

    this.recordsContainer = new Container()
    this.addChild(this.recordsContainer)
    this.recordsContainer.position = {x: 28, y: 180}
  }

  setRecords(records, period) {
    if (this.recordsContainer.children) {
      this.recordsContainer.children.forEach(c => c.destroy())
    }
    this.period.text = period
    if (!records) records = new Array(10).fill({name:'-', score: '-'});
    if (records) {
      records.forEach(((r, index) => {
        let texture
        let fill
        let scoreTexture
        switch (index) {
          case 0:
            texture = Core.getTexture(preloadPack.place_1)
            scoreTexture = Core.getTexture(preloadPack.highleader_scores_plate)
            fill = '#c16000'
            break;
          case 1:
            texture = Core.getTexture(preloadPack.place_2)
            scoreTexture = Core.getTexture(preloadPack.highleader_scores_plate)
            fill = '#205caf'
            break;
          case 2:
            texture = Core.getTexture(preloadPack.place_3)
            scoreTexture = Core.getTexture(preloadPack.highleader_scores_plate)
            fill = '#8e2107'
            break;
          default:
            texture = Core.getTexture(preloadPack.midleader_name_plate)
            scoreTexture = Core.getTexture(preloadPack.midleader_scores_plate)
            fill = '#000000'
        }
        const nameContainer = new Sprite(texture)
        const scoreContainer = new Sprite(scoreTexture)
        this.recordsContainer.addChild(nameContainer, scoreContainer)
        const name = new Text(r.name, Object.assign(this.getCaptionStyle(), {
          fill,
          fontSize: 30,
        }))
        name.anchor.set(0, 0.5)

        const score = new Text(r.score, Object.assign(this.getCaptionStyle(), {
          fill,
          fontSize: 30,
        }))
        score.anchor.set(0.5)
        if (index < 3) {
          name.position = {x: 96, y: nameContainer.height / 2}
          nameContainer.position = {x: 0, y: (nameContainer.height + 5) * index}
          scoreContainer.position = {x: nameContainer.x + nameContainer.width + 10, y: (nameContainer.height + 5) * index + 14}
        } else {
          name.position = {x: 20, y: nameContainer.height / 2}
          nameContainer.position = {x: 76, y: 260 + (nameContainer.height + 5) * (index - 3)}
          scoreContainer.position = {x: nameContainer.x + nameContainer.width + 10, y: 260 + (nameContainer.height + 5) * (index- 3)}

          const count = new Text(`${index + 1}`, Object.assign(this.getCaptionStyle(), {
            fill,
            fontSize: 40,
          }))
          this.recordsContainer.addChild(count)
          count.anchor.set(0.5)
          count.position = {x: 40, y: nameContainer.y + nameContainer.height / 2}
        }

        nameContainer.addChild(name)
        scoreContainer.addChild(score)
        score.position = {x: scoreContainer.width / 2, y: scoreContainer.height / 2}
      }))
    }
  }


}
