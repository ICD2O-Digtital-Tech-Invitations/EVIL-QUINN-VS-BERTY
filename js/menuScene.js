class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
    // variables
    this.menuSceneBackgroundImage = null;
    this.startButton = null;
    this.audio = null;
    this.popup = null; // New variable for the popup menu
  }

  // sets the background color of the title scene
  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff');
  }

  // prints Title Scene in the console
  preload() {
    console.log('Menu Scene');
    this.load.image('menuSceneBackground', 'assets/aliens_screen_image2.jpg');
    this.load.image('startButton', 'assets/start.png');
    this.load.audio('menuMusic', 'assets/Metroid song.wav');
  }

  create(data) {
    // sets background
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.75);
    this.menuSceneBackgroundImage.setOrigin(0.5, 0.5);
    this.menuSceneBackgroundImage.setPosition(1920 / 2, 1080 / 2);

    // sets the start button and adds functionality
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton');
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on('pointerdown', () => this.clickButton());

    // setup and play background music
    this.audio = this.sound.add('menuMusic');
    this.audio.loop = true;
    this.audio.volume = 1;
    this.audio.play();

    // Create the popup menu
    this.createPopUpMenu();
  }

  update(time, delta) {}

  // Create the pop-up menu
  createPopUpMenu() {
    this.popup = this.add.container(1920 / 2, 1080 / 2); // Position the popup in the center
    const popupBackground = this.add.graphics().fillStyle(0xffffff, 1).fillRect(-150, -75, 300, 150);
    this.popup.add(popupBackground);

    // Add text to the popup menu
    const text = this.add.text(-120, -50, 'Controls:\nA/D or Arrow keys to move\nSpacebar to shoot', {
      font: '24px Arial',
      fill: '#000000',
      align: 'center',
      wordWrap: { width: 240, useAdvancedWrap: true },
    });
    this.popup.add(text);

    // Hide the popup initially
    this.popup.setVisible(false);
  }

  // Show the popup menu
  showPopUpMenu() {
    this.popup.setVisible(true);
  }

  // Hide the popup menu
  hidePopUpMenu() {
    this.popup.setVisible(false);
  }

  // when the button is clicked it switches to the game scene
  clickButton() {
    this.stopMusic();
    this.hidePopUpMenu(); // Hide the popup before switching scenes
    this.scene.start('gameScene');
  }

  // stops the background music
  stopMusic() {
    if (this.audio) {
      this.audio.stop();
    }
  }
}

export default MenuScene;
