import 'phaser';
import GameScene from './GameScene';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: GameScene,
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(config);
