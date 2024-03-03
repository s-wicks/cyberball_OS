import { SettingsModel } from './../models/settings-model';
import Phaser from 'phaser';

const textStyle = { fontFamily: 'Arial', color: '#000000' };


export class CyberballScene extends Phaser.Scene {
    public settings: SettingsModel;

    // Game Objects:
    private ballSprite: Phaser.GameObjects.Sprite;
    private playerSprite: Phaser.GameObjects.Sprite;
    private playerGroup: Phaser.Physics.Arcade.Group;
    private cpuSprites: Phaser.GameObjects.Sprite[] = [];
    private timeLimitText: Phaser.GameObjects.Text;


    // Gameplay Mechanics:

    private humanPlayerHasBall = true;
    private ballHeld = true;
    private throwTarget: Phaser.GameObjects.Sprite;
    private gameEnded = false;

    // Stats:

    private startTime: number;

    constructor(settings: SettingsModel) {
        super({});

        this.settings = settings;


        setTimeout(() => {
            this.leaveGame(this.cpuSprites[0]);
        }, 5000);

        setTimeout(() => {
            this.gameOver();
        }, 10000);
    }

    public preload() {
        this.load.crossOrigin = 'anonymous';

        this.load.image('ball', `${this.settings.baseUrl}/${this.settings.ballSprite}`);
        this.load.multiatlas('player', `${this.settings.baseUrl}/player.json`, 'assets');

        if (this.settings.player.portraitBuff) {
            this.textures.addBase64('playerPortrait', this.settings.player.portraitBuff);
        }

        this.settings.computerPlayers.forEach((cpu, i) => {
            if (cpu.portraitBuff) {
                this.textures.addBase64('cpuPortrait' + i, cpu.portraitBuff);
            }
        });
    }

