
import './styles/main.css';
import {preloadPack} from './js/display/preloadPack';
import Core from './js/core/Core';
import IntroForm from "src/js/display/forms/IntroForm";
import LeadBordForm from "src/js/display/forms/LeadBordForm";
import Model from "src/js/display/Model";
import Viewport from "src/js/display/viewport/Viewport";
import Game from "src/js/display/Game";
import TopPanel from "src/js/display/forms/TopPanel";

const core = Core.get();

console.log('core is created', core);
document.body.appendChild(core.view);
await Core.load(Object.values(preloadPack).flat())

core.renderer.backgroundColor = 0x6f9aca;
console.log('Load complete')
const viewport = Viewport.get()

const game = new Game()
core.stage.addChild(game)

core.stage.addChild(viewport)

const introForm = new IntroForm()

const topPanel = new TopPanel()
core.stage.addChild(topPanel)

introForm.on('clickOnPlayBtn', () => {
  console.log('RUN')
  introForm.visible = false
  game.start()
})
introForm.on('clickOnRecordsBtn', () => {
  console.log('SHOW TABLE')
  introForm.visible = false
  leadBoardForm.visible = true
})

const leadBoardForm = new LeadBordForm()
leadBoardForm.visible = false
leadBoardForm.setRecords(Model.getAllTimeRecords(), 'За все время')
leadBoardForm.on('clickOnOkBtn', () => {
  leadBoardForm.visible = false
  introForm.visible = true
})

topPanel.pauseBtn.on('click', () => {
  game.pause()
})

topPanel.pauseBtn.on('touchstart', () => {
  game.pause()
})

viewport.addChild(introForm, leadBoardForm)
viewport.on('resize', () => {
  introForm.x = Viewport.boundWidth / 2 - introForm.width / 2
  introForm.y = Viewport.boundHeight / 2 - introForm.height / 2
  leadBoardForm.x = Viewport.boundWidth / 2 - leadBoardForm.width / 2
  leadBoardForm.y = Viewport.boundHeight / 2 - leadBoardForm.height / 2
  game.resize()
  topPanel.resize()
})

core.resize()
