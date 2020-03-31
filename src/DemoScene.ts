import Player from "./Player";

export default class DemoScene extends Phaser.Scene
{
    layers: Phaser.GameObjects.TileSprite[] = [];

    constructor() {
        super("DemoScene");
    }

    preload () {
        this.load.image("bg_layer0", "assets/images/background1_4.png");
        this.load.image("bg_layer1", "assets/images/background1_3.png");
        this.load.image("bg_layer2", "assets/images/background1_2.png");
        this.load.image("bg_layer3", "assets/images/background1_1.png");
        this.load.image("bg_layer4", "assets/images/background1_0.png");
        this.load.atlasXML("p1", "assets/atlas/p1.png", "assets/atlas/p1.xml");
    }

    create() {
        console.log("canvas: " + this.game.canvas.width + " x " + this.game.canvas.height);
        for (let i = 0; i < 5; ++i) {
            let image = "bg_layer" + i;
            let sprite = this.add.tileSprite(
                0,
                0,
                this.game.canvas.width,
                this.game.canvas.height,
                image
            );
            let imageHeight = this.game.textures.get(image).getSourceImage().height;
            console.log("imageHeight: " + imageHeight);
            sprite.setTileScale(this.game.canvas.height / imageHeight);
            sprite.setTilePosition(0, 0);
            sprite.setScrollFactor(0);

            sprite.setOrigin(0, 0); 
            this.layers.push(sprite);
        }

        this.player = new Player(this, 100, 100);
        this.player.sprite.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player.sprite);

        this.physics.world.setBounds(0, 0, 2048, 100);
        //this.cameras.main.startFollow(this.player.sprite);
    }

    player: Player;

    update() {
        this.player.update();

        console.log("ply.x: " + this.player.sprite.x + ", camera.x: " + this.cameras.main.midPoint.x);
        for (let i = 0; i < 5; ++i) {
            this.layers[i].tilePositionX = this.cameras.main.midPoint.x * i;
            //this.layers[i].tilePositionY = 10 * i * Math.sin(this.game.getTime() * Math.PI / 180);
        }
    }
}