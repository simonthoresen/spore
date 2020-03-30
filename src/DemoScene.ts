export default class DemoScene extends Phaser.Scene
{
    layers: Phaser.GameObjects.TileSprite[] = [];

    constructor() {
        super("DemoScene");
    }

    preload () {
        this.load.image("bg_layer0", "assets/layer_08_1920 x 1080.png");
        this.load.image("bg_layer1", "assets/layer_07_1920 x 1080.png");
        this.load.image("bg_layer2", "assets/layer_06_1920 x 1080.png");
        this.load.image("bg_layer3", "assets/layer_05_1920 x 1080.png");
        this.load.image("bg_layer4", "assets/layer_04_1920 x 1080.png");
        this.load.image("bg_layer5", "assets/layer_03_1920 x 1080.png");
        this.load.image("bg_layer6", "assets/layer_02_1920 x 1080.png");
        this.load.image("bg_layer7", "assets/layer_01_1920 x 1080.png");

        this.load.atlasXML("shoebot_atlas", "assets/shoebot.png", "assets/shoebot.xml");
    }

    create() {
        console.log("canvas: " + this.game.canvas.width + " x " + this.game.canvas.height);
        for (let i = 0; i < 8; ++i) {
            let image = "bg_layer" + i;
            let sprite = this.add.tileSprite(
                0,
                0,
                this.game.canvas.width,
                this.game.canvas.height,
                image
            );
            let imageHeight = this.game.textures.get(image).getSourceImage().height;
            sprite.setTileScale(this.game.canvas.height / imageHeight);
            sprite.setTilePosition(0, 0);
            sprite.setScrollFactor(0);

            sprite.setOrigin(0, 0); 
            this.layers.push(sprite);
        }

        this.anims.create({ 
            key: "shoebot_run",
            frames: this.anims.generateFrameNames("shoebot_atlas", {
                prefix: "running bot_",
                suffix: ".png",
                zeroPad: 4,
                end: 10
            }),
            repeat: -1
        });
        this.ply = this.add.sprite(100, 400, "shoebot_atlas", "running bot_0000.png");
        this.ply.setScale(0.25);
        this.ply.setFlipX(true);
        this.ply.play("shoebot_run");

        //this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.ply);
    }

    ply: Phaser.GameObjects.Sprite;

    update() {
        this.ply.setX(this.ply.x + 5);

        console.log("ply.x: " + this.ply.x + ", camera.x: " + this.cameras.main.midPoint.x);
        for (let i = 0; i < 8; ++i) {
            this.layers[i].tilePositionX += i;//= this.cameras.main.x * i / 8;
            //this.layers[i].tilePositionY = 10 * i * Math.sin(this.game.getTime() * Math.PI / 180);
        }
    }
}