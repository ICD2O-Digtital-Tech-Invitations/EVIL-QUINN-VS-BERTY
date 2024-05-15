// made by Quinn Moher in 2024

class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'gameScene' })

        this.background = null
        this.ship = null
    }

    // sets the background color of the title scene
    init (data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    // prints Title Scene in the console
    // Load images for the game
    preload () {
        console.log('Game Scene')

        // Load background and spaceship images
        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
    }

    // Create background and spaceship sprites
    create (data){
        this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)

        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
    }

    // Update function for player movement
    update (time, delta){
        // called 60 times a second, hopefully!

        // Define left and right keys
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        // Check and handle left key press
        if (keyLeftObj.isDown === true) {
            this.ship.x = this.ship.x - 5
            if (this.ship.x < 0) {
                this.ship.x = 1920
            }
        }
        // Check and handle right key press
        if (keyRightObj.isDown === true) {
            this.ship.x = this.ship.x + 5
            if (this.ship.x > 1920) {
                this.ship.x = 0
            }
        }
    }
}

export default GameScene