import { SettingsModel } from './../models/settings-model';
import Phaser from 'phaser';
import CyberballGameController from '../game/CyberballGameController';
import CyberballGameModel from '../game/CyberballGameModel';

const textStyle = { fontFamily: 'Arial', color: '#000000' };


export class CyberballScene extends Phaser.Scene {
    public settings: SettingsModel;

    cyberballGameController: CyberballGameController;

    // Game Objects:
    private ballSprite: Phaser.GameObjects.Sprite;
    private playerSprite: Phaser.GameObjects.Sprite;
    private playerGroup: Phaser.Physics.Arcade.Group;
    private sprites: Map<number, Phaser.GameObjects.Sprite> = new Map();
    private timeLimitText: Phaser.GameObjects.Text;


    // Gameplay Mechanics:

    private throwTarget: Phaser.GameObjects.Sprite;
    private leaveButton;

    constructor(settings: SettingsModel, controller: CyberballGameController) {
        super({});

        this.settings = settings;
        this.cyberballGameController = controller;

        this.cyberballGameController.catchBallCallbacks.addCallback("Phaser catch", id => {
            this.catchBall(id);
        });
        this.cyberballGameController.throwBallCallbacks.addCallback("Phaser throw", (thrower, reciever) => {
            this.throwBall(this.sprites.get(thrower), this.sprites.get(reciever));
        });
        this.cyberballGameController.CPULeaveCallbacks.addCallback("Phaser cpu leave", id => {
            this.leaveGame(this.sprites.get(id));
        });
        this.cyberballGameController.gameEndCallbacks.addCallback("Phaser game end", () => {
            this.gameOver();
        });
        this.cyberballGameController.humanPlayerMayLeaveCallbacks.addCallback("Phaser player may leave", () => {
            this.showLeaveButton();
        });
    }
    
    private showLeaveButton() {
        this.leaveButton = this.add.dom(0, 0, 'button', 'position: absolute; bottom: 20px; right: 20px; width: 100px; height: 50px;', 'Leave');
        this.leaveButton.addListener('click');
        this.leaveButton.on('click', () => {
            this.cyberballGameController.endGame('player-leave');
        })
    }


    public preload() {
        this.load.crossOrigin = 'anonymous';
    
        // Load ball texture
        this.load.image('ball', `${this.settings.baseUrl}/${this.settings.ballSprite}`);
        this.load.multiatlas('player', `${this.settings.baseUrl}/player.json`, 'assets');
    
        // Load player portrait
        if (this.settings.player.portraitBuff) {
            console.log("Loading player portrait:", this.settings.player.portraitBuff);
            this.load.image('playerPortrait', this.settings.player.portraitBuff);
        }
    
        // Load CPU portraits
        this.settings.computerPlayers.forEach((cpu, i) => {
            if (cpu.portraitBuff) {
                console.log(`Loading CPU ${i} portrait:`, cpu.portraitBuff);
                this.load.image('cpuPortrait' + i, cpu.portraitBuff);
            }
        });
    
        // Force Phaser to start loading before `create()`
        this.load.once('complete', () => {
            console.log("All assets loaded!");
        });
    
        this.load.start();  // Ensure images are actually loaded
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
    
        if (this.settings.player.tint) {
            this.playerSprite.setTint(parseInt(this.settings.player.tint.substr(1), 16));
        }
    
        this.playerSprite.setData('name-object', this.add.text(playerPosition.x, playerPosition.y + this.playerSprite.height / 2 + 10, this.settings.player.name, textStyle).setOrigin(0.5));
    
        this.sprites.set(CyberballGameModel.humanPlayerId, this.playerSprite);
    
        console.log("Human player created with ID:", CyberballGameModel.humanPlayerId);
    
        if (this.settings.player.portraitBuff) {
            this.load.once('complete', () => {
              const pos = this.getPlayerPortraitPosition(this.playerSprite);
              const maxW = 100;
              const maxH = 100;
              const container = document.createElement('div');
              container.style.width   = `${maxW}px`;
              container.style.height  = `${maxH}px`;

              const img = document.createElement('img');
              img.src = this.settings.player.portraitBuff;

              img.style.objectFit   = 'contain';
              img.style.width       = '100%';
              img.style.height      = '100%';
              img.style.background  = '#fff';

              container.appendChild(img);
              this.add.dom(pos.x, pos.y, container);
            });
            this.load.start();
          } else {
            console.warn("No portrait found for human player!");
        }
    }
    

