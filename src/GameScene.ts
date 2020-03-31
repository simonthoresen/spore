export default class GameScene extends Phaser.Scene
{
    groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.atlasXML("tileset", "assets/tileset.png", "assets/tileset.xml");
    }

    create() {
        const tilemap = this.make.tilemap({ width: 100, height: 100 });
        const tileset = tilemap.addTilesetImage("tileset");
        tilemap.createBlankDynamicLayer("background", tileset);
        this.groundLayer = tilemap.createBlankDynamicLayer("ground", tileset);
        tilemap.createBlankDynamicLayer("foreground", tileset);
    
        this.groundLayer.putTileAt(1, 1, 1);
    }

    update() {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as any;
         if (this.input.manager.activePointer.isDown) {
           this.groundLayer.putTileAtWorldXY(1, worldPoint.x, worldPoint.y);
        }
    }
}