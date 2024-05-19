/* global Phaser */
// Copyright (c) 2024 QUINN DAVEY MOHER.
//
// Created by me
// This is the Game Scene

class GameScene extends Phaser.Scene {
  // Creates alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1; // Get number between 1 and 1920
    let alienXVelocity = Math.floor(Math.random() * 50) + 1; // Get a number between 1 and 50
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1; // 50% chance of getting a positive or negative value
    const anAlien = this.physics.add.sprite(alienXLocation, 100, 'alien').setScale(0.5); // Scale the alien down to 50%
    anAlien.body.velocity.y = 200;
    anAlien.body.velocity.x = alienXVelocity;
    anAlien.setBodySize(anAlien.width * 0.5, anAlien.height * 0.5); // Adjust the hitbox size
    this.alienGroup.add(anAlien);
  }

  constructor() {
    super({ key: 'gameScene' });
    // Variables
    this.xvel = 0;
    this.background = null;
    this.ship = null;
    this.fireMissileFlag = false;
    this.autoFire = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' };

    this.gameOverText = null;
    this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' };

    // Sets the background color of the title scene
    this.init = function (data) {
      this.cameras.main.setBackgroundColor('#ffffff');
    };
  }

  // Prints Title Scene in the console
  preload() {
    console.log('Game Scene');

    // Images
    this.load.image('starBackground', 'assets/starBackground.png');
    this.load.image('ship', 'assets/spaceShip.png');
    this.load.image('missile', 'assets/missile.png');
    this.load.image('alien', 'assets/alien.png');
    // Sounds
    this.load.audio('laser', 'assets/laser1.wav');
    this.load.audio('explosion', 'assets/barrelExploding.wav');
    this.load.audio('bomb', 'assets/bomb.wav');
  }

  create(data) {
    // Makes the background
    this.background = this.add.image(0, 0, 'starBackground').setScale(2.0);
    this.background.setOrigin(0, 0);

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle);

    // Spawns the ship on the background
    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship');
    // Adds ship to group
    this.missileGroup = this.physics.add.group();

    // Adds alien to group
    this.alienGroup = this.add.group();
    this.createAlien();

    // Collision between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy();
      missileCollide.destroy();
      this.sound.play('explosion');
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score.toString());
      this.createAlien();
      this.createAlien();
    }.bind(this));

    // Collision between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('bomb');
      this.physics.pause();
      alienCollide.destroy();
      shipCollide.destroy();
      this.gameOverText = this.add.text(1920 / 2, (1080 / 2) + 100, 'Game Over!\nClick to play again.', this.gameOverTextStyle);
      this.gameOverText.setOrigin(0.5);
      this.gameOverText.setInteractive({ useHandCursor: true });
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'));
    }.bind(this));

    // Set up auto-fire
    this.input.keyboard.on('keydown_SHIFT', function () {
      this.autoFire = true;
    }, this);

    this.input.keyboard.on('keyup_SHIFT', function () {
      this.autoFire = false;
    }, this);

    this.time.addEvent({
      delay: 200, // Time between shots in milliseconds
      callback: this.autoFireMissile,
      callbackScope: this,
      loop: true
    });
  }

  autoFireMissile() {
    if (this.autoFire) {
      this.fireMissile();
    }
  }

  fireMissile() {
    if (!this.fireMissileFlag) {
      // Fires missile
      this.fireMissileFlag = true;
      // Makes a missile on the ship
      const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
      this.missileGroup.add(aNewMissile);
      this.sound.play('laser');
    }
  }

  update(time, delta) {
    const clampNumber = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    // Called 60 times a second, hopefully!
    // Constant variable for the left arrow key
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyLeftObj2 = this.input.keyboard.addKey('A');
    // Constant variable for the right arrow key
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keyRightObj2 = this.input.keyboard.addKey('D');
    // Constant variable for the spacebar
    const keySpaceObj = this.input.keyboard.addKey('SPACE');
    // Checks if keys are down
    if (keyLeftObj.isDown || keyLeftObj2.isDown) {
      // Moves the ship to the left
      this.xvel = clampNumber(this.xvel - 1, -9, 9);
    } else if (keyRightObj.isDown || keyRightObj2.isDown) {
      // Moves the ship to the right
      this.xvel = clampNumber(this.xvel + 1, -9, 9);
    } else {
      // Stops the ship from moving
      this.xvel = clampNumber(this.xvel * 0.9, -9, 9);
    }
    // Wrapping
    if (this.ship.x < 0) {
      this.ship.x = 1920;
    } else if (this.ship.x > 1920) {
      this.ship.x = 0;
    }
    this.ship.x += this.xvel;
    this.ship.rotation = Phaser.Math.DegToRad(this.xvel * 2);
    // Checks if the spacebar is being pressed
    if (keySpaceObj.isDown) {
      if (!this.fireMissileFlag) {
        this.fireMissile();
      }
    }
    if (keySpaceObj.isUp) {
      this.fireMissileFlag = false;
    }
    this.missileGroup.children.each(function (item) {
      item.y -= 15;
      if (item.y < 0) {
        item.destroy();
      }
    });
  }
}

export default GameScene;