    public createCPU(i: number) {
        let cpuPosition = this.getCPUPosition(i);
        let cpuSprite: Phaser.GameObjects.Sprite = this.playerGroup.create(cpuPosition.x, cpuPosition.y, 'player', 'idle/1.png');

        if (this.settings.computerPlayers[i].tint) {
            cpuSprite.setTint(parseInt(this.settings.computerPlayers[i].tint.substr(1), 16));
        }
        
        cpuSprite.setData('name-object', this.add.text(
            cpuPosition.x, cpuPosition.y + cpuSprite.height / 2 + 10,
            this.settings.computerPlayers[i].name, textStyle
        ).setOrigin(0.5));
    
        // Make the CPU Sprite Clickable
        cpuSprite.setInteractive();
        cpuSprite.on('pointerdown', () => {
            console.log(`Clicked on CPU ${i}`);
    
            if (this.cyberballGameController.model.playerHoldingBallId === CyberballGameModel.humanPlayerId) {
                console.log(`Throwing ball to CPU ${i}`);
                this.throwBall(this.playerSprite, cpuSprite);
                this.cyberballGameController.throwBall(i); // Trigger the throw in the controller
            }
        });
    
        // Ensure CPU portraits load correctly
        if (this.settings.computerPlayers[i].portraitBuff) {
            this.load.once('complete', () => {
              const pos = this.getCPUPortraitPosition(i, cpuSprite);
              const maxW = 100;
              const maxH = this.settings.portraitHeight || 100;
              const container = document.createElement('div');
              container.style.width  = `${maxW}px`;
              container.style.height = `${maxH}px`;
              const img = document.createElement('img');
              img.src            = this.settings.computerPlayers[i].portraitBuff!;
              img.style.objectFit  = 'contain';
              img.style.width      = '100%';
              img.style.height     = '100%';
              img.style.background = '#fff'; 
              container.appendChild(img);
              this.add.dom(pos.x, pos.y, container);
            });
            this.load.start();
          }
    
        this.sprites.set(i, cpuSprite);
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
            this.ballSprite.setTint(parseInt(this.settings.ballTint.substring(1), 16));
    
        // Ensure the ball is interactive and can be tracked
        this.ballSprite.setInteractive();
        this.input.setDraggable(this.ballSprite);
    
        this.physics.add.overlap(this.ballSprite, this.playerGroup, (_b, receiver) => {
            if (this.cyberballGameController.model.playerHoldingBallId === null && receiver === this.throwTarget) {
                console.log("Ball caught by target:", receiver);
                this.cyberballGameController.completeCatch();
            }
        });
    }
    