    public createAnimations() {
        this.anims.create({
            key: 'active',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'active/', suffix: '.png' })
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'idle/', suffix: '.png' })
        });

        this.anims.create({
            key: 'throw',
            frameRate: 12,
            frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'throw/', suffix: '.png' })
        });

        this.anims.create({
            key: 'catch',
            frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'catch/', suffix: '.png' })
        });
    }

    public createHumanPlayer() {
        let playerPosition = this.getPlayerPosition();

        this.playerGroup = this.physics.add.group({ immovable: true, allowGravity: false });
        this.playerSprite = this.playerGroup.create(playerPosition.x, playerPosition.y, 'player', 'active/1.png');

        if (this.settings.player.tint)
            this.playerSprite.setTint(parseInt(this.settings.player.tint.substr(1), 16));

        this.playerSprite.setData('name-object', this.add.text(playerPosition.x, playerPosition.y + this.playerSprite.height / 2 + 10, this.settings.player.name, textStyle).setOrigin(0.5));

        if (this.settings.player.portrait) {
            var portraitPosition = this.getPlayerPortraitPosition(this.playerSprite);
            var image = this.add.image(portraitPosition.x, portraitPosition.y, 'playerPortrait');

            image.setScale(this.settings.portraitHeight / image.height);
        }

    }

    public createCPU(i: number) {
        let cpuPosition = this.getCPUPosition(i);
        let cpuSprite: Phaser.GameObjects.Sprite = this.playerGroup.create(cpuPosition.x, cpuPosition.y, 'player', 'idle/1.png');

        cpuSprite.setData('name-object', this.add.text(cpuPosition.x, cpuPosition.y + cpuSprite.height / 2 + 10, this.settings.computerPlayers[i].name, textStyle).setOrigin(0.5));

        if (this.settings.computerPlayers[i].portrait) {
            var portraitPosition = this.getCPUPortraitPosition(i, cpuSprite);
            var image = this.add.image(portraitPosition.x, portraitPosition.y, 'cpuPortrait' + i);

            image.setScale(this.settings.portraitHeight / image.height);
        }

        cpuSprite.flipX = cpuPosition.x > this.playerSprite.x;

        if (this.settings.computerPlayers[i].tint)
            cpuSprite.setTint(parseInt(this.settings.computerPlayers[i].tint.substr(1), 16));

        cpuSprite.setInteractive();
        cpuSprite.on('pointerdown', (e) => {
            if (this.humanPlayerHasBall) {


                // Ensure player and ball are facing the correct way on touch devices:
                this.playerSprite.flipX = this.input.x < this.playerSprite.x;

                let ballPosition = this.getActiveBallPosition(this.playerSprite);
                this.ballSprite.x = ballPosition.x;
                this.ballSprite.y = ballPosition.y;

                this.throwBall(this.playerSprite, cpuSprite);
            }
        });

        this.cpuSprites.push(cpuSprite);
    }

    public createCPUs() {
        for (let i = 0; i < this.settings.computerPlayers.length; i++) {
            this.createCPU(i);
        }
    }

    public createBall() {
        let ballPosition = this.getActiveBallPosition(this.playerSprite);
        this.ballSprite = this.physics.add.sprite(ballPosition.x, ballPosition.y, 'ball');

        if (this.settings.ballTint)
            this.ballSprite.setTint(parseInt(this.settings.ballTint.substr(1), 16));

        this.physics.add.overlap(this.ballSprite, this.playerGroup, (_b, receiver) => {
            if (!this.ballHeld && receiver === this.throwTarget)
                this.catchBall(receiver as Phaser.GameObjects.Sprite);
        });
    }

    public create() {
        this.cameras.main.setBackgroundColor('#ffffff');
        this.createAnimations();
        this.createHumanPlayer();
        this.createCPUs();
        this.createBall();

        // Time Limit:

        this.startTime = Date.now();

        if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit) {
            this.timeLimitText = this.add.text(this.sys.canvas.width - 10, 10, this.getTimeString(), textStyle);
            this.timeLimitText.setOrigin(1, 0);
        }
    }

    public updateAnimations() {
        if (this.humanPlayerHasBall) {
            this.playerSprite.play('active');
            this.playerSprite.flipX = this.input.x < this.playerSprite.x;

            let ballPosition = this.getActiveBallPosition(this.playerSprite);
            this.ballSprite.x = ballPosition.x;
            this.ballSprite.y = ballPosition.y;
        } else if (!this.ballHeld) {
            // Eyes on the ball:
            this.playerGroup.getChildren().forEach(c => {
                let sprite = c as Phaser.GameObjects.Sprite;
                if (sprite.frame.name.includes('idle'))
                    sprite.flipX = this.ballSprite.x < sprite.x
            });
        }
    }

    public update() {
        if (this.gameEnded)
            return;

        this.updateAnimations();

        // Time Limit:
        if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit) {
            this.timeLimitText.setText(this.getTimeString());
            console.log(this.getTimeString())
        }
    }

    public gameOver() {
        if (this.gameEnded)
            return;

        this.gameEnded = true;

        // Stop future throws:
        this.playerGroup.children.entries.forEach(child => child.removeAllListeners());

        // Draw game over screen:
        this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, 0xdddddd, this.settings.gameOverOpacity);
        this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.settings.gameOverText, textStyle).setOrigin(0.5);
    }

    // Mechanics:

    public throwBall(thrower: Phaser.GameObjects.Sprite, receiver: Phaser.GameObjects.Sprite) {
        this.humanPlayerHasBall = this.ballHeld = false;
        this.throwTarget = receiver;

        // Player animation:

        thrower.play('throw');
        thrower.playAfterRepeat('idle');

        // Ball physics:

        let ballTargetPosition = this.getCaughtBallPosition(receiver);
        this.physics.moveTo(this.ballSprite, ballTargetPosition.x, ballTargetPosition.y, this.settings.ballSpeed);
    }


    public catchBall(receiver: Phaser.GameObjects.Sprite) {

        this.ballHeld = true;

        receiver.play('catch');

        // Ball physics:

        let ballPosition = this.getCaughtBallPosition(receiver);
        (this.ballSprite.body as Phaser.Physics.Arcade.Body).reset(ballPosition.x, ballPosition.y);

        // Prepare for next throw:

        if (receiver === this.playerSprite) {
            this.humanPlayerHasBall = true;
        } else {

            setTimeout(() => {
                receiver.play('active');

                ballPosition = this.getActiveBallPosition(receiver);
                this.ballSprite.x = ballPosition.x;
                this.ballSprite.y = ballPosition.y;
                let id = this.playerGroup.getChildren().indexOf(receiver);

                setTimeout(() => {

                    let random = Math.floor(Math.random() * this.playerGroup.getChildren().length);
                    // Exclude self
                    if (random == this.playerGroup.getChildren().indexOf(receiver)) {
                        if (random == 0) {
                            random++;
                        } else {
                            random--;
                        }
                    }

                    this.throwBall(receiver, this.playerGroup.getChildren()[random] as Phaser.GameObjects.Sprite);
                }, 500);
            }, 500)
        }
    }

    public leaveGame(cpuPlayer: Phaser.GameObjects.Sprite) {
        let nameObject = cpuPlayer.getData('name-object') as Phaser.GameObjects.Text;

        nameObject.setText([nameObject.text, 'has left the game.']);

        // Deactivate player object

        cpuPlayer.removeAllListeners();
        cpuPlayer.setVisible(false);
        
    }

    // Helpers:

    getCPUPosition(i: number): Phaser.Geom.Point {
        // TODO: Increase padding when portaits are enabled.
        let padding = 75;
        let extraPadding = this.settings.hasPortraits ? this.settings.portraitHeight + this.settings.portraitPadding * 2 : 0;

        if (this.settings.computerPlayers.length === 1) {
            return new Phaser.Geom.Point(
                this.sys.canvas.width / 2,
                padding + extraPadding
            );
        }

        return new Phaser.Geom.Point(
            // Evenly divide the width of the screen by the number of players.
            ((this.sys.canvas.width - (padding * 2)) / (this.settings.computerPlayers.length - 1)) * i + padding,
            // First and last player are closer in the middle, others stand along the edge.
            i === 0 || i === this.settings.computerPlayers.length - 1
                ? (this.sys.canvas.height / 2)
                : padding + extraPadding
        );
    }

    getCPUPortraitPosition(i: number, sprite: Phaser.GameObjects.Sprite): Phaser.Geom.Point {
        let position = this.getCPUPosition(i);

        return new Phaser.Geom.Point(
            position.x,
            position.y - this.settings.portraitHeight + this.settings.portraitPadding * 2 - sprite.height / 2
        );
    }

    getPlayerPosition(): Phaser.Geom.Point {
        let padding = 75;

        if (this.settings.hasPortraits)
            padding += this.settings.portraitHeight + this.settings.portraitPadding * 2;

        return new Phaser.Geom.Point(
            this.sys.canvas.width / 2,
            this.sys.canvas.height - padding
        );
    }

    getPlayerPortraitPosition(sprite: Phaser.GameObjects.Sprite): Phaser.Geom.Point {
        var position = this.getPlayerPosition();

        return new Phaser.Geom.Point(
            position.x,
            position.y + this.settings.portraitHeight / 2 + this.settings.portraitPadding * 2 + sprite.height / 2 + 10
        );
    }

    // TODO: This is invalid if the sprites are changed.
    getCaughtBallPosition(target: Phaser.GameObjects.Sprite) {
        return new Phaser.Geom.Point(target.x + (target.flipX ? -50 : 50), target.y - 15);
    }

    // TODO: This is invalid if the sprites are changed.
    getActiveBallPosition(target: Phaser.GameObjects.Sprite) {
        return new Phaser.Geom.Point(target.x + (target.flipX ? 40 : -40), target.y - 20);
    }

    getTimeString(): string {
        let timeRemaining = this.settings.timeLimit - (Date.now() - this.startTime);
        let time = new Date(timeRemaining < 0 ? 0 : timeRemaining);

        return `${this.settings.timeLimitText} ${time.getUTCMinutes()}:${time.getUTCSeconds() < 10 ? '0' : ''}${time.getUTCSeconds()}`;
    }
}
