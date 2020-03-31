import 'phaser';
import CreateTilesetScene from './CreateTilesetScene';

const config = {
    type: Phaser.AUTO,
    transparent: true,
    backgroundColor: "rgba(255,110,110,0)",
    width: 1400,
    height: 560,
    scene: CreateTilesetScene,
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(config);
