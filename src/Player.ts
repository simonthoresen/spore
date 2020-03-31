export default class Player 
{
    readonly scene: Phaser.Scene;
    readonly sprite: Phaser.Physics.Arcade.Sprite;
    readonly keys: any;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;

        scene.anims.create({
            key: "player_idle",
            frames: scene.anims.generateFrameNames("p1", {
                prefix: "p1_front",
                start: 1,
                end: 1,
                zeroPad: 2
            }),
            repeat: -1
        });
        scene.anims.create({
            key: "player_walk",
            frames: scene.anims.generateFrameNames("p1", {
                prefix: "p1_walk",
                start: 1,
                end: 11,
                zeroPad: 2
            }),
            repeat: -1
        });
        this.sprite = scene.physics.add
            .sprite(x, y, "p1", "p1_front01")
            .setDrag(1000, 0)
            .setMaxVelocity(300, 400); 
        console.log(scene.anims.get("player_walk"));
        this.sprite.play("player_walk");
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update() {
        const keys = this.keys;
        const sprite = this.sprite;
        const onGround = sprite.body.blocked.down;
        const acceleration = onGround ? 600 : 200;

        // Apply horizontal acceleration when left/a or right/d are applied
        if (keys.left.isDown) {
            sprite.setAccelerationX(-acceleration);
            sprite.setFlipX(true);
        } else if (keys.right.isDown) {
            sprite.setAccelerationX(acceleration);
            sprite.setFlipX(false);
        } else {
            sprite.setAccelerationX(0);
        }

        // Only allow the player to jump if they are on the ground
        if (onGround && (keys.jump.isDown)) {
            sprite.setVelocityY(-500);
        }

        // Update the animation/texture based on the state of the player
        if (onGround) {
            if (sprite.body.velocity.x !== 0) {
                sprite.play("player_walk", true);
            }
            else {
                sprite.play("player_idle", true);
            }
        } else {
            sprite.anims.stop();
//            sprite.setTexture("p1", 0);
        }
    }
}
