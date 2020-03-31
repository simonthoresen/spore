import CartoonTiles from "./CartoonTiles";
import Player from "./Player";

export default class PlatformScene extends Phaser.Scene
{
    constructor() {
        super("PlatformScene");
    }

    preload() {
        this.load.image("tileset", "assets/tilesets/cartoon-70.png");
        this.load.atlasXML("p1", "assets/atlas/p1.png", "assets/atlas/p1.xml");
    }

    create() {
        const map = this.make.tilemap({ width: 50, height: 50, tileWidth: 70, tileHeight: 70 });
        const tiles = map.addTilesetImage("tileset");

        this.groundLayer = map.createBlankDynamicLayer("Ground", tiles);

        for (let x = 0; x < 50; ++x) {
            this.groundLayer
                .putTileAt(CartoonTiles.STONE, x, 4)
                .setCollision(true);
        }

        // Create a simple graphic that can be used to show which tile the mouse is over
        this.marker = this.add.graphics();
        this.marker.lineStyle(5, 0xffffff, 1);
        this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);
        this.marker.lineStyle(3, 0xff4f78, 1);
        this.marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Limit the camera to the map size
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.player = new Player(this, 100, 100);
        this.player.sprite.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player.sprite);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.addCollider(this.player.sprite, this.groundLayer);

        this.add.text(16, 16, "Arrow/WASD to move & jump\nLeft click to draw platforms", 
            {
                font: "18px monospace",
                fill: "#000000",
                padding: { x: 20, y: 10 },
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0);
    }
    player: Player;
    groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
    marker: Phaser.GameObjects.Graphics;
    controls: Phaser.Cameras.Controls.FixedKeyControl;
    shiftKey: Phaser.Input.Keyboard.Key;

    update() {
        this.controls.update(10);
        this.player.update();

        // Convert the mouse position to world position within the camera
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main) as any;

        // Place the marker in world space, but snap it to the tile grid. If we convert world -> tile and
        // then tile -> world, we end up with the position of the tile under the pointer
        const pointerTileXY = this.groundLayer.worldToTileXY(worldPoint.x, worldPoint.y);
        const snappedWorldPoint = this.groundLayer.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
        this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);
 
 
        if (this.input.manager.activePointer.isDown) {
            if (this.shiftKey.isDown) {
                this.groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
            } else {
                this.groundLayer.putTileAtWorldXY(CartoonTiles.GRASS, worldPoint.x, worldPoint.y).setCollision(true);
            }
        }
    }
}