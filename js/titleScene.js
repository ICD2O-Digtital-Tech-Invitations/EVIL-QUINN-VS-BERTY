class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })
    // variables
    this.titleSceneBackgroundImage = null
    this.titleScenetext = null
    this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
  }
  // sets the background color of the title scene
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // prints Title Scene in the console
  preload () {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', 'assets/aliens_screen_image.jpg')
  }
  
  create (data) {
    //sets background of title screen
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
    // sets text of title screen
    this.titleScenetext = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Raiders', this.titleSceneTextStyle).setOrigin(0.5)
  }

  update (time, delta){
    //when the run time hits 7 seconds switch to menu scene
  if (time > 7000) {
    this.scene.switch('menuScene')
    }
  }
}

export default TitleScene