    public create() {
        this.cameras.main.setBackgroundColor('#ffffff');
        this.createAnimations();
        this.createHumanPlayer();
        this.createCPUs();
        this.createBall();

        if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit) {
            this.timeLimitText = this.add.text(this.sys.canvas.width - 10, 10, this.getTimeString(), textStyle);
            this.timeLimitText.setOrigin(1, 0);
        }
    }

    public updateAnimations() {
        if (this.cyberballGameController.model.playerHoldingBallId === CyberballGameModel.humanPlayerId) {
            this.playerSprite.play('active');
            this.playerSprite.flipX = this.input.x < this.playerSprite.x;

            let ballPosition = this.getActiveBallPosition(this.playerSprite);
            this.ballSprite.x = ballPosition.x;
            this.ballSprite.y = ballPosition.y;
        } else if (this.cyberballGameController.model.playerHoldingBallId === null) {
            // Eyes on the ball:
            this.playerGroup.getChildren().forEach(c => {
                let sprite = c as Phaser.GameObjects.Sprite;
                if (sprite.frame.name.includes('idle'))
                    sprite.flipX = this.ballSprite.x < sprite.x
            });
        }
    }

    public update() {
        if (this.cyberballGameController.model.gameHasEnded)
            return;

        this.updateAnimations();

        // Time Limit:
        if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit) {
            this.timeLimitText.setText(this.getTimeString());
            console.log(this.getTimeString())
        }
    }

    public gameOver() {
        // Stop future throws:
        this.playerGroup.children.entries.forEach(child => child.removeAllListeners());
        this.physics.pause();

        // Draw game over screen:
        this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, 0xdddddd, this.settings.gameOverOpacity);
        this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.settings.gameOverText, textStyle).setOrigin(0.5);

        // Hide leave button:
        if (this.leaveButton != null) this.leaveButton.node.style = "visibility: hidden";
    }

    // Mechanics:

    public throwBall(thrower: Phaser.GameObjects.Sprite, receiver: Phaser.GameObjects.Sprite) {
        this.throwTarget = receiver;

        // Player animation:
        thrower.flipX = receiver.x < thrower.x;
        thrower.play('throw');
        thrower.playAfterRepeat('idle');

        // Ball physics:
        let ballTargetPosition = this.getCaughtBallPosition(receiver);
        this.physics.moveTo(this.ballSprite, ballTargetPosition.x, ballTargetPosition.y,  this.settings.ballSpeed);
    }


    public catchBall(receiverId: number) {
        let receiver = this.sprites.get(receiverId)
        receiver.play('catch');

        // Ball physics:
        let ballPosition = this.getCaughtBallPosition(receiver);
        (this.ballSprite.body as Phaser.Physics.Arcade.Body).reset(ballPosition.x, ballPosition.y);

        // Prepare for next throw:
        const cpuSettings = this.settings.computerPlayers[receiverId];

        if (receiver !== this.playerSprite) {
            setTimeout(() => {
                if (this.cyberballGameController.model.gameHasEnded) {
                    return;
                }

                receiver.play('active');

                // Determine the next target CPU will throw to
                const nextTargetId = this.cyberballGameController.getNextTarget(receiverId);
                if (nextTargetId !== null) {
                    const nextTarget = this.sprites.get(nextTargetId);
                    // Update orientation to face the next target
                    receiver.flipX = nextTarget.x < receiver.x;
                }

                ballPosition = this.getActiveBallPosition(receiver);
                this.ballSprite.x = ballPosition.x;
                this.ballSprite.y = ballPosition.y;

                setTimeout(() => {
                    if (this.cyberballGameController.model.gameHasEnded) {
                        return;
                    }

                    this.cyberballGameController.cpuThrowBall();
                }, cpuSettings.throwDelay + (Math.random() * 2 - 1) * cpuSettings.throwDelayVariance);
            }, cpuSettings.catchDelay + (Math.random() * 2 - 1) * cpuSettings.catchDelayVariance)
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
        
        let leftMargin = 200;
        let rightMargin = 200;
    
        // if protrait
        let extraPadding = this.settings.hasPortraits 
            ? (this.settings.portraitHeight + this.settings.portraitPadding * 2) 
            : 0;
    
        // compute x
        let step = (this.sys.canvas.width - leftMargin - rightMargin) 
                 / (this.settings.computerPlayers.length - 1);
    
        let x = leftMargin + step * i;
        let y = i === 0 || i === this.settings.computerPlayers.length - 1
            ? this.sys.canvas.height / 2
            : (75 + extraPadding); // y
    
        return new Phaser.Geom.Point(x, y);
    }

    getCPUPortraitPosition(i: number, sprite: Phaser.GameObjects.Sprite): Phaser.Geom.Point {
        let position = this.getCPUPosition(i);
        let x: number, y: number;
    
        if (i === 0) {
        // left
            x = position.x - sprite.width / 2 - this.settings.portraitPadding - this.settings.portraitHeight / 2;
        // mid
            y = position.y;
        } else if (i === this.settings.computerPlayers.length - 1) {
        // right
            x = position.x + sprite.width / 2 + this.settings.portraitPadding + this.settings.portraitHeight / 2;
            y = position.y;
        } else {
        // up
            x = position.x;
            y = position.y - this.settings.portraitHeight + this.settings.portraitPadding * 2 - sprite.height / 2;
        }
    
        return new Phaser.Geom.Point(x, y);
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
    
        let maxPortraitHeight = this.settings.portraitHeight || 100;
        let yOffset = maxPortraitHeight / 2 + this.settings.portraitPadding * 3 + sprite.height / 2 + 10;
    
        return new Phaser.Geom.Point(position.x, position.y + yOffset);
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
        let timeRemaining = this.settings.timeLimit - this.cyberballGameController.reportTimeSinceStart();
        let time = new Date(timeRemaining < 0 ? 0 : timeRemaining);

        return `${this.settings.timeLimitText} ${time.getUTCMinutes()}:${time.getUTCSeconds() < 10 ? '0' : ''}${time.getUTCSeconds()}`;
    }
}

