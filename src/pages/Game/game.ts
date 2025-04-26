import { CyberballScene } from '../../scenes/cyberball';
import { defaultSettings, SettingsModel } from '../../models/settings-model';
import Phaser, { Scale } from 'phaser';
import { PhaserGameCustomElement } from 'resources/phaser-game/phaser-game';
import CyberballGameController from 'game/CyberballGameController';
import addCpuTargeting from 'game/CpuTargeting';
import CyberballGameModel from 'game/CyberballGameModel';
import addAllLeaveTriggers from 'game/LeaveTriggers';
import addGameOverTriggers from 'game/GameOverTriggers';
import { addGameLogging } from 'game/GameLog';

export class GameViewModel {
    settings: SettingsModel = defaultSettings();

    // Game:

    game: PhaserGameCustomElement;

    gameWidth = 900;
    gameHeight = 460;

    gameConfig: Phaser.Types.Core.GameConfig;

    activate(params: { settings?: string, playerName?: string }) {
        if ('settings' in params) {
            this.settings = new SettingsModel(JSON.parse(atob(params.settings)));
        }

        if ('playerName' in params) {
            this.settings.player.name = params.playerName;
        }

        if (this.settings.hasPortraits) {
            this.gameHeight += this.settings.portraitHeight * 2 + this.settings.portraitPadding * 4;
        }
    }

    bind() {
        let cyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, this.settings.computerPlayers.length);
        addGameLogging(cyberballGameController, this.settings);
        addCpuTargeting(cyberballGameController, this.settings);
        addAllLeaveTriggers(cyberballGameController, this.settings);
        addGameOverTriggers(cyberballGameController, this.settings);
        let scene = new CyberballScene(this.settings, cyberballGameController);

        this.gameConfig = {
            type: Phaser.AUTO,
            width: this.gameWidth,
            height: this.gameHeight,
            scale: {
                mode: Scale.ScaleModes.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene,
            physics: {
                default: 'arcade'
            },
            dom: {
                createContainer: true
            }
        };
    }
}
