export default class CreateTilesetScene extends Phaser.Scene
{
    groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.atlasXML("tileset", "assets/tileset.png", "assets/tileset.xml");
    }

    create() {
        let atlasTexture = this.textures.get('tileset')
        let frames = atlasTexture.getFrameNames();

        let x = 35;
        let y = 35;
        for (let i = 0; i < frames.length; i++)
        {
            if (atlasTexture.get(frames[i]).width != 70 ||
                atlasTexture.get(frames[i]).height != 70) {
                continue;
            }
            this.add.image(x, y, 'tileset', frames[i]);
            x += 70;
            if (x > this.game.canvas.width - 35) {
                x = 35;
                y += 70;
            }
        }
        this.sys.renderer.snapshot((image) => {
            console.log(image);
        })
        /*
        const tilemap = this.make.tilemap({ width: 100, height: 100 });
        const tileset = tilemap.addTilesetImage("tileset");
        tilemap.createBlankDynamicLayer("background", tileset);
        this.groundLayer = tilemap.createBlankDynamicLayer("ground", tileset);
        tilemap.createBlankDynamicLayer("foreground", tileset);

        let t = 0;
        for (let x = 0; x < 20; ++x) {
            for (let y = 0; y < 20; ++y) {
                this.groundLayer.putTileAt(t++, x, y);
            }
        }
        */
    }

    update() {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as any;
         if (this.input.manager.activePointer.isDown) {
           this.groundLayer.putTileAtWorldXY(1, worldPoint.x, worldPoint.y);
        }
    }
}