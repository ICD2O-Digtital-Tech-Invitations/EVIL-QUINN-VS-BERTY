class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene' })

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
    // Load title scene background image
    this.load.image('titleSceneBackground', 'assets/Titlescreen.png')
  }
  
  create (data) {
    // Display title scene background image
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(1.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
  }

  update (time, delta){
    // Switch to the menu scene after 11 seconds
    if (time > 11000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene