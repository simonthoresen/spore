export default class CreateTilesetScene extends Phaser.Scene
{
    static readonly TILE_W = 70;
    static readonly TILE_H = 70;

    constructor() {
        super("CreateTilesetScene");
    }

    preload() {
        this.load.atlasXML("tileset", "assets/tileset.png", "assets/tileset.xml");
    }

    create() {
        let atlasTexture = this.textures.get('tileset')
        let frames = atlasTexture.getFrameNames();

        let x = CreateTilesetScene.TILE_W / 2;
        let y = CreateTilesetScene.TILE_H / 2;
        for (let i = 0; i < frames.length; i++)
        {
            if (atlasTexture.get(frames[i]).width != CreateTilesetScene.TILE_W ||
                atlasTexture.get(frames[i]).height != CreateTilesetScene.TILE_H) {
                continue;
            }
            this.add.image(x, y, 'tileset', frames[i]);
            x += 70;
            if (x > this.game.canvas.width - 35) {
                x = CreateTilesetScene.TILE_W / 2;
                y += CreateTilesetScene.TILE_H;
            }
        }
        this.sys.renderer.snapshot((image) => {
            console.log(image);
        })
    }
}