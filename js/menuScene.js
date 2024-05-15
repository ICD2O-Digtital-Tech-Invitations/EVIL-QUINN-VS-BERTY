class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: 'menuScene' })

    // Background image variable
    this.menuSceneBackgroundImage = null
    // Start button variable
    this.startButton = null
  }
  // sets the background color of the title scene
  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }
  // prints Menu Scene in the console
  preload () {
    console.log('Menu Scene')
    // Load menu scene background image
    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg')
    // Load start button image
    this.load.image('startButton', 'assets/start.png')
  }

  create (data){
    // Display menu scene background image
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    // Display start button
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
    // Make start button interactive
    this.startButton.setInteractive({ userHandCursor: true})
    // Event listener for start button click
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  update (time, delta){
  }
    // Function to handle start button click
    clickButton () {
      // Transition to the game scene
      this.scene.start('gameScene')
    }
  }  

export default MenuScene