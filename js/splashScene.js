class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'splashScene' })
  }

  init(data) {
    // this sets the background color of the splash scene
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // this function puts Splash Scene into the console and loads the splash scene image into a key to be used later
  preload() {
    console.log('Splash Scene')
    this.load.video('splashSceneBackground', './assets/IMHSplashScene.mp4')
  }

  create(data) {
    // this is for my splash scene picture and to make it centered in the middle
    this.splashSceneBackgroundImage = this.add.video(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.play(false);
    // screen dimensions for x 
    this.splashSceneBackgroundImage.x = 1920 / 2
    // screen dimensions on y 
    this.splashSceneBackgroundImage.y = 1080 / 2
  }
  // when the game updates every few hundred miliseconds it runs this function
  update(time, delta) {
    if (time > 4850) {
      this.scene.switch('titleScene')
    }
  }
}

export default SplashScene