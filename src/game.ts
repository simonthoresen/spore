import 'phaser';
import PlatformScene from './PlatformScene';
import DemoScene from './DemoScene';

const config = {
    type: Phaser.AUTO,
    transparent: true,
    backgroundColor: "rgba(255,110,110,0)",
    width: 1400,
    height: 560,
    scene: DemoScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1000 }
        }
    }
};

const game = new Phaser.Game(config);
