import { CyberballScene } from '../../scenes/cyberball';
import { defaultSettings, SettingsModel } from '../../models/settings-model';
import Phaser from 'phaser';
import { PhaserGameCustomElement } from 'resources/phaser-game/phaser-game';
import CyberballGameController from 'game/CyberballGameController';
import addCpuTargeting from 'game/CpuTargeting';
import CyberballGameModel from 'game/CyberballGameModel';
import addAllCpuLeaveTriggers from 'game/CpuLeaveTriggers';
import addPlayerMayLeaveTriggers from 'game/PlayerMayLeaveTriggers';
import addGameOverTriggers from 'game/GameOverTriggers';

export class GameViewModel {
    settings: SettingsModel = defaultSettings;

    // Game:

    game: PhaserGameCustomElement;

    gameWidth = 800;
    gameHeight = 460;

    gameConfig: Phaser.Types.Core.GameConfig;

    activate(params: { settings?: string, playerName?: string }) {
        if('settings' in params) {
            this.settings = new SettingsModel(JSON.parse(atob(params.settings)));
        }

        if('playerName' in params) {
            this.settings.player.name = params.playerName;
        }

        if(this.settings.hasPortraits) {
            this.gameHeight += this.settings.portraitHeight * 2 + this.settings.portraitPadding * 4;
        }
    }

    bind() {
        let cyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, this.settings.computerPlayers.length);
        addCpuTargeting(cyberballGameController, this.settings);
        addAllCpuLeaveTriggers(cyberballGameController, this.settings);
        addPlayerMayLeaveTriggers(cyberballGameController, this.settings);
        addGameOverTriggers(cyberballGameController, this.settings);
        let scene = new CyberballScene(this.settings, cyberballGameController);

        this.gameConfig  = {
            type: Phaser.AUTO,
            width: this.gameWidth,
            height: this.gameHeight,
            scene,
            physics: {
                default: 'arcade'
            }
        };
    }
}
